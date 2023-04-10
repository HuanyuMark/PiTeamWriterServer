START TRANSACTION;

CREATE DATABASE pi_team_writer CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;

USE pi_team_writer;

CREATE TABLE `user` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(255),
    `password` VARCHAR(255),
    `icon` VARCHAR(255) COMMENT 'the path of the icon img',
    `intro` TEXT CHECK(CHAR_LENGTH(`intro`) <= 800) COMMENT ' <= 800 characters length',
    PRIMARY KEY (`id`)
);

CREATE TABLE `team` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `teamname` VARCHAR(255),
    `creater_id` INT UNSIGNED NOT NULL,
    `intro` TEXT CHECK(CHAR_LENGTH(`intro`) <= 2000) COMMENT ' <= 2000 characters length',
    `members_count` INT UNSIGNED DEFAULT(1),
    `create_time` DATETIME DEFAULT(now()),
    PRIMARY KEY (`id`),
    CONSTRAINT `team_ref_user` FOREIGN KEY (`creater_id`) REFERENCES `user` (`id`)
);

CREATE TABLE `user_team` (
    `user_id` INT UNSIGNED NOT NULL,
    `team_id` INT UNSIGNED NOT NULL,
    CONSTRAINT `user_team_ref_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
    CONSTRAINT `user_team_ref_team` FOREIGN KEY (`team_id`) REFERENCES `team` (`id`)
);

CREATE TABLE `text_file` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `textname` VARCHAR(255) NOT NULL,
    `content` TEXT,
    `team_id` INT UNSIGNED NOT NULL,
    `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    CONSTRAINT `text_file_ref_team` FOREIGN KEY (`team_id`) REFERENCES `team` (`id`)
);

CREATE TABLE `msg_file` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INT UNSIGNED NOT NULL,
    `text_id` INT UNSIGNED NOT NULL,
    `content` TEXT,
    `start_row` INT DEFAULT 0,
    `end_row` INT DEFAULT 0,
    `position` JSON,
    `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    CONSTRAINT `msg_file_ref_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
    CONSTRAINT `msg_file_ref_text_file` FOREIGN KEY (`text_id`) REFERENCES `text_file` (`id`),
    CHECK(`start_row` <= `end_row`)
);

COMMIT;