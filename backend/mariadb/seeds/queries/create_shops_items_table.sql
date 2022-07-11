CREATE TABLE IF NOT EXISTS `seper_secure_db`.`shops_items` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `shop_id` INT UNSIGNED NOT NULL,
  `name` VARCHAR(500) NOT NULL,
  `image` VARCHAR(100) NOT NULL,
  `price` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `shop_id_idx` (`shop_id` ASC) VISIBLE,
  INDEX `name_idx` (`name` ASC) VISIBLE,
  CONSTRAINT `fk_shop_id` FOREIGN KEY (`shop_id`) REFERENCES `seper_secure_db`.`shops` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;