DELIMITER //
-- 1
CREATE OR REPLACE PROCEDURE searchByWord(IN wordV VARCHAR(200))
	BEGIN
			
		DECLARE word VARCHAR(100);
		DECLARE urlV VARCHAR(2000);
		DECLARE headerV VARCHAR(5);
		DECLARE weight INT;
		
		
		DECLARE fin_cursor INT DEFAULT 0;
		
		DECLARE cur CURSOR FOR SELECT w.text word, p.url url, t.text header
		FROM Word w
		INNER JOIN PageTagsWords ptw
		ON w.id = ptw.id_word
		INNER JOIN Page p
		ON ptw.id_page = p.id
		INNER JOIN Tag t
		ON ptw.id_tag = t.id
		WHERE w.text = wordV
		ORDER BY w.text, t.text;
		
		DECLARE CONTINUE HANDLER FOR NOT FOUND SET fin_cursor = 1;

		
		OPEN cur;

		SET weight = 0;
		
		lectura: LOOP
			FETCH cur INTO word, urlV, headerV;
			
			IF fin_cursor = 1 THEN
            LEAVE lectura;
         END IF;
			
			IF headerV = 'h1' THEN
				SET weight = weight + 7;
			END IF;
			
			IF headerV = 'h2' THEN
				SET weight = weight + 6;
			END IF;
			
			IF headerV = 'h3' THEN
				SET weight = weight + 5;
			END IF;
			
			IF headerV = 'h4' THEN
				SET weight = weight + 4;
			END IF;
			
			IF headerV = 'h5' THEN
				SET weight = weight + 3;
			END IF;
			
			IF headerV = 'h6' THEN
				SET weight = weight + 2;
			END IF;
			
			IF headerV = 'p' THEN
				SET weight = weight + 1;
			END IF;
		
		END LOOP;
		
		SELECT w.text word, p.url url, t.text header, weight
		FROM Word w
		INNER JOIN PageTagsWords ptw
		ON w.id = ptw.id_word
		INNER JOIN Page p
		ON ptw.id_page = p.id
		INNER JOIN Tag t
		ON ptw.id_tag = t.id
		WHERE w.text = wordV
		ORDER BY t.text;
						
		CLOSE cur;
		
						
		
	END;	
// 

DELIMITER //
-- 2
CREATE OR REPLACE PROCEDURE searchByWordContiguous(IN wordV VARCHAR(400))
	BEGIN
			
		DECLARE word VARCHAR(100);
		DECLARE urlV VARCHAR(2000);
		DECLARE headerV VARCHAR(5);
		DECLARE weight INT;
		
		
		DECLARE fin_cursor INT DEFAULT 0;
		
		DECLARE cur CURSOR FOR SELECT w.text word, p.url url, t.text header
		FROM WordContiguous w
		INNER JOIN PageTagsWords ptw
		ON w.id = ptw.id_word
		INNER JOIN Page p
		ON ptw.id_page = p.id
		INNER JOIN Tag t
		ON ptw.id_tag = t.id
		WHERE w.text = wordV
		ORDER BY w.text, t.text;
		
		DECLARE CONTINUE HANDLER FOR NOT FOUND SET fin_cursor = 1;

		
		OPEN cur;

		SET weight = 0;
		
		lectura: LOOP
			FETCH cur INTO word, urlV, headerV;
			
			IF fin_cursor = 1 THEN
            LEAVE lectura;
         END IF;
			
			IF headerV = 'h1' THEN
				SET weight = weight + 7;
			END IF;
			
			IF headerV = 'h2' THEN
				SET weight = weight + 6;
			END IF;
			
			IF headerV = 'h3' THEN
				SET weight = weight + 5;
			END IF;
			
			IF headerV = 'h4' THEN
				SET weight = weight + 4;
			END IF;
			
			IF headerV = 'h5' THEN
				SET weight = weight + 3;
			END IF;
			
			IF headerV = 'h6' THEN
				SET weight = weight + 2;
			END IF;
			
			IF headerV = 'p' THEN
				SET weight = weight + 1;
			END IF;
		
		END LOOP;
		
		SELECT w.text word, p.url url, t.text header, weight
		FROM WordContiguous w
		INNER JOIN WordContPage ptw
		ON w.id = ptw.id_word
		INNER JOIN Page p
		ON ptw.id_page = p.id
		INNER JOIN Tag t
		ON ptw.id_tag = t.id
		WHERE w.text = wordV
		ORDER BY t.text;
						
		CLOSE cur;
		
				
		
	END;	
// 
-- 3
DELIMITER //
CREATE OR REPLACE PROCEDURE wordsByPage(IN pageId INT)
	BEGIN	
		
		SELECT w.text, COUNT(w.text) AS count
		FROM Word w
		INNER JOIN PageTagsWords ptw
		ON w.id = ptw.id_word
		WHERE ptw.id_page = pageId
		GROUP BY w.text;
	END;
//

CALL wordsByPage(5428);
