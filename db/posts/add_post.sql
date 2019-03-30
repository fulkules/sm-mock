INSERT INTO posts (author_id, content)
VALUES (${author_id}, ${content})

SELECT p.id, p.author_id, p.content, u.username
FROM posts p
JOIN users u
ON p.author_id = u.id
ORDER BY p.id ASC