import pymysql

host = '192.168.100.15'
user = 'frijol'
password = 'arroz'
database = 'web_scraping'

try:
    connection = pymysql.connect(
        host=host,
        user=user,
        password=password,
        database=database
    )

    cursor = connection.cursor()
    tables = []
    tables.append("""
    CREATE OR REPLACE TABLE Word (
        id                          INT UNSIGNED AUTO_INCREMENT,
        text                        VARCHAR(60) unique,
        PRIMARY KEY (id)
    );
    """)
    tables.append("""
    CREATE OR REPLACE TABLE WordContiguous (
        id_word1                    INT UNSIGNED,
        id_word2                    INT UNSIGNED,
        CONSTRAINT fk_wc_w1 FOREIGN KEY (id_word1)
        REFERENCES Word(id) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT fk_wc_w2 FOREIGN KEY (id_word2)
        REFERENCES Word(id) ON DELETE CASCADE ON UPDATE CASCADE,
        PRIMARY KEY (id_word1, id_word2)
    );
    """)
    tables.append("""
    CREATE OR REPLACE TABLE Tag (
        id                          INT UNSIGNED AUTO_INCREMENT,
        text                        VARCHAR(3) unique,
        PRIMARY KEY (id)
    );
    """)
    tables.append("""
    CREATE OR REPLACE TABLE Page (
        id                          INT UNSIGNED AUTO_INCREMENT,
        url                         VARCHAR(200) unique,
        PRIMARY KEY (id)
    );
    """)
    tables.append("""
    CREATE OR REPLACE TABLE PageTags (
        id_tag                      INT UNSIGNED,
        id_page                     INT UNSIGNED,
        differents_words            INT,
        total_words                 INT,
        CONSTRAINT fk_pagetags_tag FOREIGN KEY (id_tag)
        REFERENCES Tag(id) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT fk_pagetags_page FOREIGN KEY (id_page)
        REFERENCES Page(id) ON DELETE CASCADE ON UPDATE CASCADE,
        PRIMARY KEY (id_tag, id_page)
    );
    """)
    tables.append("""
    CREATE OR REPLACE TABLE PageTagsWords (
        id_tag                      INT UNSIGNED,
        id_page                     INT UNSIGNED,
        id_word                     INT UNSIGNED,
        count                       INT,
        percentage                  INT,
        CONSTRAINT fk_ptw_tag FOREIGN KEY (id_tag)
        REFERENCES Tag(id) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT fk_ptw_page FOREIGN KEY (id_page)
        REFERENCES Page(id) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT fk_ptw_word FOREIGN KEY (id_word)
        REFERENCES Word(id) ON DELETE CASCADE ON UPDATE CASCADE,
        PRIMARY KEY (id_tag, id_page, id_word)
    );
    """)
    tables.append("""
    CREATE OR REPLACE TABLE WordContPage (
        id_word1                    INT UNSIGNED,
        id_word2                    INT UNSIGNED,
        id_tag                      INT UNSIGNED,
        id_page                     INT UNSIGNED,
        CONSTRAINT fk_wcp_w1 FOREIGN KEY (id_word1)
        REFERENCES Word(id) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT fk_wcp_w2 FOREIGN KEY (id_word2)
        REFERENCES Word(id) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT fk_wcp_tag FOREIGN KEY (id_tag)
        REFERENCES Tag(id) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT fk_wcp_page FOREIGN KEY (id_page)
        REFERENCES Page(id) ON DELETE CASCADE ON UPDATE CASCADE,
        PRIMARY KEY (id_word1, id_word2, id_page, id_tag)
    );
    """)
    for table in tables:
        cursor.execute(table)


except pymysql.MySQLError as e:
    print(f"Error al conectar o ejecutar la consulta: {e}")

finally:
    if connection:
        connection.close()
