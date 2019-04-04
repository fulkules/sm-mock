SELECT title,username,img
FROM posts p
JOIN users u ON u.id = p.author_id 
WHERE author_id = ${author_id};