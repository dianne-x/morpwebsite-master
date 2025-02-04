-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Nov 28. 08:26
-- Kiszolgáló verziója: 10.4.28-MariaDB
-- PHP verzió: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `morpdatabase2`
--

DROP DATABASE IF EXISTS morpdatabase2;

CREATE DATABASE morpdatabase2
DEFAULT CHARACTER SET utf8
COLLATE utf8_general_ci;

USE morpdatabase2;

CREATE TABLE Server_Font_Style (
    id INT PRIMARY KEY,
    font_stlye VARCHAR(255)
);

CREATE TABLE RP_Category (
    id INT PRIMARY KEY,
    rp_category VARCHAR(255)
);

CREATE TABLE Gender (
    id INT PRIMARY KEY,
    gender VARCHAR(255)
);

CREATE TABLE Character_Status (
    id INT PRIMARY KEY,
    status VARCHAR(255)
);

CREATE TABLE Character_FC (
    id INT PRIMARY KEY,
    fc_type VARCHAR(255)
);

CREATE TABLE Character_Species (
    id INT PRIMARY KEY,
    species VARCHAR(255)
);

CREATE TABLE Affilation (
    id INT PRIMARY KEY,
    affilation VARCHAR(250)
);

CREATE TABLE Occupation (
    id INT PRIMARY KEY,
    occupation VARCHAR(250)
);

CREATE TABLE Nationality (
    id INT PRIMARY KEY,
    nationality VARCHAR(250)
);

CREATE TABLE Stories (
    id INT PRIMARY KEY,
    story_name VARCHAR(255),
    start_date DATETIME,
    end_date DATETIME
);

CREATE TABLE Thread (
    thread_id INT PRIMARY KEY,
    thread_text VARCHAR(255),
    thread_text_color VARCHAR(7) DEFAULT '#FFFFFF',
    thread_color VARCHAR(7) DEFAULT '#000000',
    thread_post_date DATETIME
);

CREATE TABLE Users (
    uid VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255),
    password VARCHAR(255),
    name VARCHAR(255),
    nickname VARCHAR(255),
    gender_id INT DEFAULT 0,
    profile_pic_path VARCHAR(255),
    language_id VARCHAR(255) DEFAULT '0',
    thread_id INT,
    status_id INT DEFAULT 0,
    about_me VARCHAR(255),
    about_me_color VARCHAR(7) DEFAULT '#000000',
    bio_main_color VARCHAR(7) DEFAULT '#000000',
    bio_text_color VARCHAR(7) DEFAULT '#FFFFFF',
    verified BOOLEAN,
    is_admin BOOLEAN,
    FOREIGN KEY (thread_id) REFERENCES Thread(thread_id)
);

CREATE TABLE servers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    uid VARCHAR(255),
    server_name VARCHAR(255),
    server_picture_path VARCHAR(255),
    main_color VARCHAR(7) DEFAULT '#000000',
    text_color VARCHAR(7) DEFAULT '#FFFFFF',
    server_font_style_id INT DEFAULT 0,
    invite_link VARCHAR(255),
    FOREIGN KEY (server_font_style_id) REFERENCES Server_Font_Style(id)
);

CREATE TABLE Server_Member (
    id INT PRIMARY KEY,
    user_id VARCHAR(255),
    server_id INT,
    is_owner BOOLEAN,
    is_moderator BOOLEAN,
    FOREIGN KEY (user_id) REFERENCES Users(uid),
    FOREIGN KEY (server_id) REFERENCES servers(id)
);

CREATE TABLE Server_Bio (
    id INT PRIMARY KEY,
    about_us VARCHAR(255),
    about_us_color VARCHAR(7) DEFAULT '#000000',
    about_us_text_color VARCHAR(7) DEFAULT '#FFFFFF',
    about_us_header_picture_path VARCHAR(255),
    rp_category_id INT DEFAULT 0,
    FOREIGN KEY (rp_category_id) REFERENCES RP_Category(id),
    FOREIGN KEY (id) REFERENCES servers(id)
);

CREATE TABLE Section (
    id INT PRIMARY KEY,
    server_id INT,
    name VARCHAR(255),
    text_color VARCHAR(7),
    FOREIGN KEY (server_id) REFERENCES servers(id)
);

CREATE TABLE Room (
    id INT PRIMARY KEY,
    section_id INT,
    name VARCHAR(255),
    text_color VARCHAR(7) DEFAULT '#FFFFFF',
    main_color VARCHAR(7) DEFAULT '#000000',
    header_image_path VARCHAR(255),
    description VARCHAR(255),
    FOREIGN KEY (section_id) REFERENCES Section(id)
);

