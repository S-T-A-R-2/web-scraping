DELIMITER //
-- 8
CREATE OR REPLACE PROCEDURE GetWordPercentageInPage(IN pageId INT)
BEGIN
    DECLARE totalWords INT;

    SELECT SUM(ptw.count) INTO totalWords
    FROM PageTagsWords ptw
    WHERE ptw.id_page = pageId;

    SELECT 
        w.text AS palabra,
        ROUND((SUM(ptw.count) / totalWords) * 100, 2) AS porcentaje
    FROM 
        Word w
    INNER JOIN 
        PageTagsWords ptw ON w.id = ptw.id_word
    WHERE 
        ptw.id_page = pageId
    GROUP BY 
        w.text
    ORDER BY 
        porcentaje DESC;

END //

DELIMITER ;

DELIMITER //
-- 9
CREATE OR REPLACE PROCEDURE GetTopTagsByDistinctWords(IN pageId INT)
BEGIN
    SELECT 
        t.text AS tag,
        COUNT(DISTINCT ptw.id_word) AS distinct_words_count
    FROM 
        PageTagsWords ptw
    INNER JOIN 
        Tag t ON ptw.id_tag = t.id
    WHERE 
        ptw.id_page = pageId
    GROUP BY 
        t.id
    ORDER BY 
        distinct_words_count DESC
    LIMIT 10;
END //

DELIMITER ;

DELIMITER //
-- 10
CREATE OR REPLACE PROCEDURE GetTopTagsByTextCount(IN pageId INT)
BEGIN
    SELECT 
        t.text AS tag,
        CAST(SUM(ptw.count) AS UNSIGNED) AS total_word_count
    FROM 
        PageTagsWords ptw
    INNER JOIN 
        Tag t ON ptw.id_tag = t.id
    WHERE 
        ptw.id_page = pageId
    GROUP BY 
        t.id
    ORDER BY 
        total_word_count DESC
    LIMIT 10;
END //

DELIMITER ;

