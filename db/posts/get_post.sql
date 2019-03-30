SELECT p.id, p.author_id, p.content, u.username, u.password
FROM posts p
JOIN users u
ON p.author_id = u.id
WHERE p.id = $1
ORDER BY p.id ASC