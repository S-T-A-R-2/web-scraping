#!/usr/bin/env python3
import sys
import json
import re
import pickle
from collections import defaultdict

def reducer():
    words = {}

    for line in sys.stdin:
        line = line.strip()
        content = line[1:-1].split(',', 2)  # Extract word, tag, and page
        word = content[0]
        tag = content[1]
        page = content[2]

        if (word in words):
            if (page not in words[word]):
                words[word][page] = {}
            if (tag not in words[word][page]):
                words[word][page][tag] = 1
            else:
                words[word][page][tag] += 1
        else:
            words[word] = {page: {tag: 1}}

    # Imprime el resultado en formato JSON
    for word in words:
        print(f'{word}:{{', end='')
        for page in words[word]:
            print(f'{page}: [', end='')
            last_key, last_value = words[word][page].popitem()
            for tag in words[word][page]:
                temp = words[word][page][tag]
                if (temp != 0):
                    print(f'{tag}: {temp}, ', end='')
            print(f'{last_key}: {last_value}', end='')
            print(']', end='')
        print('}')
    #with open('data.pkl', 'wb') as f:
    #    pickle.dump(words, f)
    #print(json.dumps(words, indent=2))
if __name__ == "__main__":
    reducer()
