import os
import crochet
crochet.setup()     # initialize crochet

import json
from flask import Flask, request
from flask_cors import CORS
from bson.json_util import dumps, loads
from scrapy.crawler import CrawlerRunner
from scrapy.utils.project import get_project_settings
from scrapy.utils.log import configure_logging
from jobscraper.spiders import spider1,spidertest
from scrapy import spiderloader

import pymongo
from bson import ObjectId


MONGO_URI= os.getenv('MONGO_URI', 'mongodb://localhost:27017/')
MONGO_DATABASE=os.getenv('MONGO_DATABASE', 'myDatabase')
client = pymongo.MongoClient(MONGO_URI)

app = Flask('Scrape With Flask')
CORS(app)

configure_logging()
settings = get_project_settings()
settings.set("TWISTED_REACTOR", "twisted.internet.selectreactor.SelectReactor")
    
scrape_in_progress = False

spiders = spiderloader.SpiderLoader.from_settings(settings).list()
print("Available spiders:", spiders)

@app.route('/urls', methods=['GET'])
def urls():

    results = {"data": list(client[MONGO_DATABASE].urls.find())}


    return json_responce(200, results)

@app.route('/urls', methods=['POST'])
def urls_add():
    data = request.json
    client[MONGO_DATABASE].urls.insert_one(data)
    result = {"object": data, "status": "ADDED"}

    return json_responce(200, result)

@app.route('/urls/<string:obj_id>', methods=['DELETE'])
def urls_delete(obj_id):
    try:
        oid = ObjectId(obj_id)
    except Exception as e:
        return json_responce(400,{"error": "ID inválido"})
    client[MONGO_DATABASE].urls.delete_one({ "_id": oid })


    return json_responce(200, {"status": "DELETED"})

@app.route('/status', methods=['GET'])
def status():
    global scrape_in_progress

    response = ""
    code_response = 1
    if not scrape_in_progress:
        response = 'SCRAPING COMPLETE'
        code_response = 1
    else:
        response = 'SCRAPE IN PROGRESS'
        code_response = 2

    return json_responce(200, {"status": response, "code": code_response})

@app.route('/crawl', methods=['POST'])
def crawl():
    global scrape_in_progress
    data = request.json
    print("Crawl request received with data:", data)
    urls = data["urls"]

    response = ""
    code_response = 1
    if not scrape_in_progress:
        scrape_in_progress = True
        scrape_with_crochet(urls)
        response = 'SCRAPING'
        code_response = 1
    else:
        response = 'SCRAPE IN PROGRESS'
        code_response = 2

    return json_responce(200, {"status": response, "code": code_response})

@app.route('/jobs', methods=['GET'])
def get_results():
    data = dict()
    if request.args.get('search'):
        data["$text"] = {"$search": request.args.get('search')}

    if request.args.get('type'):
        data["type"] = request.args.get('type')

    if request.args.get('location'):
        data["location"] = {"$regex": f"{request.args.get('location')}", "$options": "i"}
        
    results = {
        "data": list(client[MONGO_DATABASE].jobs.find(data))
        } 
    return json_responce(200, results)

@app.route('/hide/<string:id>', methods=['PUT'])
def hide_job(id):
    try:
        oid = ObjectId(id)
    except Exception as e:
        return json_responce(400,{"error": "ID inválido"})
    client[MONGO_DATABASE].jobs.find_one_and_update(
        {'_id': oid},
        [{'$set': {'hidden': {'$not': '$hidden'}}}]
    )

    return json_responce(200, {"status": "TOGGLED"})

@app.route('/jobs/<string:id>', methods=['DELETE'])
def delete_job(id):
    try:
        oid = ObjectId(id)
    except Exception as e:
        return json_responce(400,{"error": "ID inválido"})
    client[MONGO_DATABASE].jobs.delete_one(
        {'_id': oid}
    )

    return json_responce(200, {"status": "TOGGLED"})

@app.route('/spiders', methods=['GET'])
def get_spiders():
    global spiders
    return json_responce(200, {"spiders": spiders})

@crochet.run_in_reactor
def scrape_with_crochet(urls=[]):
    runner = CrawlerRunner(settings=settings)

    for url in urls:
        eventual = runner.crawl(url["spider"],new_urls=url["path"])
        eventual.addCallback(finished_scrape)

def finished_scrape(null):
    global scrape_in_progress
    print("Scrape finished")
    scrape_in_progress = False

def json_responce(status, data):
    return app.response_class(
        response=dumps(data),
        status=status,
        mimetype='application/json'
    )

if __name__=='__main__':
    app.run('0.0.0.0', 3000)