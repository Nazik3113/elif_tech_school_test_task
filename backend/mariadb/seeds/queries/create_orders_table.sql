CREATE TABLE IF NOT EXISTS `seper_secure_db`.`orders` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `session_id` VARCHAR(36) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NULL,
  `phone` VARCHAR(100) NULL,
  `address` VARCHAR(500) NOT NULL,
  `price` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `phone_idx` (`phone` ASC) VISIBLE,
  INDEX `email_idx` (`email` ASC) VISIBLE,
  INDEX `session_id_idx` (`session_id` ASC) VISIBLE
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;