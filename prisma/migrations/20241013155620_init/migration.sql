-- CreateTable
CREATE TABLE `User` (
    `userID` INTEGER NOT NULL AUTO_INCREMENT,
    `name` CHAR(50) NOT NULL,
    `email` CHAR(50) NOT NULL,
    `password` CHAR(50) NOT NULL,
    `address` CHAR(50) NOT NULL,
    `phoneNumber` CHAR(20) NOT NULL,
    `dateJoined` DATE NOT NULL,

    PRIMARY KEY (`userID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order` (
    `orderID` INTEGER NOT NULL AUTO_INCREMENT,
    `orderDate` DATE NOT NULL,
    `shippingAddress` CHAR(50) NOT NULL,
    `shippingCost` DECIMAL(10, 2) NOT NULL,
    `totalAmount` DECIMAL(10, 2) NOT NULL,
    `status` CHAR(50) NOT NULL,
    `userID` INTEGER NOT NULL,

    PRIMARY KEY (`orderID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrderItem` (
    `orderItemID` INTEGER NOT NULL AUTO_INCREMENT,
    `quantity` INTEGER NOT NULL,
    `priceAtPurchase` DECIMAL(10, 2) NOT NULL,
    `orderID` INTEGER NOT NULL,
    `productID` INTEGER NOT NULL,

    PRIMARY KEY (`orderItemID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payment` (
    `paymentID` INTEGER NOT NULL AUTO_INCREMENT,
    `paymentMethod` CHAR(50) NOT NULL,
    `amount` DECIMAL(10, 2) NOT NULL,
    `paymentDate` DATE NOT NULL,
    `status` CHAR(50) NOT NULL,
    `orderID` INTEGER NOT NULL,

    PRIMARY KEY (`paymentID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `productID` INTEGER NOT NULL AUTO_INCREMENT,
    `name` CHAR(50) NOT NULL,
    `description` CHAR(50) NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `size` CHAR(10) NOT NULL,
    `color` CHAR(10) NOT NULL,
    `category` CHAR(10) NOT NULL,
    `stockQuantity` INTEGER NOT NULL,
    `imageURL` CHAR(50) NOT NULL,

    PRIMARY KEY (`productID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Wishlist` (
    `wishlistID` INTEGER NOT NULL AUTO_INCREMENT,
    `addedDate` DATE NOT NULL,
    `userID` INTEGER NOT NULL,
    `productID` INTEGER NOT NULL,

    PRIMARY KEY (`wishlistID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`userID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_orderID_fkey` FOREIGN KEY (`orderID`) REFERENCES `Order`(`orderID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_productID_fkey` FOREIGN KEY (`productID`) REFERENCES `Product`(`productID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_orderID_fkey` FOREIGN KEY (`orderID`) REFERENCES `Order`(`orderID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Wishlist` ADD CONSTRAINT `Wishlist_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`userID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Wishlist` ADD CONSTRAINT `Wishlist_productID_fkey` FOREIGN KEY (`productID`) REFERENCES `Product`(`productID`) ON DELETE RESTRICT ON UPDATE CASCADE;
