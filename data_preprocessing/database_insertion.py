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

except pymysql.MySQLError as e:
    print(f"Error al conectar o ejecutar la consulta: {e}")

finally:
    if connection:
        connection.close()
