from crochet import setup, wait_for
import scrapy
from scrapy.crawler import CrawlerRunner
from jobscraper.spiders import spider1,spidertest
from scrapy.utils.project import get_project_settings
from scrapy.utils.reactor import install_reactor
from scrapy.utils.log import configure_logging

setup()
configure_logging()
install_reactor("twisted.internet.selectreactor.SelectReactor")


@wait_for(10)
def run_spider():
    settings = get_project_settings()
    settings.set("TWISTED_REACTOR", "twisted.internet.selectreactor.SelectReactor")
    crawler = CrawlerRunner(settings=settings)
    d = crawler.crawl(spidertest.Spidertest)
    return d

if __name__ == '__main__':
    run_spider()