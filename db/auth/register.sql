INSERT INTO users (username, password, profile_pic)
VALUES (${username}, ${password}, ${profile_pic})
RETURNING id, username, profile_pic