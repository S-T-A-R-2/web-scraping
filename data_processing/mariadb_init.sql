create schema web_scraping;
create user 'frijol'@'%' identified by 'arroz';
grant all privileges on web_scraping.* to 'frijol'@'%';
