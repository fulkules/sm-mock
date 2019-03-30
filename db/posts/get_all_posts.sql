SELECT p.id, p.author_id, p.post, u.username
FROM posts p
JOIN users u
ON p.author_id = u.user_id
ORDER BY p.id ASC