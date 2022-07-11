CREATE TABLE IF NOT EXISTS `seper_secure_db`.`order_items` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `order_id` INT UNSIGNED NOT NULL,
  `shop_item_id` INT UNSIGNED NOT NULL,
  `amount` INT UNSIGNED NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  INDEX `order_id_idx` (`order_id` ASC) VISIBLE,
  CONSTRAINT `fk_order_id` FOREIGN KEY (`order_id`) REFERENCES `seper_secure_db`.`orders` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `fk_shop_item_id` FOREIGN KEY (`shop_item_id`) REFERENCES `seper_secure_db`.`shops_items` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
);