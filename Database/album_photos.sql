-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: album
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `photos`
--

DROP TABLE IF EXISTS `photos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `photos` (
  `photo_id` int NOT NULL AUTO_INCREMENT,
  `URL` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `date` date DEFAULT NULL,
  PRIMARY KEY (`photo_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `photos_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=118 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `photos`
--

LOCK TABLES `photos` WRITE;
/*!40000 ALTER TABLE `photos` DISABLE KEYS */;
INSERT INTO `photos` VALUES (35,'https://images.pexels.com/photos/16465979/pexels-photo-16465979/free-photo-of-woman-standing-in-a-rapeseed-field.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load','Yellow nature',13,'2023-12-05'),(36,'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e','braekfest',11,'2023-12-05'),(50,'https://images.pexels.com/photos/19341525/pexels-photo-19341525.jpeg','Athlete on bike',3,'2023-12-07'),(52,'https://images.pexels.com/photos/19384411/pexels-photo-19384411.jpeg','Desert Beauty',13,'2023-12-07'),(53,'https://images.pexels.com/photos/19361893/pexels-photo-19361893.jpeg','Eagle flying',14,'2023-12-07'),(54,'https://images.pexels.com/photos/19269075/pexels-photo-19269075.jpeg','Cute Koala bear',14,'2023-12-07'),(56,'https://images.pexels.com/photos/19154096/pexels-photo-19154096.jpeg','trees and desert',13,'2023-12-07'),(57,'https://images.pexels.com/photos/19135988/pexels-photo-19135988.jpeg','Deer',14,'2023-12-07'),(58,'https://images.pexels.com/photos/19234352/pexels-photo-19234352.jpeg','cute little kid',2,'2023-12-07'),(59,'https://images.pexels.com/photos/19326627/pexels-photo-19326627.jpeg','Dog in nature',14,'2023-12-07'),(60,'https://images.pexels.com/photos/19326113/pexels-photo-19326113.jpeg','Stormy sea',13,'2023-12-07'),(61,'https://images.pexels.com/photos/19297354/pexels-photo-19297354.jpeg','Red flower',13,'2023-12-07'),(62,'https://images.pexels.com/photos/19274586/pexels-photo-19274586.jpeg','Orange leaf',13,'2024-01-06'),(63,'https://images.pexels.com/photos/19200684/pexels-photo-19200684.jpeg','Trees on the side of a mountain',13,'2023-12-07'),(64,'https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg','Lake, trees and a mountain',13,'2023-12-07'),(65,'https://images.pexels.com/photos/46505/swiss-shepherd-dog-dog-pet-portrait-46505.jpeg','White beautiful dog',14,'2023-12-08'),(66,'https://images.pexels.com/photos/69932/tabby-cat-close-up-portrait-69932.jpeg','Green eyed cat',14,'2023-12-07'),(67,'https://images.pexels.com/photos/935743/pexels-photo-935743.jpeg','A woman and a laptop',15,'2023-12-07'),(68,'https://images.pexels.com/photos/814830/pexels-photo-814830.jpeg','Grey street',2,'2023-12-07'),(69,'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg','Red sports car',16,'2023-12-07'),(70,'https://images.pexels.com/photos/457418/pexels-photo-457418.jpeg','Yellow car under a tree',16,'2023-12-07'),(71,'https://images.pexels.com/photos/14541403/pexels-photo-14541403.jpeg','Woman playing football on the beach',3,'2023-12-07'),(72,'https://images.pexels.com/photos/47730/the-ball-stadion-football-the-pitch-47730.jpeg','Football on a grass field',3,'2023-12-07'),(73,'https://images.pexels.com/photos/61127/pexels-photo-61127.jpeg','Bananas',17,'2023-12-07'),(74,'https://images.pexels.com/photos/70746/strawberries-red-fruit-royalty-free-70746.jpeg','Strawberries',17,'2023-12-07'),(75,'https://images.pexels.com/photos/1114797/pexels-photo-1114797.jpeg','An orange',17,'2023-12-07'),(76,'https://images.pexels.com/photos/19207025/pexels-photo-19207025.jpeg','Yellow trees',13,'2023-12-07'),(78,'https://images.pexels.com/photos/4210857/pexels-photo-4210857.jpeg','Stack of jeans',12,'2023-12-07'),(79,'https://images.pexels.com/photos/19130034/pexels-photo-19130034.jpeg','Grey sand',13,'2023-12-08'),(80,'https://images.pexels.com/photos/19137864/pexels-photo-19137864.jpeg','A snake on a tree',14,'2023-12-08'),(83,'https://images.pexels.com/photos/19121671/pexels-photo-19121671.jpeg','Pure dessert',13,'2023-12-08'),(84,'https://images.pexels.com/photos/7504630/pexels-photo-7504630.jpeg','Beautiful dog',14,'2023-12-08'),(85,'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg','Professionals having a Meeting',15,'2023-12-08'),(86,'https://images.pexels.com/photos/2224861/pexels-photo-2224861.png','Buildings',18,'2023-12-08'),(87,'https://images.pexels.com/photos/1400249/pexels-photo-1400249.jpeg','High-rise Building',18,'2023-12-08'),(88,'https://images.pexels.com/photos/1366909/pexels-photo-1366909.jpeg','The mountain',13,'2023-12-08'),(89,'https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg','Cooked Seafoods',2,'2023-12-08'),(90,'https://images.pexels.com/photos/1006121/pexels-photo-1006121.jpeg','Forest with sun light',13,'2023-12-08'),(91,'https://images.pexels.com/photos/4423599/pexels-photo-4423599.jpeg','Sea turtle',14,'2023-12-08'),(92,'https://images.pexels.com/photos/1974520/pexels-photo-1974520.jpeg','White car in Miami',16,'2023-12-08'),(93,'https://images.pexels.com/photos/4171211/pexels-photo-4171211.jpeg','Beautiful view',15,'2023-12-08'),(94,'https://images.pexels.com/photos/3518659/pexels-photo-3518659.jpeg','Brown Deer Near Trees',14,'2023-12-08'),(95,'https://images.pexels.com/photos/3822583/pexels-photo-3822583.jpeg','Woman Meditating',3,'2023-12-08'),(96,'https://images.pexels.com/photos/18827685/pexels-photo-18827685.jpeg','Cow',14,'2023-12-08'),(97,'https://cdn.pixabay.com/photo/2023/10/29/11/33/cow-8349729_1280.png','Bull',14,'2023-12-08'),(98,'https://images.pexels.com/photos/5908232/pexels-photo-5908232.jpeg','Ramen',11,'2023-12-08'),(99,'https://images.pexels.com/photos/15276450/pexels-photo-15276450/free-photo-of-grayscale-photo-of-a-pigeon.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load','Pigeon',14,'2023-12-08'),(100,'https://images.unsplash.com/photo-1682685797818-c9dc151d241e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxNnx8fGVufDB8fHx8fA%3D%3D','A tree in a middle of a dessert',13,'2023-12-08'),(101,'https://images.unsplash.com/photo-1701635269348-b095bd4944ae?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1Mnx8fGVufDB8fHx8fA%3D%3D','Stadium, building and sea',18,'2023-12-08'),(102,'https://images.pexels.com/photos/3756163/pexels-photo-3756163.jpeg','Woman with guitar',15,'2023-12-08'),(103,'https://images.pexels.com/photos/19305988/pexels-photo-19305988.jpeg','cuch',14,'2023-12-08'),(104,'https://images.pexels.com/photos/1420405/pexels-photo-1420405.jpeg','lin',14,'2023-12-08'),(105,'https://images.pexels.com/photos/7978834/pexels-photo-7978834.jpeg','Chess game',3,'2023-12-08'),(106,'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg','Pancakes !!!',11,'2023-12-08'),(107,'https://images.pexels.com/photos/11601471/pexels-photo-11601471.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load','Sunset walk',18,'2023-12-09'),(108,'https://images.pexels.com/photos/1774931/pexels-photo-1774931.jpeg','Modern Architecture',18,'2023-12-09'),(109,'https://images.pexels.com/photos/19248066/pexels-photo-19248066.jpeg','Forest',13,'2023-12-09'),(110,'https://images.pexels.com/photos/19415894/pexels-photo-19415894.jpeg','moving stairs',18,'2023-12-09'),(111,'https://images.pexels.com/photos/19416910/pexels-photo-19416910.jpeg','test',2,'2023-12-09'),(112,'https://images.pexels.com/photos/10018409/pexels-photo-10018409.jpeg','Azrieli Tower',18,'2023-12-10'),(113,'https://images.pexels.com/photos/19380634/pexels-photo-19380634.jpeg','Tired Cat',14,'2024-01-06'),(114,'https://images.pexels.com/photos/1534411/pexels-photo-1534411.jpeg','Huge Building',19,'2024-01-06'),(115,'https://images.pexels.com/photos/9250/green-attraction-war-museum.jpg','Tank',20,'2024-01-06'),(116,'https://images.pexels.com/photos/264156/pexels-photo-264156.jpeg','Marines',20,'2024-01-06'),(117,'https://images.pexels.com/photos/1400249/pexels-photo-1400249.jpeg','High Buildings',19,'2024-01-06');
/*!40000 ALTER TABLE `photos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-10 12:29:09
