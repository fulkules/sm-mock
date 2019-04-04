-- CREATE TABLE users (
--     id serial primary key,
--     username varchar(20),
--     password varchar(20),
--     profile_pic text
-- );

-- CREATE TABLE posts (
--     id serial primary key,
--     title varchar(45),
--     img text,
--     content text,
--     author_id integer,
--     FOREIGN KEY (author_id) REFERENCES users(id) 
-- );

-- CREATE TABLE "session" (
--   "sid" varchar NOT NULL COLLATE "default",
-- 	"sess" json NOT NULL,
-- 	"expire" timestamp(6) NOT NULL
-- )
-- WITH (OIDS=FALSE);
-- ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;



