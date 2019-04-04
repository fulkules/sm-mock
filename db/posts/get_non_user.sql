SELECT title,username,img
FROM posts p
JOIN users u ON u.id = p.author_id 
WHERE title ilike ${search} AND u.id != ${id}