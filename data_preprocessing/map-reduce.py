# Mapper- Reducer
import pymysql as mariadb
import sys
import re

class Page:
    def __init__(self, url):
        self.url = url
        self.total_word = 0
        self.tags_words = {'#': {'total': 0, 'words': {}},
                           '##': {'total': 0, 'words': {}},
                           '###': {'total': 0, 'words': {}},
                           '####': {'total': 0, 'words': {}},
                           '#####': {'total': 0, 'words': {}},
                           '######': {'total': 0, 'words': {}},
                           'p' : {'total': 0, 'words': {}}}
        self.tags_words_contiguous = {
                           '#': {'total': 0, 'words': {}},
                           '##': {'total': 0, 'words': {}},
                           '###': {'total': 0, 'words': {}},
                           '####': {'total': 0, 'words': {}},
                           '#####': {'total': 0, 'words': {}},
                           '######': {'total': 0, 'words': {}},
                           'p' : {'total': 0, 'words': {}}}
    def add_word(self, word, tag):
        if (len(word.split()) == 2):
            self.tags_words_contiguous[tag]['total'] += 1
            words = self.tags_words_contiguous[tag]['words']
        else:
            self.tags_words[tag]['total'] += 1
            words = self.tags_words[tag]['words']
        if (word not in words):
            words[word] = 1
        else:
            words[word] += 1
    def get_words(self, tag=None):
        result = []
        if (not tag):
            for tag in self.tags_words:
                for word in self.tags_words[tag]['words']:
                    result.append(word)
        return result
    def contains(self, word):
        for tag in self.tags_words:
            if (word in self.tags_words[tag]['words']):
                return True
        return False

class WordCollection:
    def __init__(self):
        self.words = {}

    def add(self, word, page, tag):
        if (word not in self.words):
            self.words[word] = {'Pages': {page: {tag: 1}}}
        else:
            temp = self.words[word]
            if (page not in temp['Pages']):
                temp['Pages'][page] = {tag: 1}
            elif (tag not in temp['Pages'][page]):
                temp['Pages'][page][tag] = 1
            else:
                temp['Pages'][page][tag] += 1

    def get_words_pages(self):
        result = {}
        for word in self.words:
            pages = []
            for page in self.words[word]['Pages']:
                pages.append(page)
            result[word] = pages
        return result

# Connect to MariaDB Platform
host = '192.168.100.15'
user = 'frijol'
password = 'arroz'
database = 'web_scraping'

try:
    conn = mariadb.connect(
        host=host,
        user=user,
        password=password,
        database=database
    )
except mariadb.Error as e:
    print(f"Error connecting to MariaDB Platform: {e}")
    conn = None

file = open('./wikipedia_data/data1.md', 'r')
discard = [
    "el", "la", "lo", "los", "las", "en", "un", "una", "unos", "unas", "a", "ante", "bajo", "cabe",
    "con", "contra", "de", "desde", "entre", "hacia", "hasta", "para", "por",
    "según", "sin", "so", "sobre", "tras", "y", "o", "u", "es", "son", "ser", "se",
    "como", "de", "ha", "que", "del", "su", "#", "##", "###", "####", "#####", "######"
]

# Read file
content = file.read()
lines = content.splitlines()

# Init
current_page = None
current_tag = 'p'
open_tag = False
sep = r'[;,.:()"\s]+'
pages = []
page = Page('a')
tags = ['#', '##', '###', '####', '#####', '######']

def has_number(string):
    return bool(re.search(r'\d', string))


words = WordCollection()
words_contiguous = WordCollection()
# Read text
for line in lines:
    # Get current page url
    if(len(line) > 5 and line[0:5] == '[URL]'):
        current_page = line[6:-1]
        page = Page(current_page)
        pages.append(page)
        continue
    if (not current_page):
        continue

    line = re.split(sep, line)                   # split the line into words
    subline = line[:-1]                             # Exclude the last word
    index = -1

    for word in subline:
        index += 1 # Contador de palabras
        word = word.lower()
        # Mapear y reducir palabras individuales
        if word in tags:
            open_tag = not open_tag
            if (open_tag):
                current_tag = word
            else:
                current_tag = 'p'
            continue
        elif ((word in discard) or (re.match(r'^\d+$', word)) or (len(word) < 2) or has_number(word)):
            continue

        #page.add_word(word, current_tag)
        words.add(word, current_page, current_tag)
        #if (word not in words):
        #    print('voma')
        #    words.append(word)
        # Mapear y reducir las palabras contiguas
        contiguous = line[index+1].lower()

        if ((contiguous in discard) or (re.match(r'^\d+$', contiguous)) or (len(contiguous) < 2) or has_number(contiguous)):
            continue

        word_contiguous = word + " " + contiguous
        words_contiguous.add(word_contiguous, current_page, current_tag)
        #page.add_word(word_contiguous, current_tag)
        #words.add(word, current_page, current_tag)

    # Revisar la última palabra que fue excluida para calcular las palabras contiguas
    last = line[-1]
    if last in tags:
        open_tag = not open_tag
        if (not open_tag):
            current_tag = 'p'
    if last not in discard and (not re.match(r'^\d+$', last)) and len(last) > 1 and not has_number(contiguous):
        #page.add_word(last, current_tag)
        words.add(last, current_page, current_tag)

# Sort the dictionary
# words = dict(sorted(words.items(), key=lambda item: item[1], reverse=True))
# words_contiguous = dict(sorted(words_contiguous.items(), key=lambda item: item[1], reverse=True))
#print(words.words)

#for word in words.words:
#    for page in words.words[word]['Pages']:
#        if page == 'https://es.wikipedia.org/wiki/Canal_45_(Chile)':
#            for tag in words.words[word]['Pages'][page]:
#                print(f'{word}  tag: {tag}, count: {words.words[word]['Pages'][page][tag]}')

#for word in words_contiguous.words:
#    for page in words_contiguous.words[word]['Pages']:
#        if page == 'https://es.wikipedia.org/wiki/Canal_45_(Chile)':
#            for tag in words_contiguous.words[word]['Pages'][page]:
#                print(f'{word}  tag: {tag}, count: {words_contiguous.words[word]['Pages'][page][tag]}')

# First hadoop
# print(words.get_words_pages())

# Second hadoop
# print(words_contiguous.get_words_pages())

# Third h
result = {}
for word in words.words:
    for page in words.words[word]['Pages']:
        total = 0
        for tag in words.words[word]['Pages'][page]:
            total += words.words[word]['Pages'][page][tag]
        result[word] = {page: total}
        #break
    #break
print(result)

# Fourth
for word in words.words:
    total = 0
    for page in words.words[word]['Pages']:
        for tag in words.words[word]['Pages'][page]:
            total += words.words[word]['Pages'][page][tag]
        result[word] = {page: total}
        #break
print(result)

# fifth
print(words.words)

# six
print(words_contiguous)

# seven






