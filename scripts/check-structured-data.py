#!/usr/bin/env python3
"""Check published JSON-LD against the visible product-page data."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlsplit
import json
import re

ROOT = Path(__file__).resolve().parents[1]

class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.scripts = []
        self.schema_text = None
        self.canonical = None
        self.description = None
        self.images = []
        self.links = []
        self.current_text = None
        self.text = {}

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'script' and a.get('type') == 'application/ld+json':
            self.schema_text = ''
        if tag == 'link' and a.get('rel') == 'canonical':
            self.canonical = a.get('href')
        if tag == 'meta' and a.get('name') == 'description':
            self.description = a.get('content')
        if tag == 'img' and a.get('src'):
            self.images.append(a['src'])
        if tag == 'a' and a.get('href'):
            self.links.append(a['href'])
        if tag == 'p' and a.get('class') in ('product-name', 'big-price'):
            if a['class'] not in self.text:
                self.current_text = a['class']
                self.text[self.current_text] = ''

    def handle_data(self, data):
        if self.schema_text is not None:
            self.schema_text += data
        if self.current_text:
            self.text[self.current_text] += data

    def handle_endtag(self, tag):
        if tag == 'script' and self.schema_text is not None:
            self.scripts.append(json.loads(self.schema_text))
            self.schema_text = None
        if tag == 'p':
            self.current_text = None

def parse(path):
    page = Page()
    page.feed(path.read_text(encoding='utf-8'))
    assert len(page.scripts) == 1, f'{path}: expected one JSON-LD block'
    assert page.scripts[0]['@context'] == 'https://schema.org'
    return page, page.scripts[0]['@graph']

for lang in ('', 'en/'):
    page, graph = parse(ROOT / lang / 'index.html')
    kinds = {item['@type'] for item in graph}
    assert {'Organization', 'WebSite', 'WebPage'} <= kinds
    assert next(x for x in graph if x['@type']=='WebPage')['url'] == page.canonical
    for path in sorted((ROOT / lang / 'products').glob('*.html')):
        page, graph = parse(path)
        entity = next(x for x in graph if x['@type'] in ('Product', 'WebApplication'))
        crumbs = next(x for x in graph if x['@type']=='BreadcrumbList')['itemListElement']
        offer = entity['offers']
        assert entity['url'] == page.canonical, path
        assert entity['name'] == page.text['product-name'].strip(), path
        assert entity['description'] == page.description, path
        assert entity['image'] in [urljoin(page.canonical, src) for src in page.images], path
        assert offer['priceCurrency'] == 'RUB', path
        digits = re.sub(r'\D', '', page.text['big-price'])
        assert offer['price'] == (int(digits) if digits else 0), path
        destinations = [urljoin(page.canonical, href).split('?')[0] for href in page.links]
        assert offer['url'].split('?')[0] in destinations, path
        assert len(crumbs) >= 2 and crumbs[-1]['item'] == page.canonical, path
        assert crumbs[0]['item'] in [urljoin(page.canonical, href) for href in page.links], path
        assert 'aggregateRating' not in entity and 'review' not in entity, path
print('Structured data matches 2 home pages and 14 product pages.')
