INSERT INTO users (username, password, profile_pic)
VALUES (${username}, ${password}, 'https://images.unsplash.com/photo-1551336841-32a98a5917eb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1048&q=80')
RETURNING id, username, profile_pic