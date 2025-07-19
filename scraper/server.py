import os
import crochet
crochet.setup()     # initialize crochet

import json
from flask import Flask
from bson.json_util import dumps, loads
from scrapy.crawler import CrawlerRunner
from jobscraper.spiders import spider1

import pymongo

MONGO_URI= os.getenv('MONGO_URI', 'mongodb://localhost:27017/')
MONGO_DATABASE=os.getenv('MONGO_DATABASE', 'myDatabase')
client = pymongo.MongoClient(MONGO_URI)

app = Flask('Scrape With Flask')
crawl_runner = CrawlerRunner()      # requires the Twisted reactor to run
quotes_list = []                    # store quotes
scrape_in_progress = False
scrape_complete = False

@app.route('/crawl')
def crawl_for_quotes():
    """
    Scrape for quotes
    """
    global scrape_in_progress
    global scrape_complete

    if not scrape_in_progress:
        scrape_in_progress = True
        scrape_with_crochet()
        return 'SCRAPING'
    elif scrape_complete:
        return 'SCRAPE COMPLETE'
    return 'SCRAPE IN PROGRESS'

@app.route('/jobs')
def get_results():
    """
    Get the results only if a spider has results
    """
    results = {"data": list(client[MONGO_DATABASE].jobs.find())}

    response = app.response_class(
        response=dumps(results),
        status=200,
        mimetype='application/json',
        headers={'Access-Control-Allow-Origin':'*'}
    )
    return response

@crochet.run_in_reactor
def scrape_with_crochet():
    eventual = crawl_runner.crawl(spider1.Spider1)
    eventual.addCallback(finished_scrape)

def finished_scrape(null):
    """
    A callback that is fired after the scrape has completed.
    Set a flag to allow display the results from /results
    """
    global scrape_complete
    scrape_complete = True

if __name__=='__main__':
    app.run('0.0.0.0', 3000)