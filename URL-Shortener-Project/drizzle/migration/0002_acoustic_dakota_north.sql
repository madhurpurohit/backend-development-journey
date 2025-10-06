ALTER TABLE `shortLinks` ADD `created_at` timestamp DEFAULT (now()) NOT NULL;--> statement-breakpoint
ALTER TABLE `shortLinks` ADD `updated_at` timestamp DEFAULT (now()) NOT NULL ON UPDATE CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `shortLinks` ADD `user_id` int NOT NULL;--> statement-breakpoint
ALTER TABLE `shortLinks` ADD CONSTRAINT `shortLinks_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;