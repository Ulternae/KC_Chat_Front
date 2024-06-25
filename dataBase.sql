PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS avatars (
avatar_id INTEGER PRIMARY KEY AUTOINCREMENT,
url TEXT
);
INSERT INTO avatars VALUES(1,'https://generative-ai-ultisaer.s3.sa-east-1.amazonaws.com/images/astronaut_skull_in_cosmic_space.png');
INSERT INTO avatars VALUES(2,'https://generative-ai-ultisaer.s3.sa-east-1.amazonaws.com/images/astronaut_skull_in_space.png');
INSERT INTO avatars VALUES(3,'https://generative-ai-ultisaer.s3.sa-east-1.amazonaws.com/images/cloaked_figure_in_misty_city.png');
INSERT INTO avatars VALUES(4,'https://generative-ai-ultisaer.s3.sa-east-1.amazonaws.com/images/dog_survivor_in_ruined_city.png');
INSERT INTO avatars VALUES(5,'https://generative-ai-ultisaer.s3.sa-east-1.amazonaws.com/images/spectral_astronaut_with_stellar_backdrop.png');
INSERT INTO avatars VALUES(6,'https://generative-ai-ultisaer.s3.sa-east-1.amazonaws.com/images/ghost_in_mirror.png');
INSERT INTO avatars VALUES(7,'https://generative-ai-ultisaer.s3.sa-east-1.amazonaws.com/images/astronaut_gazing_into_space.png');
INSERT INTO avatars VALUES(8,'https://generative-ai-ultisaer.s3.sa-east-1.amazonaws.com/images/cosmic_astronaut_with_vibrant_hues.png');
INSERT INTO avatars VALUES(9,'https://generative-ai-ultisaer.s3.sa-east-1.amazonaws.com/images/ominous_deep-sea_fish_lurking.png');
INSERT INTO avatars VALUES(10,'https://generative-ai-ultisaer.s3.sa-east-1.amazonaws.com/images/shattered_chains_and_skeleton_hands.png');
INSERT INTO avatars VALUES(11,'https://generative-ai-ultisaer.s3.sa-east-1.amazonaws.com/images/silhouette_in_abandoned_building.png');
INSERT INTO avatars VALUES(12,'https://generative-ai-ultisaer.s3.sa-east-1.amazonaws.com/images/soldier_walking_through_battlefield_aftermath.png');
INSERT INTO avatars VALUES(13,'https://generative-ai-ultisaer.s3.sa-east-1.amazonaws.com/images/samurai_dog_at_sunset_overlook.png');
INSERT INTO avatars VALUES(28,'https://chasd5c22fb-92asdasd87a2b2e');
INSERT INTO avatars VALUES(29,'https://chasd5c22fb-92asdasd87a2b2e');
CREATE TABLE IF NOT EXISTS messages (
message_id INTEGER PRIMARY KEY AUTOINCREMENT,
chat_id INTEGER,
sender_id TEXT,
content TEXT,
sent_at DATETIME DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (chat_id) REFERENCES chats(chat_id),
FOREIGN KEY (sender_id) REFERENCES users(user_id)
);
INSERT INTO messages VALUES(18,'7773f098-7240-43f1-b210-882fcaa9fe89','111802339391429197905','This is a message in chat User 1','2024-06-21 15:05:34');
INSERT INTO messages VALUES(19,'7773f098-7240-43f1-b210-882fcaa9fe89','106616858079169549304','This is a message in chat User 2','2024-06-21 15:05:56');
INSERT INTO messages VALUES(20,'7773f098-7240-43f1-b210-882fcaa9fe89','106616858079169549304','Hola bro','2024-06-21 15:06:03');
INSERT INTO messages VALUES(21,'7773f098-7240-43f1-b210-882fcaa9fe89','111802339391429197905','Hi','2024-06-21 15:06:11');
INSERT INTO messages VALUES(22,'7773f098-7240-43f1-b210-882fcaa9fe89','111802339391429197905','Como estas','2024-06-21 15:06:15');
INSERT INTO messages VALUES(23,'7773f098-7240-43f1-b210-882fcaa9fe89','106616858079169549304','Bien','2024-06-21 15:06:45');
INSERT INTO messages VALUES(24,'7773f098-7240-43f1-b210-882fcaa9fe89','111802339391429197905','Nice','2024-06-21 15:06:54');
INSERT INTO messages VALUES(25,'7773f098-7240-43f1-b210-882fcaa9fe89','106616858079169549304','Adios bro','2024-06-21 15:06:59');
INSERT INTO messages VALUES(26,'7773f098-7240-43f1-b210-882fcaa9fe89','111802339391429197905','Adios','2024-06-21 15:07:03');
INSERT INTO messages VALUES(27,'7773f098-7240-43f1-b210-882fcaa9fe89','111802339391429197905','GG','2024-06-21 15:07:06');
INSERT INTO messages VALUES(28,'7773f098-7240-43f1-b210-882fcaa9fe89','106616858079169549304','GG','2024-06-21 15:07:10');
INSERT INTO messages VALUES(29,'5f1e46a8-1bca-47a1-98e5-44b7335538f6','111802339391429197905','GG','2024-06-21 15:46:57');
INSERT INTO messages VALUES(30,'5f1e46a8-1bca-47a1-98e5-44b7335538f6','106616858079169549304','asd','2024-06-21 15:47:03');
INSERT INTO messages VALUES(31,'5f1e46a8-1bca-47a1-98e5-44b7335538f6','103689422063917513318','3','2024-06-21 15:47:17');
INSERT INTO messages VALUES(32,'5f1e46a8-1bca-47a1-98e5-44b7335538f6','103689422063917513318','3','2024-06-21 15:47:18');
INSERT INTO messages VALUES(33,'5f1e46a8-1bca-47a1-98e5-44b7335538f6','103689422063917513318','3','2024-06-21 15:47:18');
INSERT INTO messages VALUES(34,'5f1e46a8-1bca-47a1-98e5-44b7335538f6','106616858079169549304','asd','2024-06-21 15:47:19');
INSERT INTO messages VALUES(35,'5f1e46a8-1bca-47a1-98e5-44b7335538f6','111802339391429197905','GG','2024-06-21 15:47:21');
INSERT INTO messages VALUES(36,'5f1e46a8-1bca-47a1-98e5-44b7335538f6','111802339391429197905','GG','2024-06-21 15:47:21');
INSERT INTO messages VALUES(37,'5f1e46a8-1bca-47a1-98e5-44b7335538f6','106616858079169549304','asd','2024-06-21 15:47:22');
INSERT INTO messages VALUES(38,'5f1e46a8-1bca-47a1-98e5-44b7335538f6','111802339391429197905','GG','2024-06-21 15:47:23');
INSERT INTO messages VALUES(39,'5f1e46a8-1bca-47a1-98e5-44b7335538f6','103689422063917513318','3','2024-06-21 15:47:24');
CREATE TABLE IF NOT EXISTS users (
    user_id TEXT PRIMARY KEY,  -- UUID como texto
    avatar_id INTEGER,
    nickname TEXT UNIQUE,
    username TEXT,
    email TEXT UNIQUE,
    password TEXT,
    FOREIGN KEY (avatar_id) REFERENCES avatars(avatar_id)
);
INSERT INTO users VALUES('106616858079169549304',1,'Ultisaer Revternae','Ultisaer Revternae','ultisaer.revternae@gmail.com','$2a$10$nZY92DsI28QhCmHpItMiJeQS7Z4hlCwu0617RDcMBhbiXrxrEZDhi');
INSERT INTO users VALUES('111802339391429197905',1,'Ulternae','Ulternae','ulternae@gmail.com','$2a$10$w0vvyThs218YHQ6jg1J28uk4ZWy2i9KIoHgTZiHeuReBvEKdVxdju');
INSERT INTO users VALUES('109838121142820694014',1,'Sar','Sar','ultimum.sanae@gmail.com','$2a$10$i5soLKr7FYMmUEkIWTtbc.P0gPyDHBdOa7chiUVpmRTeF31gXhR8G');
INSERT INTO users VALUES('103689422063917513318',1,'JHONATAN CASTILLO','JHONATAN CASTILLO','001sargento001@gmail.com','$2a$10$4m1g2NJuANEoHpgj9OOTIuxYuQYwLDgtkmqdPy2.AEwQsrWU0VkLW');
INSERT INTO users VALUES('114508850062700611993',3,'Sar-1039','Sar','ghost.the.sar@gmail.com','$2a$10$0ja83VWgi6AMNQA/ImJQ..MfNmQTipCvxa3BQNzA66fMRrGmYOqmS');
CREATE TABLE IF NOT EXISTS friends (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT,
    friend_id TEXT,
    status TEXT,  -- pending, accepted, blocked
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (friend_id) REFERENCES users(user_id)
);
INSERT INTO friends VALUES(8,'111802339391429197905','114508850062700611993','pending');
INSERT INTO friends VALUES(9,'111802339391429197905','103689422063917513318','pending');
INSERT INTO friends VALUES(10,'111802339391429197905','109838121142820694014','pending');
INSERT INTO friends VALUES(11,'106616858079169549304','109838121142820694014','pending');
INSERT INTO friends VALUES(12,'106616858079169549304','111802339391429197905','pending');
CREATE TABLE IF NOT EXISTS chat_users (
    chat_id INTEGER,
    user_id TEXT,
    PRIMARY KEY (chat_id, user_id),
    FOREIGN KEY (chat_id) REFERENCES chats(chat_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
INSERT INTO chat_users VALUES('7773f098-7240-43f1-b210-882fcaa9fe89','111802339391429197905');
INSERT INTO chat_users VALUES('7773f098-7240-43f1-b210-882fcaa9fe89','106616858079169549304');
INSERT INTO chat_users VALUES('c0edfea0-9c54-44cc-8f9c-0ef4fa34033a','111802339391429197905');
INSERT INTO chat_users VALUES('c0edfea0-9c54-44cc-8f9c-0ef4fa34033a','109838121142820694014');
INSERT INTO chat_users VALUES('d213ea00-ff8e-46dd-91c6-58d68463f6df','111802339391429197905');
INSERT INTO chat_users VALUES('d213ea00-ff8e-46dd-91c6-58d68463f6df','103689422063917513318');
INSERT INTO chat_users VALUES('a493d220-5617-4d1e-87b9-6ef2c663e6bd','106616858079169549304');
INSERT INTO chat_users VALUES('a493d220-5617-4d1e-87b9-6ef2c663e6bd','109838121142820694014');
INSERT INTO chat_users VALUES('9ad94585-d94f-4802-a9e6-060b4bd28485','106616858079169549304');
INSERT INTO chat_users VALUES('9ad94585-d94f-4802-a9e6-060b4bd28485','109838121142820694014');
INSERT INTO chat_users VALUES('f490341c-cc31-4a49-b33c-0b9e252cabe7','111802339391429197905');
INSERT INTO chat_users VALUES('f490341c-cc31-4a49-b33c-0b9e252cabe7','109838121142820694014');
INSERT INTO chat_users VALUES('5f1e46a8-1bca-47a1-98e5-44b7335538f6','106616858079169549304');
INSERT INTO chat_users VALUES('5f1e46a8-1bca-47a1-98e5-44b7335538f6','111802339391429197905');
INSERT INTO chat_users VALUES('5f1e46a8-1bca-47a1-98e5-44b7335538f6','109838121142820694014');
INSERT INTO chat_users VALUES('5f1e46a8-1bca-47a1-98e5-44b7335538f6','103689422063917513318');
INSERT INTO chat_users VALUES('3f79bba0-8436-4054-86aa-7a898e0cefe1','106616858079169549304');
INSERT INTO chat_users VALUES('3f79bba0-8436-4054-86aa-7a898e0cefe1','111802339391429197905');
INSERT INTO chat_users VALUES('3f79bba0-8436-4054-86aa-7a898e0cefe1','109838121142820694014');
INSERT INTO chat_users VALUES('3f79bba0-8436-4054-86aa-7a898e0cefe1','103689422063917513318');
INSERT INTO chat_users VALUES('11502b1c-3ad6-4ac4-bf92-af13ac74a38b','106616858079169549304');
INSERT INTO chat_users VALUES('11502b1c-3ad6-4ac4-bf92-af13ac74a38b','111802339391429197905');
CREATE TABLE IF NOT EXISTS chats (
    chat_id TEXT PRIMARY KEY,  -- UUID como texto
    name TEXT, -- opcional, si tienes nombres de chat
    is_group BOOLEAN,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO chats VALUES('7773f098-7240-43f1-b210-882fcaa9fe89',NULL,0,'2024-06-21 15:04:27');
INSERT INTO chats VALUES('c0edfea0-9c54-44cc-8f9c-0ef4fa34033a',NULL,0,'2024-06-21 15:04:41');
INSERT INTO chats VALUES('d213ea00-ff8e-46dd-91c6-58d68463f6df',NULL,0,'2024-06-21 15:04:54');
INSERT INTO chats VALUES('a493d220-5617-4d1e-87b9-6ef2c663e6bd','Chat Conectado',1,'2024-06-21 15:16:35');
INSERT INTO chats VALUES('9ad94585-d94f-4802-a9e6-060b4bd28485','Chat Conectado v2',1,'2024-06-21 15:16:42');
INSERT INTO chats VALUES('f490341c-cc31-4a49-b33c-0b9e252cabe7','Chat Conectado',1,'2024-06-21 15:17:30');
INSERT INTO chats VALUES('5f1e46a8-1bca-47a1-98e5-44b7335538f6','Chat Conectado',1,'2024-06-21 15:32:40');
INSERT INTO chats VALUES('3f79bba0-8436-4054-86aa-7a898e0cefe1','Chat Conectado SUPERR',1,'2024-06-21 15:32:48');
INSERT INTO chats VALUES('11502b1c-3ad6-4ac4-bf92-af13ac74a38b','Chat Conectado SUPERR',1,'2024-06-21 15:32:54');
CREATE TABLE IF NOT EXISTS group_chats (
    group_id TEXT,
    chat_id TEXT,
    PRIMARY KEY (group_id, chat_id),
    FOREIGN KEY (group_id) REFERENCES groups(group_id),
    FOREIGN KEY (chat_id) REFERENCES chats(chat_id)
);
INSERT INTO group_chats VALUES('17fad9de-96a6-48d1-b065-add47caf5c79','a493d220-5617-4d1e-87b9-6ef2c663e6bd');
INSERT INTO group_chats VALUES('17fad9de-96a6-48d1-b065-add47caf5c79','9ad94585-d94f-4802-a9e6-060b4bd28485');
INSERT INTO group_chats VALUES('ae491ee7-2867-48f0-a86f-9a8a811fa707','f490341c-cc31-4a49-b33c-0b9e252cabe7');
INSERT INTO group_chats VALUES('d9c13f9f-2a26-4304-8129-233045ad28e1','5f1e46a8-1bca-47a1-98e5-44b7335538f6');
INSERT INTO group_chats VALUES('d9c13f9f-2a26-4304-8129-233045ad28e1','3f79bba0-8436-4054-86aa-7a898e0cefe1');
INSERT INTO group_chats VALUES('d9c13f9f-2a26-4304-8129-233045ad28e1','11502b1c-3ad6-4ac4-bf92-af13ac74a38b');
CREATE TABLE IF NOT EXISTS groups (
    group_id TEXT PRIMARY KEY,  -- UUID como texto
    name TEXT,
    description TEXT,
    is_public BOOLEAN,
    creator_id TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (creator_id) REFERENCES users(user_id)
);
INSERT INTO "groups" VALUES('d9c13f9f-2a26-4304-8129-233045ad28e1','Grupo 1','Esta es un super grupo',1,'111802339391429197905','2024-06-21 15:08:22');
INSERT INTO "groups" VALUES('ae491ee7-2867-48f0-a86f-9a8a811fa707','Grupo 2 Creador','Esta es un super grupo',1,'111802339391429197905','2024-06-21 15:08:43');
INSERT INTO "groups" VALUES('17fad9de-96a6-48d1-b065-add47caf5c79','Grupo donde no sos admin Ultisaer','Lolo',0,'106616858079169549304','2024-06-21 15:09:28');
INSERT INTO "groups" VALUES('fec8d867-ffe9-4a36-9206-b3c32278e6b8','Grupo publico de Ultisaer','JIJIJIJA',1,'106616858079169549304','2024-06-21 15:09:51');
CREATE TABLE IF NOT EXISTS group_members (
group_id INTEGER,
user_id TEXT,
is_moderator BOOLEAN,
PRIMARY KEY (group_id, user_id),
FOREIGN KEY (group_id) REFERENCES groups(group_id),
FOREIGN KEY (user_id) REFERENCES users(user_id)
);
INSERT INTO group_members VALUES('d9c13f9f-2a26-4304-8129-233045ad28e1','111802339391429197905',1);
INSERT INTO group_members VALUES('ae491ee7-2867-48f0-a86f-9a8a811fa707','111802339391429197905',1);
INSERT INTO group_members VALUES('17fad9de-96a6-48d1-b065-add47caf5c79','106616858079169549304',1);
INSERT INTO group_members VALUES('fec8d867-ffe9-4a36-9206-b3c32278e6b8','106616858079169549304',1);
INSERT INTO group_members VALUES('d9c13f9f-2a26-4304-8129-233045ad28e1','106616858079169549304',1);
INSERT INTO group_members VALUES('d9c13f9f-2a26-4304-8129-233045ad28e1','109838121142820694014',0);
INSERT INTO group_members VALUES('d9c13f9f-2a26-4304-8129-233045ad28e1','103689422063917513318',1);
INSERT INTO group_members VALUES('d9c13f9f-2a26-4304-8129-233045ad28e1','114508850062700611993',1);
INSERT INTO group_members VALUES('ae491ee7-2867-48f0-a86f-9a8a811fa707','109838121142820694014',0);
INSERT INTO group_members VALUES('17fad9de-96a6-48d1-b065-add47caf5c79','111802339391429197905',0);
INSERT INTO group_members VALUES('17fad9de-96a6-48d1-b065-add47caf5c79','109838121142820694014',0);
INSERT INTO group_members VALUES('17fad9de-96a6-48d1-b065-add47caf5c79','114508850062700611993',0);
CREATE TABLE IF NOT EXISTS settings (
    setting_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT,
    language TEXT,
    theme TEXT,
    FOREIGN KEY (user_id) REFERENCES users (user_id)
  );
INSERT INTO settings VALUES(25,'106616858079169549304','es','lightMode');
INSERT INTO settings VALUES(26,'111802339391429197905','es','darkMode');
INSERT INTO settings VALUES(27,'109838121142820694014','es','darkMode');
INSERT INTO settings VALUES(28,'103689422063917513318','es','darkMode');
INSERT INTO settings VALUES(29,'114508850062700611993','en','lightMode');
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('avatars',29);
INSERT INTO sqlite_sequence VALUES('friends',12);
INSERT INTO sqlite_sequence VALUES('messages',39);
INSERT INTO sqlite_sequence VALUES('settings',29);
COMMIT;