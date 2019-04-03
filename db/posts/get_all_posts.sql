SELECT p.id, p.author_id, u.username, p.title, u.profile_pic
FROM posts p
JOIN users u ON p.author_id = u.id
ORDER BY p.id DESC

-- SELECT p.author_id, p.title, u.profile_pic
-- FROM posts p
-- JOIN users u
-- ON p.author_id = u.author_id
-- ORDER BY p.id DESC;