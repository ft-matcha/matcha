INSERT INTO ?? (fromId, toId, status)
VALUES (
   (SELECT id FROM user WHERE email = ?),
   (SELECT id FROM user WHERE email = ?),
   ?
);