CREATE TABLE User_Character (
    id INT PRIMARY KEY,
    servermember_id INT,
    is_verified BOOLEAN DEFAULT 0,
    is_own_character BOOLEAN DEFAULT 0,
    character_name VARCHAR(250),
    nickname VARCHAR(250),
    gender_id INT DEFAULT 0,
    character_pic_path VARCHAR(255),
    birthdate DATETIME,
    died BOOLEAN,
    deathdate DATETIME,
    resurrected BOOLEAN,
    resurrected_date DATETIME,
    species_id INT DEFAULT 0,
    occupation_id INT DEFAULT 0,
    affilation_id INT DEFAULT 0,
    nationality_id INT DEFAULT 0,
    status_id INT DEFAULT 0,
    story_id INT DEFAULT 0,
    bio VARCHAR(300),
    powers VARCHAR(300),
    weaknesses VARCHAR(300),
    used_item VARCHAR(300),
    family VARCHAR(300),
    universe VARCHAR(300),
    fc_type_id INT DEFAULT 0,
    fc_name VARCHAR(250),
    FOREIGN KEY (servermember_id) REFERENCES Server_Member(id),
    FOREIGN KEY (status_id) REFERENCES Character_Status(id),
    FOREIGN KEY (fc_type_id) REFERENCES Character_FC(id),
    FOREIGN KEY (species_id) REFERENCES Character_Species(id),
    FOREIGN KEY (gender_id) REFERENCES Gender(id),
    FOREIGN KEY (affilation_id) REFERENCES Affilation(id),
    FOREIGN KEY (occupation_id) REFERENCES Occupation(id),
    FOREIGN KEY (nationality_id) REFERENCES Nationality(id)
);

CREATE TABLE Character_Story (
    stories_id INT,
    character_id INT,
    FOREIGN KEY (stories_id) REFERENCES Stories(id),
    FOREIGN KEY (character_id) REFERENCES User_Character(id)
);

CREATE TABLE Room_Message (
    id INT PRIMARY KEY,
    room_id INT,
    character_id INT,
    message VARCHAR(255),
    date DATETIME,
    FOREIGN KEY (room_id) REFERENCES Room(id),
    FOREIGN KEY (character_id) REFERENCES User_Character(id)
);

CREATE TABLE User_Character_Need (
    server_id INT,
    birthdate_need BOOLEAN,
    deathdate_need BOOLEAN,
    resurrected_date_need BOOLEAN,
    species_need BOOLEAN,
    occuptaion_need BOOLEAN,
    affilation_need BOOLEAN,
    nationality_need BOOLEAN,
    powers_need BOOLEAN,
    weaknesses_need BOOLEAN,
    used_item_need BOOLEAN,
    family_need BOOLEAN,
    universe_need BOOLEAN,
    fc_need BOOLEAN,
    FOREIGN KEY (server_id) REFERENCES servers(id)
);

CREATE TABLE Alias_Character (
    id INT PRIMARY KEY,
    character_id INT,
    name VARCHAR(250),
    character_pic_path VARCHAR(100),
    FOREIGN KEY (character_id) REFERENCES User_Character(id)
);

CREATE TABLE Languages (
    id INT PRIMARY KEY,
    language VARCHAR(255)
);

CREATE TABLE Direct_Message_Room (
    id INT PRIMARY KEY,
    user1_id VARCHAR(255),
    user2_id VARCHAR(255),
    main_color VARCHAR(7) DEFAULT '#000000',
    text_color VARCHAR(7) DEFAULT '#FFFFFF',
    header_image_path VARCHAR(255),
    is_friend BOOLEAN,
    FOREIGN KEY (user1_id) REFERENCES Users(uid),
    FOREIGN KEY (user2_id) REFERENCES Users(uid)
);

CREATE TABLE Direct_Message (
    id INT PRIMARY KEY,
    room_id INT,
    sent_from INT,
    message VARCHAR(255),
    sent DATETIME,
    seen BOOLEAN,
    seen_at DATETIME,
    FOREIGN KEY (room_id) REFERENCES Direct_Message_Room(id)
);

CREATE TABLE User_Status (
    id INT PRIMARY KEY,
    status_type VARCHAR(255)
);

CREATE TABLE Server_Stories (
    stories_id INT,
    server_id INT,
    FOREIGN KEY (stories_id) REFERENCES Stories(id),
    FOREIGN KEY (server_id) REFERENCES servers(id)
);

-- Insert basic data into Server_Font_Style
INSERT INTO Server_Font_Style (id, font_stlye) VALUES (1, 'Arial');

-- Insert basic data into RP_Category
INSERT INTO RP_Category (id, rp_category) VALUES (1, 'Fantasy');

-- Insert basic data into Gender
INSERT INTO Gender (id, gender) VALUES (1, 'Male');

-- Insert basic data into Character_Status
INSERT INTO Character_Status (id, status) VALUES (1, 'Active');

-- Insert basic data into Character_FC
INSERT INTO Character_FC (id, fc_type) VALUES (1, 'Type1');

-- Insert basic data into Character_Species
INSERT INTO Character_Species (id, species) VALUES (1, 'Human');

