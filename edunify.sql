-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 22, 2023 at 09:39 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `edunify`
--

-- --------------------------------------------------------

--
-- Table structure for table `school`
--

CREATE TABLE `school` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `address` text NOT NULL,
  `city` text NOT NULL,
  `state` text NOT NULL,
  `contact` varchar(10) NOT NULL,
  `image` text NOT NULL,
  `email_id` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `school`
--

INSERT INTO `school` (`id`, `name`, `address`, `city`, `state`, `contact`, `image`, `email_id`) VALUES
(2, 'Seth M. R. Jaipuria', 'Gomti Nagar | Lucknow', 'Lucknow', 'Uttar Pradesh', '9919408817', '1700681215517-Seth-MR-Jaipuria.jpg', 'teepukhan729@gmail.com'),
(3, 'La Martiniere College', 'Hazratganj Lucknow ', 'Lucknow ', 'Uttar Pradesh', '9919408817', '1700681361026-La_Martiniere_College_Lucknow_image1_7.jpeg', 'teepukhan729@gmail.com'),
(4, 'Lucknow Public School', 'Vinamra Khand Gomti Nagar', 'Lucknow', 'Uttar Pradesh', '9919408817', '1700681831016-lps.jpeg', 'teepukhan729@gmail.com'),
(5, 'The Asian School', 'Vasant Vihar', 'Dehradun ', 'UttraKhand', '9919408817', '5-asia.jpeg', 'teepukhan729@gmail.com');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `school`
--
ALTER TABLE `school`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `school`
--
ALTER TABLE `school`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
