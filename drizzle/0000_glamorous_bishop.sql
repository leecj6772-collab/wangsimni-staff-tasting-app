CREATE TABLE `responses` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`staff_name` text DEFAULT '익명' NOT NULL,
	`gender` text NOT NULL,
	`age_group` text NOT NULL,
	`menus` text NOT NULL,
	`warm` text NOT NULL,
	`satisfaction` integer NOT NULL,
	`seasoning` text NOT NULL,
	`improvements` text NOT NULL,
	`comment` text DEFAULT '' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
