import os
import crochet
crochet.setup()     # initialize crochet

import json
from flask import Flask
from bson.json_util import dumps, loads
from scrapy.crawler import CrawlerRunner
from scrapy.utils.project import get_project_settings
from scrapy.utils.log import configure_logging
from jobscraper.spiders import spider1,spidertest

import pymongo

MONGO_URI= os.getenv('MONGO_URI', 'mongodb://localhost:27017/')
MONGO_DATABASE=os.getenv('MONGO_DATABASE', 'myDatabase')
client = pymongo.MongoClient(MONGO_URI)

app = Flask('Scrape With Flask')

configure_logging()
settings = get_project_settings()
settings.set("TWISTED_REACTOR", "twisted.internet.selectreactor.SelectReactor")
    
scrape_in_progress = False

@app.route('/status', methods=['GET'])
def crawl():
    global scrape_in_progress

    response = ""
    codeResponse = 1
    if not scrape_in_progress:
        response = 'SCRAPING COMPLETE'
        codeResponse = 1
    else:
        response = 'SCRAPE IN PROGRESS'
        codeResponse = 2

    return app.response_class(
        response=dumps({"status": response, "code": codeResponse}),
        status=200,
        mimetype='application/json',
        headers={'Access-Control-Allow-Origin':'*'}
    )

@app.route('/update', methods=['POST'])
def crawl():
    global scrape_in_progress

    response = ""
    codeResponse = 1
    if not scrape_in_progress:
        scrape_in_progress = True
        scrape_with_crochet()
        response = 'SCRAPING'
        codeResponse = 1
    else:
        response = 'SCRAPE IN PROGRESS'
        codeResponse = 2

    return app.response_class(
        response=dumps({"status": response, "code": codeResponse}),
        status=200,
        mimetype='application/json',
        headers={'Access-Control-Allow-Origin':'*'}
    )

@app.route('/jobs', methods=['GET'])
def get_results():
    results = {"data": list(client[MONGO_DATABASE].jobs.find())}

    response = app.response_class(
        response=dumps(results),
        status=200,
        mimetype='application/json',
        headers={'Access-Control-Allow-Origin':'*'}
    )
    return response

@crochet.wait_for(10)
def scrape_with_crochet():
    runner = CrawlerRunner(settings=settings)
    eventual = runner.crawl(spider1.Spider1)
    eventual.addCallback(finished_scrape)

def finished_scrape(null):
    global scrape_in_progress
    print("Scrape finished")
    scrape_in_progress = False

if __name__=='__main__':
    app.run('0.0.0.0', 3000)