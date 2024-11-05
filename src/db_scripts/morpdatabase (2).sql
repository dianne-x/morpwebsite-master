-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Nov 04. 08:09
-- Kiszolgáló verziója: 10.4.28-MariaDB
-- PHP verzió: 8.2.4

DROP DATABASE IF EXISTS MORPDatabase;

CREATE DATABASE MORPDatabase
CHARACTER SET utf8
COLLATE utf8_general_ci;

USE MORPDatabase;


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

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `gender`
--

CREATE TABLE `gender` (
  `id` int(11) NOT NULL,
  `gender` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- A tábla adatainak kiíratása `gender`
--

INSERT INTO `gender` (`id`, `gender`) VALUES
(1, 'Would rather not say'),
(2, 'Male'),
(3, 'Female');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `languages`
--

CREATE TABLE `languages` (
  `id` int(11) NOT NULL,
  `usedlanguage` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- A tábla adatainak kiíratása `languages`
--

INSERT INTO `languages` (`id`, `usedlanguage`) VALUES
(1, 'English'),
(2, 'Hungarian');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `room`
--

CREATE TABLE `room` (
  `id` int(11) NOT NULL,
  `section_id` int(11) DEFAULT NULL,
  `room_name` varchar(255) DEFAULT NULL,
  `text_color` varchar(255) DEFAULT '#FFFFFF',
  `main_color` varchar(255) DEFAULT '#000000',
  `header_image_path` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `section`
--

CREATE TABLE `section` (
  `id` int(11) NOT NULL,
  `server_id` int(11) DEFAULT NULL,
  `section_name` varchar(255) DEFAULT NULL,
  `text_color` varchar(255) DEFAULT '#FFFFFF'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `servers`
--

CREATE TABLE `servers` (
  `id` int(11) NOT NULL,
  `uid` varchar(100) NOT NULL,
  `server_name` varchar(100) NOT NULL,
  `server_picture_path` varchar(255) NOT NULL,
  `main_color` varchar(255) NOT NULL DEFAULT '#000000',
  `text_color` varchar(255) NOT NULL DEFAULT '#FFFFFF',
  `server_font_style_id` int(11) NOT NULL DEFAULT 1,
  `stories_id` int(11) NOT NULL DEFAULT 1,
  `invite_link` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- A tábla adatainak kiíratása `servers`
--

INSERT INTO `servers` (`id`, `uid`, `server_name`, `server_picture_path`, `main_color`, `text_color`, `server_font_style_id`, `stories_id`, `invite_link`) VALUES
(3, 'femnboy', 'sleepy', '538b966772e40430a84b6ef0a19a279d.png', '#000000', '#FFFFFF', 1, 1, 'morp.ru/femnboy');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `server_member`
--

CREATE TABLE `server_member` (
  `id` int(11) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `server_id` int(11) NOT NULL,
  `is_owner` tinyint(1) DEFAULT 0,
  `is_moderator` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- A tábla adatainak kiíratása `server_member`
--

INSERT INTO `server_member` (`id`, `user_id`, `server_id`, `is_owner`, `is_moderator`) VALUES
(1, '2fe88b43124bf5bb3ec1401eef8ac986', 3, 1, 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `server_stories`
--

CREATE TABLE `server_stories` (
  `stories_id` int(11) DEFAULT NULL,
  `server_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `stories`
--

CREATE TABLE `stories` (
  `id` int(11) NOT NULL,
  `story_name` varchar(255) NOT NULL,
  `storystart_date` date NOT NULL,
  `storyend_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- A tábla adatainak kiíratása `stories`
--

INSERT INTO `stories` (`id`, `story_name`, `storystart_date`, `storyend_date`) VALUES
(1, 'diddy did it', '2024-10-16', '2024-10-31');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `uid` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nickname` varchar(100) NOT NULL,
  `gender_id` int(11) NOT NULL DEFAULT 1,
  `profile_pic_path` varchar(255) NOT NULL DEFAULT 'user.png',
  `language_id` int(11) NOT NULL DEFAULT 1,
  `thread_text` varchar(255) NOT NULL,
  `thread_text_color` varchar(255) NOT NULL DEFAULT '#000000',
  `thread_color` varchar(255) NOT NULL DEFAULT '#FFFFFF',
  `status_id` int(11) NOT NULL DEFAULT 1,
  `about_me` varchar(255) NOT NULL,
  `about_me_color` varchar(255) NOT NULL,
  `bio_main_color` varchar(255) NOT NULL DEFAULT '#000000',
  `bio_text_color` varchar(255) NOT NULL DEFAULT '#FFFFFF',
  `is_admin` tinyint(1) DEFAULT 0,
  `verified` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`id`, `uid`, `name`, `email`, `password`, `nickname`, `gender_id`, `profile_pic_path`, `language_id`, `thread_text`, `thread_text_color`, `thread_color`, `status_id`, `about_me`, `about_me_color`, `bio_main_color`, `bio_text_color`, `is_admin`, `verified`) VALUES
(1, '2fe88b43124bf5bb3ec1401eef8ac986', 'mate', 'mate.dbvari@gmail.com', '$2y$10$wXaddLKSiNE7Nf45O0T4c.9LGRyown80wwyYeWN.Ce9pj0BQ8yTvC', '', 1, '00f0dee5ea484ce7a5fecf7b64d10170.png', 1, '', '#000000', '#FFFFFF', 1, '', '', '#000000', '#FFFFFF', 1, 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user_status`
--

CREATE TABLE `user_status` (
  `id` int(11) NOT NULL,
  `user_status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- A tábla adatainak kiíratása `user_status`
--

INSERT INTO `user_status` (`id`, `user_status`) VALUES
(1, 'Online'),
(2, 'Away'),
(3, 'Do not disturb');

--
-- Indexek a kiírt táblákhoz
--

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
-- A tábla indexei `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_section` (`section_id`);

--
-- A tábla indexei `section`
--
ALTER TABLE `section`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_serv` (`server_id`);

--
-- A tábla indexei `servers`
--
ALTER TABLE `servers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uid` (`uid`),
  ADD KEY `fk_stories` (`stories_id`);

--
-- A tábla indexei `server_member`
--
ALTER TABLE `server_member`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user` (`user_id`),
  ADD KEY `fk_server` (`server_id`);

--
-- A tábla indexei `server_stories`
--
ALTER TABLE `server_stories`
  ADD KEY `fk_server_story_server` (`server_id`),
  ADD KEY `fk_server_story_story` (`stories_id`);

--
-- A tábla indexei `stories`
--
ALTER TABLE `stories`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uid` (`uid`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `fk_gender` (`gender_id`),
  ADD KEY `fk_language` (`language_id`),
  ADD KEY `fk_status` (`status_id`);

--
-- A tábla indexei `user_status`
--
ALTER TABLE `user_status`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `gender`
--
ALTER TABLE `gender`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `languages`
--
ALTER TABLE `languages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `room`
--
ALTER TABLE `room`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `section`
--
ALTER TABLE `section`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `servers`
--
ALTER TABLE `servers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `server_member`
--
ALTER TABLE `server_member`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `stories`
--
ALTER TABLE `stories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `user_status`
--
ALTER TABLE `user_status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `room`
--
ALTER TABLE `room`
  ADD CONSTRAINT `fk_section` FOREIGN KEY (`section_id`) REFERENCES `section` (`id`);

--
-- Megkötések a táblához `section`
--
ALTER TABLE `section`
  ADD CONSTRAINT `fk_serv` FOREIGN KEY (`server_id`) REFERENCES `servers` (`id`);

--
-- Megkötések a táblához `servers`
--
ALTER TABLE `servers`
  ADD CONSTRAINT `fk_stories` FOREIGN KEY (`stories_id`) REFERENCES `stories` (`id`);

--
-- Megkötések a táblához `server_member`
--
ALTER TABLE `server_member`
  ADD CONSTRAINT `fk_server` FOREIGN KEY (`server_id`) REFERENCES `servers` (`id`),
  ADD CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`uid`);

--
-- Megkötések a táblához `server_stories`
--
ALTER TABLE `server_stories`
  ADD CONSTRAINT `fk_server_story_server` FOREIGN KEY (`server_id`) REFERENCES `servers` (`id`),
  ADD CONSTRAINT `fk_server_story_story` FOREIGN KEY (`stories_id`) REFERENCES `stories` (`id`);

--
-- Megkötések a táblához `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_gender` FOREIGN KEY (`gender_id`) REFERENCES `gender` (`id`),
  ADD CONSTRAINT `fk_language` FOREIGN KEY (`language_id`) REFERENCES `languages` (`id`),
  ADD CONSTRAINT `fk_status` FOREIGN KEY (`status_id`) REFERENCES `user_status` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
