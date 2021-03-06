CREATE TABLE IF NOT EXISTS `elif_tech_school_test_tack_db`.`shops` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `shops_id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `shops_name_UNIQUE` (`name` ASC) VISIBLE
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;