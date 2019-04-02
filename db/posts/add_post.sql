INSERT INTO posts (author_id, img, title, content)
VALUES ($1, $2, $3, $4);

SELECT * FROM posts p
ORDER BY p.id DESC