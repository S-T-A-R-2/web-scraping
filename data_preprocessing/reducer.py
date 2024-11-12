#!/usr/bin/env python3
from operator import itemgetter
import sys
import json

class WordCollection:
    def __init__(self):
        self.words = {}

    def add(self, word, tag, page):
        if (word not in self.words):
            self.words[word] = {page: {tag: 1}}
        else:
            temp = self.words[word]
            if (page not in temp):
                temp[page] = {tag: 1}
            elif (tag not in temp[page]):
                temp[page][tag] = 1
            else:
                temp[page][tag] += 1

    def get_words_pages(self):
        result = {}
        for word in self.words:
            pages = []
            for page in self.words[word]:
                pages.append(page)
            result[word] = pages
        return result
# Read and reduce
index = 0
words = WordCollection()
words_contiguous = WordCollection()

def third_reduce():
    result = {}
    for word in words.words:
        result[word] = {}
        for page in words.words[word]:
            total = 0
            for tag in words.words[word][page]:
                total += words.words[word][page][tag]
            result[word][page] = total
    print(result)

def reducer():    
    for line in sys.stdin:
        line =  line.strip() #quita saltos de línea
        content = line[1:-1].split(',', 2)
        if (len(content[0].split(' ')) == 2):
            words_contiguous.add(content[0], content[1], content[2])
        else:
            words.add(content[0], content[1], content[2])
    #third_reduce()
    print(json.dumps(words.words, indent=4))

if __name__ == "__main__":
    reducer()