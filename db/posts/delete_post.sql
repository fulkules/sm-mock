DELETE FROM posts
WHERE id = ${id};

SELECT p.id, p.author_id, p.content, u.username
FROM posts p
JOIN users u
ON p.author_id = u.id
ORDER BY p.id ASC