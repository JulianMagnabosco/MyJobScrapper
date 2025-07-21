import scrapy


class Spidertest(scrapy.Spider):
    name = "spidertest"
    allowed_domains = ["web-scraping.dev"]
    start_urls = ["https://web-scraping.dev/products"]

    def parse(self, response):
        yield {
            "name": "Test",
            "price": "Test price",
            "description": "Test description",
        }
