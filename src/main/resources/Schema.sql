CREATE TABLE IF NOT EXISTS user_entity (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(255),
    password VARCHAR(255),
    role VARCHAR(255)
);