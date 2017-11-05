CREATE DATABASE `golden_book` CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
USE `golden_book`;
CREATE TABLE `message` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `content` varchar(255)  DEFAULT NULL,
  `created_at` datetime DEFAULT NULL
);
