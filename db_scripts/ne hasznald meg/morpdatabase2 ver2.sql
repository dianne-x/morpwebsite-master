-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Feb 03. 09:24
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

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `affilation`
--

CREATE TABLE `affilation` (
  `id` int(11) NOT NULL,
  `affilation` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- A tábla adatainak kiíratása `affilation`
--

INSERT INTO `affilation` (`id`, `affilation`) VALUES
(1, 'Group1');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `alias_character`
--

CREATE TABLE `alias_character` (
  `id` int(11) NOT NULL,
  `character_id` int(11) DEFAULT NULL,
  `name` varchar(250) DEFAULT NULL,
  `character_pic_path` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- A tábla adatainak kiíratása `alias_character`
--

INSERT INTO `alias_character` (`id`, `character_id`, `name`, `character_pic_path`) VALUES
(1, 1, 'Alias1', '/path/to/alias_pic');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `character_fc`
--

CREATE TABLE `character_fc` (
  `id` int(11) NOT NULL,
  `fc_type` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- A tábla adatainak kiíratása `character_fc`
--

INSERT INTO `character_fc` (`id`, `fc_type`) VALUES
(1, 'Femboy face');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `character_species`
--

CREATE TABLE `character_species` (
  `id` int(11) NOT NULL,
  `species` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- A tábla adatainak kiíratása `character_species`
--

INSERT INTO `character_species` (`id`, `species`) VALUES
(1, 'Human');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `character_status`
--

CREATE TABLE `character_status` (
  `id` int(11) NOT NULL,
  `status` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- A tábla adatainak kiíratása `character_status`
--

INSERT INTO `character_status` (`id`, `status`) VALUES
(1, 'Active');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `character_story`
--

CREATE TABLE `character_story` (
  `stories_id` int(11) DEFAULT NULL,
  `character_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- A tábla adatainak kiíratása `character_story`
--

INSERT INTO `character_story` (`stories_id`, `character_id`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `direct_message`
--

CREATE TABLE `direct_message` (
  `id` int(11) NOT NULL,
  `room_id` int(11) DEFAULT NULL,
  `sent_from` int(11) DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `sent` datetime DEFAULT NULL,
  `seen` tinyint(1) DEFAULT NULL,
  `seen_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- A tábla adatainak kiíratása `direct_message`
--

INSERT INTO `direct_message` (`id`, `room_id`, `sent_from`, `message`, `sent`, `seen`, `seen_at`) VALUES
(1, 1, 1, 'Direct message', '2024-01-01 00:00:00', 1, '2024-01-01 00:00:00');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `direct_message_room`
--

CREATE TABLE `direct_message_room` (
  `id` int(11) NOT NULL,
  `user1_id` varchar(255) DEFAULT NULL,
  `user2_id` varchar(255) DEFAULT NULL,
  `main_color` varchar(7) DEFAULT '#000000',
  `text_color` varchar(7) DEFAULT '#FFFFFF',
  `header_image_path` varchar(255) DEFAULT NULL,
  `is_friend` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- A tábla adatainak kiíratása `direct_message_room`
--

INSERT INTO `direct_message_room` (`id`, `user1_id`, `user2_id`, `main_color`, `text_color`, `header_image_path`, `is_friend`) VALUES
(1, 'user1', 'user1', '#000000', '#FFFFFF', '/path/to/header_image', 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `gender`
--

CREATE TABLE `gender` (
  `id` int(11) NOT NULL,
  `gender` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- A tábla adatainak kiíratása `gender`
--

INSERT INTO `gender` (`id`, `gender`) VALUES
(1, 'Male');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `languages`
--

CREATE TABLE `languages` (
  `id` int(11) NOT NULL,
  `language` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- A tábla adatainak kiíratása `languages`
--

INSERT INTO `languages` (`id`, `language`) VALUES
(1, 'English');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `nationality`
--

CREATE TABLE `nationality` (
  `id` int(11) NOT NULL,
  `nationality` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- A tábla adatainak kiíratása `nationality`
--

INSERT INTO `nationality` (`id`, `nationality`) VALUES
(1, 'American');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `occupation`
--

CREATE TABLE `occupation` (
  `id` int(11) NOT NULL,
  `occupation` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- A tábla adatainak kiíratása `occupation`
--

INSERT INTO `occupation` (`id`, `occupation`) VALUES
(1, 'Warrior');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `room`
--

CREATE TABLE `room` (
  `id` int(11) NOT NULL,
  `section_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `text_color` varchar(7) DEFAULT '#FFFFFF',
  `main_color` varchar(7) DEFAULT '#000000',
  `header_image_path` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- A tábla adatainak kiíratása `room`
--

INSERT INTO `room` (`id`, `section_id`, `name`, `text_color`, `main_color`, `header_image_path`, `description`) VALUES
(1, 1, 'Room1', '#FFFFFF', '#000000', '/path/to/header_image', 'Description');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `room_message`
--

CREATE TABLE `room_message` (
  `id` int(11) NOT NULL,
  `room_id` int(11) DEFAULT NULL,
  `character_id` int(11) DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- A tábla adatainak kiíratása `room_message`
--

INSERT INTO `room_message` (`id`, `room_id`, `character_id`, `message`, `date`) VALUES
(1, 1, 1, 'Message1', '2024-01-01 00:00:00');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `rp_category`
--

CREATE TABLE `rp_category` (
  `id` int(11) NOT NULL,
  `rp_category` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- A tábla adatainak kiíratása `rp_category`
--

INSERT INTO `rp_category` (`id`, `rp_category`) VALUES
(1, 'Fantasy');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `section`
--

CREATE TABLE `section` (
  `id` int(11) NOT NULL,
  `server_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `text_color` varchar(7) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- A tábla adatainak kiíratása `section`
--

INSERT INTO `section` (`id`, `server_id`, `name`, `text_color`) VALUES
(1, 1, 'Section1', '#FFFFFF');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `servers`
--

CREATE TABLE `servers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(255) DEFAULT NULL,
  `server_name` varchar(255) DEFAULT NULL,
  `server_picture_path` varchar(255) DEFAULT NULL,
  `main_color` varchar(7) DEFAULT '#000000',
  `text_color` varchar(7) DEFAULT '#FFFFFF',
  `server_font_style_id` int(11) DEFAULT 0,
  `invite_link` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- A tábla adatainak kiíratása `servers`
-
INSERT INTO `servers` (`id`, `uid`, `server_name`, `server_picture_path`, `main_color`, `text_color`, `server_font_style_id`, `invite_link`) VALUES
(0, 'naci', 'nacivagyoj', '1dc312c1216ddeeffc37478d1800287b.png', '#000000', '#FFFFFF', 1, 'morp.ru/naci'),
(1, 'server1', 'Server One', '/path/to/server_pic', '#000000', '#FFFFFF', 1, 'invite_link');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `server_bio`
--

CREATE TABLE `server_bio` (
  `id` int(11) NOT NULL,
  `about_us` varchar(255) DEFAULT NULL,
  `about_us_color` varchar(7) DEFAULT '#000000',
  `about_us_text_color` varchar(7) DEFAULT '#FFFFFF',
  `about_us_header_picture_path` varchar(255) DEFAULT NULL,
  `rp_category_id` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- A tábla adatainak kiíratása `server_bio`
--

INSERT INTO `server_bio` (`id`, `about_us`, `about_us_color`, `about_us_text_color`, `about_us_header_picture_path`, `rp_category_id`) VALUES
(1, 'About us', '#000000', '#FFFFFF', '/path/to/header_pic', 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `server_font_style`
--

CREATE TABLE `server_font_style` (
  `id` int(11) NOT NULL,
  `font_stlye` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- A tábla adatainak kiíratása `server_font_style`
--

INSERT INTO `server_font_style` (`id`, `font_stlye`) VALUES
(1, 'Arial');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `server_member`
--

CREATE TABLE `server_member` (
  `id` int(11) NOT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `server_id` int(11) DEFAULT NULL,
  `is_owner` tinyint(1) DEFAULT NULL,
  `is_moderator` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- A tábla adatainak kiíratása `server_member`
--

INSERT INTO `server_member` (`id`, `user_id`, `server_id`, `is_owner`, `is_moderator`) VALUES
(0, 'da7b35b5f18730449d5fd14f8dc59343', 0, 1, 1),
(1, 'user1', 1, 1, 0);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `server_stories`
--

CREATE TABLE `server_stories` (
  `stories_id` int(11) DEFAULT NULL,
  `server_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- A tábla adatainak kiíratása `server_stories`
--

INSERT INTO `server_stories` (`stories_id`, `server_id`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `stories`
--

CREATE TABLE `stories` (
  `id` int(11) NOT NULL,
  `story_name` varchar(255) DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- A tábla adatainak kiíratása `stories`
--

INSERT INTO `stories` (`id`, `story_name`, `start_date`, `end_date`) VALUES
(1, 'Story1', '2024-01-01 00:00:00', '2024-12-31 00:00:00');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `thread`
--

CREATE TABLE `thread` (
  `thread_id` int(11) NOT NULL,
  `thread_text` varchar(255) DEFAULT NULL,
  `thread_text_color` varchar(7) DEFAULT '#FFFFFF',
  `thread_color` varchar(7) DEFAULT '#000000',
  `thread_post_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- A tábla adatainak kiíratása `thread`
--

INSERT INTO `thread` (`thread_id`, `thread_text`, `thread_text_color`, `thread_color`, `thread_post_date`) VALUES
(1, 'Thread1', '#FFFFFF', '#000000', '2024-01-01 00:00:00');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `uid` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `gender_id` int(11) DEFAULT 0,
  `profile_pic_path` varchar(255) DEFAULT NULL,
  `language_id` varchar(255) DEFAULT '0',
  `thread_id` int(11) DEFAULT NULL,
  `status_id` int(11) DEFAULT 0,
  `about_me` varchar(255) DEFAULT NULL,
  `about_me_color` varchar(7) DEFAULT '#000000',
  `bio_main_color` varchar(7) DEFAULT '#000000',
  `bio_text_color` varchar(7) DEFAULT '#FFFFFF',
  `verified` tinyint(1) DEFAULT NULL,
  `is_admin` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`uid`, `email`, `password`, `name`, `nickname`, `gender_id`, `profile_pic_path`, `language_id`, `thread_id`, `status_id`, `about_me`, `about_me_color`, `bio_main_color`, `bio_text_color`, `verified`, `is_admin`) VALUES
('a853e4daa7c1975e9eeb73a66e919921', 'admin.admin@gmail.com', '$2y$10$x.5.wqKQV4WCc45jiN5fH.nVn2g3.fK0Yvek5HRz97CHmGbJQbeFS', 'pw:Matevok123$$', NULL, 0, NULL, '0', NULL, 0, NULL, '#000000', '#000000', '#FFFFFF', 1, NULL),
('da7b35b5f18730449d5fd14f8dc59343', 'mate.dbvari@gmail.com', '$2y$10$.otVnLjc6xEzM/EeF5oZJOHQL9mLC99/GMzEUK.r/EEu0hZvyHSui', 'matevok', 'asd2', 0, NULL, '0', NULL, 0, 'asd2', '#000000', '#000000', '#FFFFFF', 1, NULL),
('user1', 'user1@example.com', 'password', 'User One', 'U1', 1, '/path/to/profile_pic', 'en', 1, 1, 'About me', '#000000', '#000000', '#FFFFFF', 1, 0);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user_character`
--

CREATE TABLE `user_character` (
  `id` int(11) NOT NULL,
  `servermember_id` int(11) DEFAULT NULL,
  `is_verified` tinyint(1) DEFAULT 0,
  `is_own_character` tinyint(1) DEFAULT 0,
  `character_name` varchar(250) DEFAULT NULL,
  `nickname` varchar(250) DEFAULT NULL,
  `gender_id` int(11) DEFAULT 0,
  `character_pic_path` varchar(255) DEFAULT NULL,
  `birthdate` datetime DEFAULT NULL,
  `died` tinyint(1) DEFAULT NULL,
  `deathdate` datetime DEFAULT NULL,
  `resurrected` tinyint(1) DEFAULT NULL,
  `resurrected_date` datetime DEFAULT NULL,
  `species_id` int(11) DEFAULT 0,
  `occupation_id` int(11) DEFAULT 0,
  `affilation_id` int(11) DEFAULT 0,
  `nationality_id` int(11) DEFAULT 0,
  `status_id` int(11) DEFAULT 0,
  `story_id` int(11) DEFAULT 0,
  `bio` varchar(300) DEFAULT NULL,
  `powers` varchar(300) DEFAULT NULL,
  `weaknesses` varchar(300) DEFAULT NULL,
  `used_item` varchar(300) DEFAULT NULL,
  `family` varchar(300) DEFAULT NULL,
  `universe` varchar(300) DEFAULT NULL,
  `fc_type_id` int(11) DEFAULT 0,
  `fc_name` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- A tábla adatainak kiíratása `user_character`
--

INSERT INTO `user_character` (`id`, `servermember_id`, `is_verified`, `is_own_character`, `character_name`, `nickname`, `gender_id`, `character_pic_path`, `birthdate`, `died`, `deathdate`, `resurrected`, `resurrected_date`, `species_id`, `occupation_id`, `affilation_id`, `nationality_id`, `status_id`, `story_id`, `bio`, `powers`, `weaknesses`, `used_item`, `family`, `universe`, `fc_type_id`, `fc_name`) VALUES
(0, 0, 0, 0, 'asdsad', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, 1, 1, 1, 1, 1, 0, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL),
(1, 1, 1, 1, 'Character1', 'Char1', 1, '/path/to/character_pic', '2000-01-01 00:00:00', 0, NULL, 0, NULL, 1, 1, 1, 1, 1, 1, 'Bio', 'Powers', 'Weaknesses', 'Used item', 'Family', 'Universe', 1, 'FC Name');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user_character_need`
--

CREATE TABLE `user_character_need` (
  `server_id` int(11) DEFAULT NULL,
  `birthdate_need` tinyint(1) DEFAULT NULL,
  `deathdate_need` tinyint(1) DEFAULT NULL,
  `resurrected_date_need` tinyint(1) DEFAULT NULL,
  `species_need` tinyint(1) DEFAULT NULL,
  `occuptaion_need` tinyint(1) DEFAULT NULL,
  `affilation_need` tinyint(1) DEFAULT NULL,
  `nationality_need` tinyint(1) DEFAULT NULL,
  `powers_need` tinyint(1) DEFAULT NULL,
  `weaknesses_need` tinyint(1) DEFAULT NULL,
  `used_item_need` tinyint(1) DEFAULT NULL,
  `family_need` tinyint(1) DEFAULT NULL,
  `universe_need` tinyint(1) DEFAULT NULL,
  `fc_need` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- A tábla adatainak kiíratása `user_character_need`
--

INSERT INTO `user_character_need` (`server_id`, `birthdate_need`, `deathdate_need`, `resurrected_date_need`, `species_need`, `occuptaion_need`, `affilation_need`, `nationality_need`, `powers_need`, `weaknesses_need`, `used_item_need`, `family_need`, `universe_need`, `fc_need`) VALUES
(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user_status`
--

CREATE TABLE `user_status` (
  `id` int(11) NOT NULL,
  `status_type` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- A tábla adatainak kiíratása `user_status`
--

INSERT INTO `user_status` (`id`, `status_type`) VALUES
(1, 'Active');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `affilation`
--
ALTER TABLE `affilation`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `alias_character`
--
ALTER TABLE `alias_character`
  ADD PRIMARY KEY (`id`),
  ADD KEY `character_id` (`character_id`);

--
-- A tábla indexei `character_fc`
--
ALTER TABLE `character_fc`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `character_species`
--
ALTER TABLE `character_species`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `character_status`
--
ALTER TABLE `character_status`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `character_story`
--
ALTER TABLE `character_story`
  ADD KEY `stories_id` (`stories_id`),
  ADD KEY `character_id` (`character_id`);

--
-- A tábla indexei `direct_message`
--
ALTER TABLE `direct_message`
  ADD PRIMARY KEY (`id`),
  ADD KEY `room_id` (`room_id`);

--
-- A tábla indexei `direct_message_room`
--
ALTER TABLE `direct_message_room`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user1_id` (`user1_id`),
  ADD KEY `user2_id` (`user2_id`);

--
-- A tábla indexei `gender`
--
ALTER TABLE `gender`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `languages`
--
ALTER TABLE `languages`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `nationality`
--
ALTER TABLE `nationality`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `occupation`
--
ALTER TABLE `occupation`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`id`),
  ADD KEY `section_id` (`section_id`);

--
-- A tábla indexei `room_message`
--
ALTER TABLE `room_message`
  ADD PRIMARY KEY (`id`),
  ADD KEY `room_id` (`room_id`),
  ADD KEY `character_id` (`character_id`);

--
-- A tábla indexei `rp_category`
--
ALTER TABLE `rp_category`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `section`
--
ALTER TABLE `section`
  ADD PRIMARY KEY (`id`),
  ADD KEY `server_id` (`server_id`);

--
-- A tábla indexei `servers`
--
ALTER TABLE `servers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `server_font_style_id` (`server_font_style_id`);

--
-- A tábla indexei `server_bio`
--
ALTER TABLE `server_bio`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rp_category_id` (`rp_category_id`);

--
-- A tábla indexei `server_font_style`
--
ALTER TABLE `server_font_style`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `server_member`
--
ALTER TABLE `server_member`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `server_id` (`server_id`);

--
-- A tábla indexei `server_stories`
--
ALTER TABLE `server_stories`
  ADD KEY `stories_id` (`stories_id`),
  ADD KEY `server_id` (`server_id`);

--
-- A tábla indexei `stories`
--
ALTER TABLE `stories`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `thread`
--
ALTER TABLE `thread`
  ADD PRIMARY KEY (`thread_id`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`uid`),
  ADD KEY `thread_id` (`thread_id`);

--
-- A tábla indexei `user_character`
--
ALTER TABLE `user_character`
  ADD PRIMARY KEY (`id`),
  ADD KEY `servermember_id` (`servermember_id`),
  ADD KEY `status_id` (`status_id`),
  ADD KEY `species_id` (`species_id`),
  ADD KEY `gender_id` (`gender_id`),
  ADD KEY `affilation_id` (`affilation_id`),
  ADD KEY `occupation_id` (`occupation_id`),
  ADD KEY `nationality_id` (`nationality_id`),
  ADD KEY `user_character_ibfk_3` (`fc_type_id`);

--
-- A tábla indexei `user_character_need`
--
ALTER TABLE `user_character_need`
  ADD KEY `server_id` (`server_id`);

--
-- A tábla indexei `user_status`
--
ALTER TABLE `user_status`
  ADD PRIMARY KEY (`id`);

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `alias_character`
--
ALTER TABLE `alias_character`
  ADD CONSTRAINT `alias_character_ibfk_1` FOREIGN KEY (`character_id`) REFERENCES `user_character` (`id`);

--
-- Megkötések a táblához `character_story`
--
ALTER TABLE `character_story`
  ADD CONSTRAINT `character_story_ibfk_1` FOREIGN KEY (`stories_id`) REFERENCES `stories` (`id`),
  ADD CONSTRAINT `character_story_ibfk_2` FOREIGN KEY (`character_id`) REFERENCES `user_character` (`id`);

--
-- Megkötések a táblához `direct_message`
--
ALTER TABLE `direct_message`
  ADD CONSTRAINT `direct_message_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `direct_message_room` (`id`);

--
-- Megkötések a táblához `direct_message_room`
--
ALTER TABLE `direct_message_room`
  ADD CONSTRAINT `direct_message_room_ibfk_1` FOREIGN KEY (`user1_id`) REFERENCES `users` (`uid`),
  ADD CONSTRAINT `direct_message_room_ibfk_2` FOREIGN KEY (`user2_id`) REFERENCES `users` (`uid`);

--
-- Megkötések a táblához `room`
--
ALTER TABLE `room`
  ADD CONSTRAINT `room_ibfk_1` FOREIGN KEY (`section_id`) REFERENCES `section` (`id`);

--
-- Megkötések a táblához `room_message`
--
ALTER TABLE `room_message`
  ADD CONSTRAINT `room_message_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`),
  ADD CONSTRAINT `room_message_ibfk_2` FOREIGN KEY (`character_id`) REFERENCES `user_character` (`id`);

--
-- Megkötések a táblához `section`
--
ALTER TABLE `section`
  ADD CONSTRAINT `section_ibfk_1` FOREIGN KEY (`server_id`) REFERENCES `servers` (`id`);

--
-- Megkötések a táblához `servers`
--
ALTER TABLE `servers`
  ADD CONSTRAINT `servers_ibfk_1` FOREIGN KEY (`server_font_style_id`) REFERENCES `server_font_style` (`id`);

--
-- Megkötések a táblához `server_bio`
--
ALTER TABLE `server_bio`
  ADD CONSTRAINT `server_bio_ibfk_1` FOREIGN KEY (`rp_category_id`) REFERENCES `rp_category` (`id`),
  ADD CONSTRAINT `server_bio_ibfk_2` FOREIGN KEY (`id`) REFERENCES `servers` (`id`);

--
-- Megkötések a táblához `server_member`
--
ALTER TABLE `server_member`
  ADD CONSTRAINT `server_member_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`uid`),
  ADD CONSTRAINT `server_member_ibfk_2` FOREIGN KEY (`server_id`) REFERENCES `servers` (`id`);

--
-- Megkötések a táblához `server_stories`
--
ALTER TABLE `server_stories`
  ADD CONSTRAINT `server_stories_ibfk_1` FOREIGN KEY (`stories_id`) REFERENCES `stories` (`id`),
  ADD CONSTRAINT `server_stories_ibfk_2` FOREIGN KEY (`server_id`) REFERENCES `servers` (`id`);

--
-- Megkötések a táblához `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`thread_id`) REFERENCES `thread` (`thread_id`);

--
-- Megkötések a táblához `user_character`
--
ALTER TABLE `user_character`
  ADD CONSTRAINT `user_character_ibfk_1` FOREIGN KEY (`servermember_id`) REFERENCES `server_member` (`id`),
  ADD CONSTRAINT `user_character_ibfk_2` FOREIGN KEY (`status_id`) REFERENCES `character_status` (`id`),
  ADD CONSTRAINT `user_character_ibfk_3` FOREIGN KEY (`fc_type_id`) REFERENCES `character_fc` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `user_character_ibfk_4` FOREIGN KEY (`species_id`) REFERENCES `character_species` (`id`),
  ADD CONSTRAINT `user_character_ibfk_5` FOREIGN KEY (`gender_id`) REFERENCES `gender` (`id`),
  ADD CONSTRAINT `user_character_ibfk_6` FOREIGN KEY (`affilation_id`) REFERENCES `affilation` (`id`),
  ADD CONSTRAINT `user_character_ibfk_7` FOREIGN KEY (`occupation_id`) REFERENCES `occupation` (`id`),
  ADD CONSTRAINT `user_character_ibfk_8` FOREIGN KEY (`nationality_id`) REFERENCES `nationality` (`id`);

--
-- Megkötések a táblához `user_character_need`
--
ALTER TABLE `user_character_need`
  ADD CONSTRAINT `user_character_need_ibfk_1` FOREIGN KEY (`server_id`) REFERENCES `servers` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
