SELECT p.author_id, p.img, p.content, u.username
FROM posts p
JOIN users u
ON p.author_id = u.id
WHERE p.id = $1