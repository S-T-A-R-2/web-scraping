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
sep = r'[;,.:()\s]+'
pages = []
page = Page('a')
tags = ['#', '##', '###', '####', '#####', '######']

def has_number(string):
    return bool(re.search(r'\d', string))

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

        page.add_word(word, current_tag)
        # Mapear y reducir las palabras contiguas
        contiguous = line[index+1].lower()

        if ((contiguous in discard) or (re.match(r'^\d+$', contiguous)) or (len(contiguous) < 2) or has_number(contiguous)):
            continue

        word_contiguous = word + " " + contiguous
        page.add_word(word_contiguous, current_tag)

    # Revisar la última palabra que fue excluida para calcular las palabras contiguas
    last = line[-1]
    if last in tags:
        open_tag = not open_tag
        if (not open_tag):
            current_tag = 'p'
    if last not in discard and (not re.match(r'^\d+$', last)) and len(last) > 1:
        page.add_word(word, current_tag)

# Sort the dictionary
# words = dict(sorted(words.items(), key=lambda item: item[1], reverse=True))
# words_contiguous = dict(sorted(words_contiguous.items(), key=lambda item: item[1], reverse=True))
for page in pages[0:1]:
    print(page.url)
    print(page.tags_words)
    print(page.tags_words_contiguous)