-- Insert basic data into Affilation
INSERT INTO Affilation (id, affilation) VALUES (1, 'Group1');

-- Insert basic data into Occupation
INSERT INTO Occupation (id, occupation) VALUES (1, 'Warrior');

-- Insert basic data into Nationality
INSERT INTO Nationality (id, nationality) VALUES (1, 'American');

-- Insert basic data into Stories
INSERT INTO Stories (id, story_name, start_date, end_date) VALUES (1, 'Story1', '2024-01-01', '2024-12-31');

-- Insert basic data into Thread
INSERT INTO Thread (thread_id, thread_text, thread_text_color, thread_color, thread_post_date) VALUES (1, 'Thread1', '#FFFFFF', '#000000', '2024-01-01 00:00:00');

-- Insert basic data into Users
INSERT INTO Users (uid, email, password, name, nickname, gender_id, profile_pic_path, language_id, thread_id, status_id, about_me, about_me_color, bio_main_color, bio_text_color, verified, is_admin) 
VALUES ('user1', 'user1@example.com', 'password', 'User One', 'U1', 1, '/path/to/profile_pic', 'en', 1, 1, 'About me', '#000000', '#000000', '#FFFFFF', TRUE, FALSE);

-- Insert basic data into servers
INSERT INTO servers (id, uid, server_name, server_picture_path, main_color, text_color, server_font_style_id, invite_link) 
VALUES (1, 'server1', 'Server One', '/path/to/server_pic', '#000000', '#FFFFFF', 1, 'invite_link');

-- Insert basic data into Server_Member
INSERT INTO Server_Member (id, user_id, server_id, is_owner, is_moderator) 
VALUES (1, 'user1', 1, TRUE, FALSE);

-- Insert basic data into Server_Bio
INSERT INTO Server_Bio (id, about_us, about_us_color, about_us_text_color, about_us_header_picture_path, rp_category_id) 
VALUES (1, 'About us', '#000000', '#FFFFFF', '/path/to/header_pic', 1);

-- Insert basic data into Section
INSERT INTO Section (id, server_id, name, text_color) 
VALUES (1, 1, 'Section1', '#FFFFFF');

-- Insert basic data into Room
INSERT INTO Room (id, section_id, name, text_color, main_color, header_image_path, description) 
VALUES (1, 1, 'Room1', '#FFFFFF', '#000000', '/path/to/header_image', 'Description');

-- Insert basic data into User_Character
INSERT INTO User_Character (id, servermember_id, is_verified, is_own_character, character_name, nickname, gender_id, character_pic_path, birthdate, died, deathdate, resurrected, resurrected_date, species_id, occupation_id, affilation_id, nationality_id, status_id, story_id, bio, powers, weaknesses, used_item, family, universe, fc_type_id, fc_name) 
VALUES (1, 1, TRUE, TRUE, 'Character1', 'Char1', 1, '/path/to/character_pic', '2000-01-01', FALSE, NULL, FALSE, NULL, 1, 1, 1, 1, 1, 1, 'Bio', 'Powers', 'Weaknesses', 'Used item', 'Family', 'Universe', 1, 'FC Name');

-- Insert basic data into Character_Story
INSERT INTO Character_Story (stories_id, character_id) 
VALUES (1, 1);

-- Insert basic data into Room_Message
INSERT INTO Room_Message (id, room_id, character_id, message, date) 
VALUES (1, 1, 1, 'Message1', '2024-01-01 00:00:00');

-- Insert basic data into User_Character_Need
INSERT INTO User_Character_Need (server_id, birthdate_need, deathdate_need, resurrected_date_need, species_need, occuptaion_need, affilation_need, nationality_need, powers_need, weaknesses_need, used_item_need, family_need, universe_need, fc_need) 
VALUES (1, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE);

-- Insert basic data into Alias_Character
INSERT INTO Alias_Character (id, character_id, name, character_pic_path) 
VALUES (1, 1, 'Alias1', '/path/to/alias_pic');

-- Insert basic data into Languages
INSERT INTO Languages (id, language) 
VALUES (1, 'English');

-- Insert basic data into Direct_Message_Room
INSERT INTO Direct_Message_Room (id, user1_id, user2_id, main_color, text_color, header_image_path, is_friend) 
VALUES (1, 'user1', 'user1', '#000000', '#FFFFFF', '/path/to/header_image', TRUE);

-- Insert basic data into Direct_Message
INSERT INTO Direct_Message (id, room_id, sent_from, message, sent, seen, seen_at) 
VALUES (1, 1, 1, 'Direct message', '2024-01-01 00:00:00', TRUE, '2024-01-01 00:00:00');

-- Insert basic data into User_Status
INSERT INTO User_Status (id, status_type) 
VALUES (1, 'Active');

-- Insert basic data into Server_Stories
INSERT INTO Server_Stories (stories_id, server_id) 
VALUES (1, 1);
