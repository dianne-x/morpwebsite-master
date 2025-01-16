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
-- Adatbázis: `morpdatabase`
--

DROP DATABASE IF EXISTS morpdatabase;

CREATE DATABASE morpdatabase
DEFAULT CHARACTER SET utf8
COLLATE utf8_general_ci;

USE morpdatabase;


CREATE TABLE User (
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

CREATE TABLE Thread (
    thread_id INT PRIMARY KEY,
    thread_text VARCHAR(255),
    thread_text_color VARCHAR(7) DEFAULT '#FFFFFF',
    thread_color VARCHAR(7) DEFAULT '#000000',
    thread_post_date DATETIME
);

CREATE TABLE Server_Member (
    id INT PRIMARY KEY,
    user_id VARCHAR(255),
    server_id INT,
    is_owner BOOLEAN,
    is_moderator BOOLEAN,
    FOREIGN KEY (user_id) REFERENCES User(uid),
    FOREIGN KEY (server_id) REFERENCES Server(id)
);

CREATE TABLE Server (
    id INT PRIMARY KEY,
    uid VARCHAR(255),
    server_name VARCHAR(255),
    server_picture_path VARCHAR(255),
    main_color VARCHAR(7) DEFAULT '#000000',
    text_color VARCHAR(7) DEFAULT '#FFFFFF',
    server_font_style_id INT DEFAULT 0,
    invite_link VARCHAR(255),
    FOREIGN KEY (server_font_style_id) REFERENCES Server_Font_Style(id)
);

CREATE TABLE Server_Bio (
    id INT PRIMARY KEY,
    about_us VARCHAR(255),
    about_us_color VARCHAR(7) DEFAULT '#000000',
    about_us_text_color VARCHAR(7) DEFAULT '#FFFFFF',
    about_us_header_picture_path VARCHAR(255),
    rp_category_id INT DEFAULT 0,
    FOREIGN KEY (rp_category_id) REFERENCES RP_Category(id),
    FOREIGN KEY (id) REFERENCES Server(id)
);

CREATE TABLE Server_Font_Style (
    id INT PRIMARY KEY,
    font_stlye VARCHAR(255)
);

CREATE TABLE Section (
    id INT PRIMARY KEY,
    server_id INT,
    name VARCHAR(255),
    text_color VARCHAR(7),
    FOREIGN KEY (server_id) REFERENCES Server(id)
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

CREATE TABLE Room_Message (
    id INT PRIMARY KEY,
    room_id INT,
    character_id INT,
    message VARCHAR(255),
    date DATETIME,
    FOREIGN KEY (room_id) REFERENCES Room(id),
    FOREIGN KEY (character_id) REFERENCES User_Character(id)
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
    bio VARCHAR(10000),
    powers VARCHAR(10000),
    weaknesses VARCHAR(10000),
    used_item VARCHAR(10000),
    family VARCHAR(10000),
    universe VARCHAR(10000),
    fc_type_id INT DEFAULT 0,
    fc_name VARCHAR(250),
    FOREIGN KEY (servermember_id) REFERENCES Server_Member(id),
    FOREIGN KEY (status_id) REFERENCES Character_Status(id),
    FOREIGN KEY (fc_type_id) REFERENCES Character_FC(id),
    FOREIGN KEY (species_id) REFERENCES Character_Species(id),
    FOREIGN KEY (gender_id) REFERENCES Gender(id),
    FOREIGN KEY (affilation_id) REFERENCES Affilation(id),
    FOREIGN KEY (occupation_id) REFERENCES Occupation(id),
    FOREIGN KEY (nationality_id) REFERENCES Nationality(id),
    FOREIGN KEY (story_id) REFERENCES Character_Story(stories_id)
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
    FOREIGN KEY (server_id) REFERENCES Server(id)
);

CREATE TABLE Alias_Character (
    id INT PRIMARY KEY,
    character_id INT,
    name VARCHAR(250),
    character_pic_path VARCHAR(100),
    FOREIGN KEY (character_id) REFERENCES User_Character(id)
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

CREATE TABLE Languages (
    id INT PRIMARY KEY,
    language VARCHAR(255)
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

CREATE TABLE Direct_Message_Room (
    id INT PRIMARY KEY,
    user1_id INT,
    user2_id INT,
    main_color VARCHAR(7) DEFAULT '#000000',
    text_color VARCHAR(7) DEFAULT '#FFFFFF',
    header_image_path VARCHAR(255),
    is_friend BOOLEAN,
    FOREIGN KEY (user1_id) REFERENCES User(uid),
    FOREIGN KEY (user2_id) REFERENCES User(uid)
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

CREATE TABLE Gender (
    id INT PRIMARY KEY,
    gender VARCHAR(255)
);

CREATE TABLE RP_Category (
    id INT PRIMARY KEY,
    rp_category VARCHAR(255)
);

CREATE TABLE User_Status (
    id INT PRIMARY KEY,
    status_type VARCHAR(255)
);

CREATE TABLE Stories (
    id INT PRIMARY KEY,
    story_name VARCHAR(255),
    start_date DATETIME,
    end_date DATETIME
);

CREATE TABLE Character_Story (
    stories_id INT,
    character_id INT,
    FOREIGN KEY (stories_id) REFERENCES Stories(id),
    FOREIGN KEY (character_id) REFERENCES User_Character(id)
);

CREATE TABLE Server_Stories (
    stories_id INT,
    server_id INT,
    FOREIGN KEY (stories_id) REFERENCES Stories(id),
    FOREIGN KEY (server_id) REFERENCES Server(id)
);
