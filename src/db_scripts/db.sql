DROP DATABASE IF EXISTS MORPDatabase;

CREATE DATABASE MORPDatabase
CHARACTER SET utf8
COLLATE utf8_general_ci;

USE MORPDatabase;

CREATE TABLE Users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    uid VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    nickname VARCHAR(100) NOT NULL,
    gender_id INT NOT NULL,
    profile_pic_path VARCHAR(255) NOT NULL DEFAULT 'user.png',
    language_id INT NOT NULL,
    thread_text VARCHAR(255) NOT NULL,
    thread_text_color VARCHAR(255) NOT NULL,
    thread_color VARCHAR(255) NOT NULL,
    status_id INT NOT NULL,
    about_me VARCHAR(255) NOT NULL,
    about_me_color VARCHAR(255) NOT NULL,
    bio_main_color VARCHAR(255) NOT NULL,
    bio_text_color VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT 0,
    verified BOOLEAN DEFAULT 0
);

CREATE TABLE Server_Member(
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    server_id INT NOT NULL,
    is_owner BOOLEAN DEFAULT 0,
    is_moderator BOOLEAN DEFAULT 0
);

CREATE TABLE Servers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    uid VARCHAR(100) NOT NULL UNIQUE,
    server_name VARCHAR(100) NOT NULL,
    server_picture_path VARCHAR(255) NOT NULL,
    main_color VARCHAR(255) NOT NULL,
    text_color VARCHAR(255) NOT NULL,
    server_font_style_id INT NOT NULL,
    stories_id INT NOT NULL,
    invite_link VARCHAR(255) NOT NULL
);
