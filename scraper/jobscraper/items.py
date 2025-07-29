# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy

class JobData(scrapy.Item):
    # define the fields for your item here like:
    url = scrapy.Field()
    id = scrapy.Field()
    title = scrapy.Field()
    description = scrapy.Field()

    company = scrapy.Field()
    location = scrapy.Field()
    datePosted = scrapy.Field()
    salary = scrapy.Field()
    
    type = scrapy.Field()
    hidden = scrapy.Field(default=False)  # Field to mark if the job is hidden
    spider = scrapy.Field()  # Field to store the spider name