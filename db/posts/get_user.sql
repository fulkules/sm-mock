SELECT title,username,profile_pic
FROM posts p
JOIN users u ON u.id = p.author_id
WHERE author_id = ${user_id};