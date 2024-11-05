-- ...existing code...

-- Table structure for table `User_Character`
CREATE TABLE `User_Character` (
  `id` int(11) NOT NULL,
  `servermember_id` int(11) NOT NULL,
  `is_verified` tinyint(1) DEFAULT 0,
  `is_oc` tinyint(1) DEFAULT 0,
  `character_name` varchar(255) NOT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `gender_id` int(11) DEFAULT 0,
  `character_pic_path` varchar(255) DEFAULT NULL,
  `birthdate` datetime DEFAULT NULL,
  `died` tinyint(1) DEFAULT 0,
  `deathdate` datetime DEFAULT NULL,
  `resurrected` tinyint(1) DEFAULT 0,
  `resurrected_date` datetime DEFAULT NULL,
  `species_id` int(11) DEFAULT 0,
  `occupation` varchar(255) DEFAULT NULL,
  `affilation` varchar(255) DEFAULT NULL,
  `nationality` varchar(255) DEFAULT NULL,
  `status_id` int(11) DEFAULT 0,
  `story_id` int(11) DEFAULT 0,
  `bio` varchar(255) DEFAULT NULL,
  `powers` varchar(255) DEFAULT NULL,
  `weaknesses` varchar(255) DEFAULT NULL,
  `used_item` varchar(255) DEFAULT NULL,
  `family` varchar(255) DEFAULT NULL,
  `universe` varchar(255) DEFAULT NULL,
  `fc_id` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Table structure for table `Alias_Character`
CREATE TABLE `Alias_Character` (
  `id` int(11) NOT NULL,
  `character_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `character_pic_path` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Table structure for table `Character_Status`
CREATE TABLE `Character_Status` (
  `id` int(11) NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Table structure for table `Character_FC`
CREATE TABLE `Character_FC` (
  `id` int(11) NOT NULL,
  `fc_type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Table structure for table `Character_Species`
CREATE TABLE `Character_Species` (
  `id` int(11) NOT NULL,
  `specie` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Table structure for table `Room_Message`
CREATE TABLE `Room_Message` (
  `id` int(11) NOT NULL,
  `room_id` int(11) NOT NULL,
  `character_id` int(11) NOT NULL,
  `message` varchar(255) NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Indexes for new tables

-- Indexes for table `User_Character`
ALTER TABLE `User_Character`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_servermember` (`servermember_id`),
  ADD KEY `fk_gender` (`gender_id`),
  ADD KEY `fk_species` (`species_id`),
  ADD KEY `fk_status` (`status_id`),
  ADD KEY `fk_story` (`story_id`),
  ADD KEY `fk_fc` (`fc_id`);

-- Indexes for table `Alias_Character`
ALTER TABLE `Alias_Character`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_character` (`character_id`);

-- Indexes for table `Character_Status`
ALTER TABLE `Character_Status`
  ADD PRIMARY KEY (`id`);

-- Indexes for table `Character_FC`
ALTER TABLE `Character_FC`
  ADD PRIMARY KEY (`id`);

-- Indexes for table `Character_Species`
ALTER TABLE `Character_Species`
  ADD PRIMARY KEY (`id`);

-- Indexes for table `Room_Message`
ALTER TABLE `Room_Message`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_room` (`room_id`),
  ADD KEY `fk_character` (`character_id`);

-- AUTO_INCREMENT for new tables

-- AUTO_INCREMENT for table `User_Character`
ALTER TABLE `User_Character`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

-- AUTO_INCREMENT for table `Alias_Character`
ALTER TABLE `Alias_Character`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

-- AUTO_INCREMENT for table `Character_Status`
ALTER TABLE `Character_Status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

-- AUTO_INCREMENT for table `Character_FC`
ALTER TABLE `Character_FC`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

-- AUTO_INCREMENT for table `Character_Species`
ALTER TABLE `Character_Species`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

-- AUTO_INCREMENT for table `Room_Message`
ALTER TABLE `Room_Message`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

-- Constraints for new tables

-- Constraints for table `User_Character`
ALTER TABLE `User_Character`
  ADD CONSTRAINT `fk_servermember` FOREIGN KEY (`servermember_id`) REFERENCES `server_member` (`id`),
  ADD CONSTRAINT `fk_gender` FOREIGN KEY (`gender_id`) REFERENCES `gender` (`id`),
  ADD CONSTRAINT `fk_species` FOREIGN KEY (`species_id`) REFERENCES `Character_Species` (`id`),
  ADD CONSTRAINT `fk_status` FOREIGN KEY (`status_id`) REFERENCES `Character_Status` (`id`),
  ADD CONSTRAINT `fk_story` FOREIGN KEY (`story_id`) REFERENCES `stories` (`id`),
  ADD CONSTRAINT `fk_fc` FOREIGN KEY (`fc_id`) REFERENCES `Character_FC` (`id`);

-- Constraints for table `Alias_Character`
ALTER TABLE `Alias_Character`
  ADD CONSTRAINT `fk_character` FOREIGN KEY (`character_id`) REFERENCES `User_Character` (`id`);

-- Constraints for table `Room_Message`
ALTER TABLE `Room_Message`
  ADD CONSTRAINT `fk_room` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`),
  ADD CONSTRAINT `fk_character` FOREIGN KEY (`character_id`) REFERENCES `User_Character` (`id`);

-- ...existing code...
