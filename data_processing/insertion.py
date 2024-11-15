import mysql.connector
import re
# Conexión a la base de datos MariaDB
db = mysql.connector.connect(
    host = '192.168.100.15',
    user = 'frijol',
    password = 'arroz',
    database = 'web_scraping'
)

cursor = db.cursor()

def insert_word(word):
    cursor.execute("SELECT id FROM Word WHERE text = %s", (word,))
    result = cursor.fetchone()
    if not result:
        cursor.execute("INSERT INTO Word (text) VALUES (%s)", (word,))
        db.commit()
        cursor.execute("SELECT id FROM Word WHERE text = %s", (word,))
        result = cursor.fetchone()
    return result[0]

def insert_page(url):
    cursor.execute("SELECT id FROM Page WHERE url = %s", (url,))
    result = cursor.fetchone()
    if not result:
        cursor.execute("INSERT INTO Page (url) VALUES (%s)", (url,))
        db.commit()
        cursor.execute("SELECT id FROM Page WHERE url = %s", (url,))
        result = cursor.fetchone()
    return result[0]

def get_tag_id(tag):
    if (tag != "p"):
        size = len(tag)
        tag = f'h{size}'
    cursor.execute("SELECT id FROM Tag WHERE text = %s", (tag,))
    return cursor.fetchone()[0]

def insert_pagetag(id_tag, id_page, differents_words, total_words):
    # Insertar relación en la tabla `PageTags`
    cursor.execute("""
        INSERT INTO PageTags (id_tag, id_page, differents_words, total_words)
        VALUES (%s, %s, 1, %s)
        ON DUPLICATE KEY UPDATE total_words = total_words + %s
    """, (id_tag, id_page, differents_words, total_words))
    db.commit()

def insert_pagetagwords(id_tag, id_page, id_word, count, percentage):
    cursor.execute("""
        INSERT INTO PageTagsWords (id_tag, id_page, id_word, count, percentage)
        VALUES (%s, %s, %s, %s, 0)
        ON DUPLICATE KEY UPDATE count = count + %s
    """, (id_tag, id_page, id_word, count, percentage))
    db.commit()

def insert_wordcontpage(id_word1, id_word2, id_tag, id_page):
    cursor.execute("""
        INSERT INTO WordContPage (id_word1, id_word2, id_tag, id_page)
        VALUES (%s, %s, %s, %s)
    """, (id_word1, id_word2, id_tag, id_page))
    db.commit()


# Leer el archivo
file_path = "data2_reduced.txt"
with open(file_path, "r", encoding="utf-8") as file:
    lines = file.readlines()

for line in lines:                                          # Procesar cada línea
    word, details = line.strip().split(":{", 1)             # Separar palabra y contenido
    details = details[:-1]                                  # Quitar el último '}' al final
    id_word = insert_word(word)                             # Insertar la palabra
    
    url_pattern = re.compile(r"https?://[^\s]+: \[.*?\]")   # Procesar cada URL en los detalles
    
    for match in url_pattern.findall(details):
        url, tags = match.split(": [")
        tags = tags[:-1]                                    # Quitar ']'
        page_id = insert_page(url)                          # Insertar página

        for tag_count in tags.split(", "):                  # Procesar etiquetas para cada URL
            tag, count = tag_count.split(": ")
            count = int(count)
            
            tag_id = get_tag_id(tag)
            insert_pagetagwords(tag_id, page_id, id_word, count, count)
            #insert_pagetag(tag_id, page_id, count, count)

# Confirmar cambios y cerrar conexión
db.commit()
cursor.close()
db.close()