CREATE TABLE `shortLinks` (
	`id` int AUTO_INCREMENT NOT NULL,
	`shortCode` varchar(30) NOT NULL,
	`url` varchar(2555) NOT NULL,
	CONSTRAINT `shortLinks_id` PRIMARY KEY(`id`),
	CONSTRAINT `shortLinks_shortCode_unique` UNIQUE(`shortCode`)
);
