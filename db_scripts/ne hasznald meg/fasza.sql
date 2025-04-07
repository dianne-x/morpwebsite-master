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
-- Tábla szerkezet ehhez a táblához `affiliation`
--

CREATE TABLE `affiliation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `affiliation` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- A tábla adatainak kiíratása `affiliation`
--


INSERT INTO `affiliation` (`id`, `affiliation`) VALUES
(1, 'League of Villains'),
(2, 'U.A. High School'),
(3, 'Paranormal Liberation Front'),
(4, 'Endeavor Agency'),
(5, 'Shiketsu High School'),
(6, 'Wild, Wild Pussycats'),
(7, 'Meta Liberation Army'),
(8, 'Justice League'), 
(9, 'Teen Titans'), 
(10, 'Suicide Squad'), 
(11, 'Justice Society of America'), 
(12, 'The Bat Family'), 
(13, 'The Rogues'),
(14, 'Secret Society of Super Villains'), 
(15, 'Legion of Doom'), 
(16, 'Injustice League'), 
(17, 'The Avengers'), 
(18, 'S.H.I.E.L.D.'), 
(19, 'Hydra'), 
(20, 'The Fantastic Four'),
(21, 'The Sinister Six'),
(22, 'Brotherhood of Mutants'),
(23, 'The Defenders'),
(24, 'The Illuminati'),
(25, 'The Hellfire Club'),
(26, 'The Thunderbolts'),
(27, 'The Dora Milaje'),
(28, 'The Hand');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `alias_character`
--

CREATE TABLE `alias_character` (
  `id` int NOT NULL AUTO_INCREMENT,
  `character_id` int(11) DEFAULT NULL,
  `name` varchar(250) DEFAULT NULL,
  `character_pic_path` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- A tábla adatainak kiíratása `alias_character`
--



-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `character_fc`
--

CREATE TABLE `character_fc` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fc_type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- A tábla adatainak kiíratása `character_fc`
--

INSERT INTO `character_fc` (`id`, `fc_type`) VALUES
(1, 'Fan Cast/ Face Claim'),
(2, 'Voice Claim'),
(3, 'Canon Cast');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `character_species`
--

CREATE TABLE `character_species` (
  `id` int NOT NULL AUTO_INCREMENT,
  `species` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- A tábla adatainak kiíratása `character_species`
--

INSERT INTO `character_species` (`id`, `species`) VALUES
(1, 'Alien'),  
(2, 'Amazonian'),  
(3, 'Android'),  
(4, 'Angel'),  
(5, 'Asgardian'),  
(6, 'Atlantean'),  
(7, 'Cyborg'),  
(8, 'Demon'),  
(9, 'Deviant'),  
(10, 'Dragon'),  
(11, 'Dwarf'),  
(12, 'Elf'),  
(13, 'Ent'),  
(14, 'Eternal'),  
(15, 'Goblin'),  
(16, 'God'),  
(17, 'Human'),  
(18, 'Inhuman'),  
(19, 'Kryptonian'),  
(20, 'Meta-Human'),  
(21, 'Mutant'),  
(22, 'Orc'),  
(23, 'Shapeshifter'),  
(24, 'Symbiote'),  
(25, 'Troll'),  
(26, 'Vampire'),  
(27, 'Werewolf');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `character_status`
--

CREATE TABLE `character_status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- A tábla adatainak kiíratása `character_status`
--

INSERT INTO `character_status` (`id`, `status`) VALUES
(1, 'Alive'),
(2, 'Alive (Resurrected)'),
(3, 'Active'),
(4, 'Deceased'),
(5, 'In Custody'),
(6, 'Unknown');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `character_story`
--

