-- 4
DELIMITER //
CREATE PROCEDURE GetWordTotalCount (IN word_text VARCHAR(60))
BEGIN
    SELECT SUM(ptw.count) AS total_count
    FROM PageTagsWords ptw
    INNER JOIN Word w 
    ON ptw.id_word = w.id
    WHERE LOWER(w.text) = LOWER(word_text)
END //
DELIMITER ;
-- 5
DELIMITER //
CREATE PROCEDURE GetWordTagCountInPage (IN word_text VARCHAR(60))
BEGIN
    SELECT t.text AS tag, p.url AS page_url, SUM(ptw.count) AS count
    FROM PageTagsWords ptw
    INNER JOIN Word w 
    ON ptw.id_word = w.id
    INNER JOIN Tag t 
    ON ptw.id_tag = t.id
    INNER JOIN Page p 
    ON ptw.id_page = p.id
    WHERE LOWER(w.text) = LOWER(word_text)
    GROUP BY t.text, p.url;
END //
DELIMITER ;
-- 6
DELIMILER //
CREATE OR REPLACE PROCEDURE GetWordContTagCountInPage (IN word_text VARCHAR(200))
BEGIN
    SELECT t.text AS tag, p.url AS page_url, SUM(wcp.count) AS count
    FROM WordContPage wcp
    INNER JOIN WordContiguous wc 
    ON wcp.id_word = wc.id
    INNER JOIN Tag t 
    ON wcp.id_tag = t.id
    INNER JOIN Page p 
    ON wcp.id_page = p.id
    WHERE LOWER(wc.text) = LOWER(word_text)
    GROUP BY t.text, p.url;
END //
DELIMITER ;
