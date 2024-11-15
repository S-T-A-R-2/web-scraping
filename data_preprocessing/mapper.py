#!/usr/bin/env python3
import sys
import re

def has_number(string):
    return bool(re.search(r'\d', string))

def mapper():
    discard = [
        "el", "la", "lo", "los", "las", "en", "un", "una", "unos", "unas", "a", "ante", "bajo", "cabe",
        "con", "contra", "de", "desde", "entre", "hacia", "hasta", "para", "por",
        "según", "sin", "so", "sobre", "tras", "y", "o", "u", "es", "son", "ser", "se",
        "como", "de", "ha", "que", "del", "su", "#", "##", "###", "####", "#####", "######"
    ]
    sep = r'[;,.:()"\s]+'
    tags = ['#', '##', '###', '####', '#####', '######']
    current_page = None
    current_tag = 'p'
    open_tag = False
    
    for line in sys.stdin:
        line = line.strip()
        if(len(line) > 5 and line[0:5] == '[URL]'):
            current_page = line[6:-1]
            continue
        if (not current_page):
            continue
        line = re.split(sep, line)
        subline = line[:-1]
        index = -1

        for word in subline:
            index += 1
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

            print(f'({word},{current_tag},{current_page})')
            contiguous = line[index+1].lower()
            if ((contiguous in discard) or (re.match(r'^\d+$', contiguous)) or (len(contiguous) < 2) or has_number(contiguous)):
                continue
            word_contiguous = word + " " + contiguous
            print(f'({word_contiguous},{current_tag},{current_page})')
        # Revisar la última palabra que fue excluida para calcular las palabras contiguas
        last = line[-1]
        if last in tags:
            open_tag = not open_tag
            if (not open_tag):
                current_tag = 'p'
        if last not in discard and (not re.match(r'^\d+$', last)) and len(last) > 1 and not has_number(last):
            print(f'({last},{current_tag},{current_page})')
if __name__ == "__main__":
    mapper()