CREATE TABLE `character_story` (
  `stories_id` int(11) DEFAULT NULL,
  `character_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`stories_id`, `character_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- A tábla adatainak kiíratása `character_story`
--


-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `direct_message`
--

CREATE TABLE `direct_message` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `room_id` int(11) DEFAULT NULL,
  `sent_from` VARCHAR(255) DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `sent` datetime DEFAULT NULL,
  `seen` tinyint(1) DEFAULT NULL,
  `seen_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- A tábla adatainak kiíratása `direct_message`
--



-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `direct_message_room`
--

CREATE TABLE `direct_message_room` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user1_id` varchar(255) DEFAULT NULL,
  `user2_id` varchar(255) DEFAULT NULL,
  `main_color` varchar(7) DEFAULT '#000000',
  `text_color` varchar(7) DEFAULT '#FFFFFF',
  `header_image_path` varchar(255) DEFAULT NULL,
  `is_friend` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- A tábla adatainak kiíratása `direct_message_room`
--



-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `gender`
--

CREATE TABLE `gender` (
  `id` int NOT NULL AUTO_INCREMENT,
  `gender` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- A tábla adatainak kiíratása `gender`
--

INSERT INTO `gender` (`id`, `gender`) VALUES
(1, 'Male'),
(2, 'Female'),
(3, 'Other');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `languages`
--

CREATE TABLE `languages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `language` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- A tábla adatainak kiíratása `languages`
--

INSERT INTO `languages` (`id`, `language`) VALUES
(1, 'English'),
(2, 'Hungarian');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `nationality`
--

CREATE TABLE `nationality` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nationality` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- A tábla adatainak kiíratása `nationality`
--

INSERT INTO `nationality` (`id`, `nationality`) VALUES
(1, 'Afghanistan'),
(2, 'Åland Islands'),
(3, 'Albania'),
(4, 'Algeria'),
(5, 'American Samoa'),
(6, 'Andorra'),
(7, 'Angola'),
(8, 'Anguilla'),
(9, 'Antarctica'),
(10, 'Antigua & Barbuda'),
(11, 'Argentina'),
(12, 'Armenia'),
(13, 'Aruba'),
(14, 'Australia'),
(15, 'Austria'),
(16, 'Azerbaijan'),
(17, 'Bahamas'),
(18, 'Bahrain'),
(19, 'Bangladesh'),
(20, 'Barbados'),
(21, 'Belarus'),
(22, 'Belgium'),
(23, 'Belize'),
(24, 'Benin'),
(25, 'Bermuda'),
(26, 'Bhutan'),
(27, 'Bolivia'),
(28, 'Bosnia & Herzegovina'),
(29, 'Botswana'),
(30, 'Bouvet Island'),
(31, 'Brazil'),
(32, 'British Indian Ocean Territory'),
(33, 'British Virgin Islands'),
(34, 'Brunei'),
(35, 'Bulgaria'),
(36, 'Burkina Faso'),
(37, 'Burundi'),
(38, 'Cambodia'),
(39, 'Cameroon'),
(40, 'Canada'),
(41, 'Cape Verde'),
(42, 'Caribbean Netherlands'),
(43, 'Cayman Islands'),
(44, 'Central African Republic'),
(45, 'Chad'),
(46, 'Chile'),
(47, 'China'),
(48, 'Christmas Island'),
(49, 'Cocos (Keeling) Islands'),
(50, 'Colombia'),
(51, 'Comoros'),
(52, 'Congo - Brazzaville'),
(53, 'Congo - Kinshasa'),
(54, 'Cook Islands'),
(55, 'Costa Rica'),
(56, 'Côte d’Ivoire'),
(57, 'Croatia'),
(58, 'Cuba'),
(59, 'Curaçao'),
(60, 'Cyprus'),
(61, 'Czechia'),
(62, 'Denmark'),
(63, 'Djibouti'),
(64, 'Dominica'),
(65, 'Dominican Republic'),
(66, 'Ecuador'),
(67, 'Egypt'),
(68, 'El Salvador'),
(69, 'Equatorial Guinea'),
(70, 'Eritrea'),
(71, 'Estonia'),
(72, 'Eswatini'),
(73, 'Ethiopia'),
(74, 'Falkland Islands'),
(75, 'Faroe Islands'),
(76, 'Fiji'),
(77, 'Finland'),
(78, 'France'),
(79, 'French Guiana'),
(80, 'French Polynesia'),
(81, 'French Southern Territories'),
(82, 'Gabon'),
(83, 'Gambia'),
(84, 'Georgia'),
(85, 'Germany'),
(86, 'Ghana'),
(87, 'Gibraltar'),
(88, 'Greece'),
(89, 'Greenland'),
(90, 'Grenada'),
(91, 'Guadeloupe'),
(92, 'Guam'),
(93, 'Guatemala'),
(94, 'Guernsey'),
(95, 'Guinea'),
(96, 'Guinea-Bissau'),
(97, 'Guyana'),
(98, 'Haiti'),
(99, 'Heard & McDonald Islands'),
(100, 'Honduras'),
(101, 'Hong Kong SAR China'),
(102, 'Hungary'),
(103, 'Iceland'),
(104, 'India'),
(105, 'Indonesia'),
(106, 'Iran'),
(107, 'Iraq'),
(108, 'Ireland'),
(109, 'Isle of Man'),
(110, 'Israel'),
(111, 'Italy'),
(112, 'Jamaica'),
(113, 'Japan'),
(114, 'Jersey'),
(115, 'Jordan'),
(116, 'Kazakhstan'),
(117, 'Kenya'),
(118, 'Kiribati'),
(119, 'Kuwait'),
(120, 'Kyrgyzstan'),
(121, 'Laos'),
(122, 'Latvia'),
(123, 'Lebanon'),
(124, 'Lesotho'),
(125, 'Liberia'),
(126, 'Libya'),
(127, 'Liechtenstein'),
(128, 'Lithuania'),
(129, 'Luxembourg'),
(130, 'Macao SAR China'),
(131, 'Madagascar'),
(132, 'Malawi'),
(133, 'Malaysia'),
(134, 'Maldives'),
(135, 'Mali'),
(136, 'Malta'),
(137, 'Marshall Islands'),
(138, 'Martinique'),
(139, 'Mauritania'),
(140, 'Mauritius'),
(141, 'Mayotte'),
(142, 'Mexico'),
(143, 'Micronesia'),
(144, 'Moldova'),
(145, 'Monaco'),
(146, 'Mongolia'),
(147, 'Montenegro'),
(148, 'Montserrat'),
(149, 'Morocco'),
(150, 'Mozambique'),
(151, 'Myanmar (Burma)'),
(152, 'Namibia'),
(153, 'Nauru'),
(154, 'Nepal'),
(155, 'Netherlands'),
(156, 'New Caledonia'),
(157, 'New Zealand'),
(158, 'Nicaragua'),
(159, 'Niger'),
(160, 'Nigeria'),
(161, 'Niue'),
(162, 'Norfolk Island'),
(163, 'North Korea'),
(164, 'North Macedonia'),
(165, 'Northern Mariana Islands'),
(166, 'Norway'),
(167, 'Oman'),
(168, 'Pakistan'),
(169, 'Palau'),
(170, 'Palestinian Territories'),
(171, 'Panama'),
(172, 'Papua New Guinea'),
(173, 'Paraguay'),
(174, 'Peru'),
(175, 'Philippines'),
(176, 'Pitcairn Islands'),
(177, 'Poland'),
(178, 'Portugal'),
(179, 'Puerto Rico'),
(180, 'Qatar'),
(181, 'Réunion'),
(182, 'Romania'),
(183, 'Russia'),
(184, 'Rwanda'),
(185, 'Samoa'),
(186, 'San Marino'),
(187, 'São Tomé & Príncipe'),
(188, 'Saudi Arabia'),
(189, 'Senegal'),
(190, 'Serbia'),
(191, 'Seychelles'),
(192, 'Sierra Leone'),
(193, 'Singapore'),
(194, 'Sint Maarten'),
(195, 'Slovakia'),
(196, 'Slovenia'),
(197, 'Solomon Islands'),
(198, 'Somalia'),
(199, 'South Africa'),
(200, 'South Georgia & South Sandwich Islands'),
(201, 'South Korea'),
(202, 'South Sudan'),
(203, 'Spain'),
(204, 'Sri Lanka'),
(205, 'St. Barthélemy'),
(206, 'St. Helena'),
(207, 'St. Kitts & Nevis'),
(208, 'St. Lucia'),
(209, 'St. Martin'),
(210, 'St. Pierre & Miquelon'),
(211, 'St. Vincent & Grenadines'),
(212, 'Sudan'),
(213, 'Suriname'),
(214, 'Svalbard & Jan Mayen'),
(215, 'Sweden'),
(216, 'Switzerland'),
(217, 'Syria'),
(218, 'Taiwan'),
(219, 'Tajikistan'),
(220, 'Tanzania'),
(221, 'Thailand'),
(222, 'Timor-Leste'),
(223, 'Togo'),
(224, 'Tokelau'),
(225, 'Tonga'),
(226, 'Trinidad & Tobago'),
(227, 'Tunisia'),
(228, 'Türkiye'),
(229, 'Turkmenistan'),
(230, 'Turks & Caicos Islands'),
(231, 'Tuvalu'),
(232, 'U.S. Outlying Islands'),
(233, 'U.S. Virgin Islands'),
(234, 'Uganda'),
(235, 'Ukraine'),
(236, 'United Arab Emirates'),
(237, 'United Kingdom'),
(238, 'United States'),
(239, 'Uruguay'),
(240, 'Uzbekistan'),
(241, 'Vanuatu'),
(242, 'Vatican City'),
(243, 'Venezuela'),
(244, 'Vietnam'),
(245, 'Wallis & Futuna'),
(246, 'Western Sahara'),
(247, 'Yemen'),
(248, 'Zambia'),
(249, 'Zimbabwe');


-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `occupation`
--

CREATE TABLE `occupation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupation` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- A tábla adatainak kiíratása `occupation`
--

INSERT INTO `occupation` (`id`, `occupation`) VALUES
(1, 'Adventurer'),  
(2, 'Alchemist'),  
(3, 'Assassin'),  
(4, 'Bounty Hunter'),  
(5, 'Chef'),  
(6, 'Doctor'),  
(7, 'Engineer'),  
(8, 'Firefighter'),  
(9, 'Guardian'),  
(10, 'Healer'),  
(11, 'Journalist'),  
(12, 'Knight'),  
(13, 'Lawyer'),  
(14, 'Mage'),  
(15, 'Mechanic'),  
(16, 'Mercenary'),  
(17, 'Monk'),  
(18, 'Musician'),  
(19, 'Necromancer'),  
(20, 'Nurse'),  
(21, 'Paladin'),  
(22, 'Pirate'),  
(23, 'Pilot'),  
(24, 'Police Officer'),  
(25, 'Ranger'),  
(26, 'Rebel'),  
(27, 'Rogue'),  
(28, 'Scientist'),  
(29, 'Sorcerer'),  
(30, 'Soldier'),  
(31, 'Squire'),  
(32, 'Teacher'),  
(33, 'Thief'),  
(34, 'Warrior'),  
(35, 'Wizard'),  
(36, 'Writer');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `room`
--

CREATE TABLE `room` (
  `id` int NOT NULL AUTO_INCREMENT,
  `section_id` int(11) DEFAULT NULL,
  `room_name` varchar(255) DEFAULT NULL,
  `text_color` varchar(7) DEFAULT '#FFFFFF',
  `main_color` varchar(7) DEFAULT '#000000',
  `header_image_path` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- A tábla adatainak kiíratása `room`
--



-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `room_message`
--

CREATE TABLE `room_message` (
  `id` int NOT NULL AUTO_INCREMENT,
  `room_id` int(11) DEFAULT NULL,
  `character_id` int(11) DEFAULT NULL,
  `message` text(500) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- A tábla adatainak kiíratása `room_message`
--



-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `rp_category`
--

CREATE TABLE `rp_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rp_category` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- A tábla adatainak kiíratása `rp_category`
--

INSERT INTO `rp_category` (`id`, `rp_category`) VALUES
(1, 'Action'),  
(2, 'Adventure'),  
(3, 'Comedy'),  
(4, 'Crime'),  
(5, 'Drama'),  
(6, 'Fantasy'),  
(7, 'Historical'),  
(8, 'Horror'),  
(9, 'Mystery'),  
(10, 'Romance'),  
(11, 'Science Fiction'),  
(12, 'Thriller'),  
(13, 'Western'),  
(14, 'Superhero'),  
(15, 'Noir'),  
(16, 'Anime');




-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `section`
--

CREATE TABLE `section` (
  `id` int NOT NULL AUTO_INCREMENT,
  `server_id` int(11) DEFAULT NULL,
  `section_name` varchar(255) DEFAULT NULL,
  `text_color` varchar(7) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- A tábla adatainak kiíratása `section`
--


-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `servers`
--

-- Tábla szerkezet ehhez a táblához `servers`
CREATE TABLE `servers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uid` varchar(255) DEFAULT NULL,
  `server_name` varchar(255) DEFAULT NULL,
  `server_picture_path` varchar(255) DEFAULT 'server.png',
  `main_color` varchar(7) DEFAULT '#000000',
  `text_color` varchar(7) DEFAULT '#FFFFFF',
  `invite_link` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- A tábla adatainak kiíratása `servers`
--


-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `server_bio`
--

CREATE TABLE `server_bio` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `about_us` varchar(255) DEFAULT NULL,
  `about_us_color` varchar(7) DEFAULT '#000000',
  `about_us_text_color` varchar(7) DEFAULT '#FFFFFF',
  `about_us_header_picture_path` varchar(255) DEFAULT NULL,
  `rp_category_id` int(11) DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- A tábla adatainak kiíratása `server_bio`
--



-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `server_font_style`
--


--
-- A tábla adatainak kiíratása `server_font_style`
--



-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `server_member`
--

CREATE TABLE `server_member` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) DEFAULT NULL,
  `server_id` int(11) DEFAULT NULL,
  `is_owner` tinyint(1) DEFAULT NULL,
  `is_moderator` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- A tábla adatainak kiíratása `server_member`
--



-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `server_stories`
--

CREATE TABLE `server_stories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `stories_id` int(11) DEFAULT NULL,
  `server_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- A tábla adatainak kiíratása `server_stories`
--



-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `stories`
--

CREATE TABLE `stories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `story_name` varchar(255) DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- A tábla adatainak kiíratása `stories`
--



-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `thread`
--

CREATE TABLE `thread` (
  `thread_id` int(11) NOT NULL AUTO_INCREMENT,
  `thread_text` varchar(255) DEFAULT NULL,
  `thread_text_color` varchar(7) DEFAULT '#FFFFFF',
  `thread_color` varchar(7) DEFAULT '#000000',
  `thread_post_date` datetime DEFAULT NULL,
  PRIMARY KEY (`thread_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- A tábla adatainak kiíratása `thread`
--



-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `uid` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `nickname` varchar(255) DEFAULT '',
  `gender_id` int(11) DEFAULT 0,
  `profile_pic_path` varchar(255) DEFAULT 'user.png',
  `language_id` varchar(255) DEFAULT '0',
  `thread_id` int(11) DEFAULT NULL,
  `status_id` int(11) DEFAULT 0,
  `about_me` varchar(255) DEFAULT '',
  `about_me_color` varchar(7) DEFAULT '#000000',
  `bio_main_color` varchar(7) DEFAULT '#000000',
  `bio_text_color` varchar(7) DEFAULT '#FFFFFF',
  `verified` tinyint(1) DEFAULT NULL,
  `is_admin` tinyint(1) DEFAULT NULL,
  `timeout_until` DATETIME DEFAULT NULL,
  `isBanned` TINYINT(1) DEFAULT 0,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- A tábla adatainak kiíratása `users`
--


-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user_character`
--

CREATE TABLE `user_character` (
  `id` int NOT NULL AUTO_INCREMENT,
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
  `affiliation_id` int(11) DEFAULT 0,
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
  `fc_name` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- A tábla adatainak kiíratása `user_character`
--



-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user_character_need`
--

CREATE TABLE `user_character_need` (
  `id` int NOT NULL AUTO_INCREMENT,
  `server_id` int(11) DEFAULT NULL,
  `birthdate_need` tinyint(1) DEFAULT NULL,
  `deathdate_need` tinyint(1) DEFAULT NULL,
  `resurrected_date_need` tinyint(1) DEFAULT NULL,
  `species_need` tinyint(1) DEFAULT NULL,
  `occupation_need` tinyint(1) DEFAULT NULL,
  `affiliation_need` tinyint(1) DEFAULT NULL,
  `nationality_need` tinyint(1) DEFAULT NULL,
  `powers_need` tinyint(1) DEFAULT NULL,
  `weaknesses_need` tinyint(1) DEFAULT NULL,
  `used_item_need` tinyint(1) DEFAULT NULL,
  `family_need` tinyint(1) DEFAULT NULL,
  `universe_need` tinyint(1) DEFAULT NULL,
  `fc_need` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- A tábla adatainak kiíratása `user_character_need`
--



-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user_status`
--

CREATE TABLE `user_status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status_type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Table to store friend requests
CREATE TABLE `friend_requests` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sender_id` varchar(255) NOT NULL,
  `receiver_id` varchar(255) NOT NULL,
  `status` varchar(50) DEFAULT 'pending', -- 'pending', 'accepted', 'rejected'
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`sender_id`) REFERENCES `users` (`uid`),
  FOREIGN KEY (`receiver_id`) REFERENCES `users` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Table to store friendships
CREATE TABLE `friendships` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user1_id` varchar(255) NOT NULL,
  `user2_id` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user1_id`) REFERENCES `users` (`uid`),
  FOREIGN KEY (`user2_id`) REFERENCES `users` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;





--
-- A tábla adatainak kiíratása `user_status`
--

INSERT INTO `user_status` (`id`, `status_type`) VALUES
(1, 'Active'),
(2, 'Offline'),
(3, 'Away'),
(4, 'Do not disturb');

--
-- Indexek a kiírt táblákhoz
--


--
-- A tábla indexei `alias_character`
--
ALTER TABLE `alias_character`
  ADD KEY `character_id` (`character_id`);

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
  ADD KEY `room_id` (`room_id`);

--
-- A tábla indexei `direct_message_room`
--
ALTER TABLE `direct_message_room`
  ADD KEY `user1_id` (`user1_id`),
  ADD KEY `user2_id` (`user2_id`);

--
-- A tábla indexei `room`
--
ALTER TABLE `room`
  ADD KEY `section_id` (`section_id`);

--
-- A tábla indexei `room_message`
--
ALTER TABLE `room_message`
  ADD KEY `room_id` (`room_id`),
  ADD KEY `character_id` (`character_id`);

--
-- A tábla indexei `servers`
--


--
-- A tábla indexei `server_bio`
--
ALTER TABLE `server_bio`
  ADD KEY `rp_category_id` (`rp_category_id`);

--
-- A tábla indexei `server_font_style`
--

--
-- A tábla indexei `server_member`
--
ALTER TABLE `server_member`
  ADD KEY `user_id` (`user_id`),
  ADD KEY `server_id` (`server_id`);

--
-- A tábla indexei `server_stories`
--
ALTER TABLE `server_stories`
  ADD KEY `stories_id` (`stories_id`),
  ADD KEY `server_id` (`server_id`);


--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD KEY `thread_id` (`thread_id`);

--
-- A tábla indexei `user_character`
--
ALTER TABLE `user_character`
  ADD KEY `servermember_id` (`servermember_id`),
  ADD KEY `status_id` (`status_id`),
  ADD KEY `species_id` (`species_id`),
  ADD KEY `gender_id` (`gender_id`),
  ADD KEY `affiliation_id` (`affiliation_id`),
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
  ADD CONSTRAINT `user_character_ibfk_6` FOREIGN KEY (`affiliation_id`) REFERENCES `affiliation` (`id`),
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
