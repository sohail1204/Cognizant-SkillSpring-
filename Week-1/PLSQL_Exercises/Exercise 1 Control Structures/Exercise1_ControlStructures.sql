CREATE DATABASE BankDB;

USE BankDB;

CREATE TABLE Customers (
    CustomerID INT PRIMARY KEY,
    Name VARCHAR(100),
    DOB DATE,
    Balance DECIMAL(10,2),
    IsVIP BOOLEAN DEFAULT FALSE
);

CREATE TABLE Loans (
    LoanID INT PRIMARY KEY,
    CustomerID INT,
    LoanAmount DECIMAL(10,2),
    InterestRate DECIMAL(5,2),
    StartDate DATE,
    EndDate DATE,
    FOREIGN KEY(CustomerID) REFERENCES Customers(CustomerID)
);

CREATE TABLE Employees (
    EmployeeID INT PRIMARY KEY,
    Name VARCHAR(100),
    Position VARCHAR(50),
    Salary DECIMAL(10,2),
    Department VARCHAR(50),
    HireDate DATE
);

CREATE TABLE Accounts (
    AccountID INT PRIMARY KEY,
    CustomerID INT,
    AccountType VARCHAR(20),
    Balance DECIMAL(10,2),
    FOREIGN KEY(CustomerID) REFERENCES Customers(CustomerID)
); 

INSERT INTO Customers VALUES
(1,'John Doe','1955-05-15',12000,0),
(2,'Jane Smith','1995-07-20',8000,0),
(3,'David','1960-10-12',20000,0);

INSERT INTO Loans VALUES
(1,1,5000,8,'2025-01-01','2026-07-15'),
(2,2,10000,9,'2025-03-01','2026-08-01'),
(3,3,7000,7,'2025-02-01','2026-07-20');

INSERT INTO Employees VALUES
(1,'Alice','Manager',70000,'HR','2015-06-15'),
(2,'Bob','Developer',60000,'IT','2018-03-20');

INSERT INTO Accounts VALUES
(1,1,'Savings',20000),
(2,2,'Savings',8000),
(3,3,'Checking',15000); 

SELECT * FROM Customers;

SELECT * FROM Loans;

SELECT * FROM Employees;

SELECT * FROM Accounts;  

DELIMITER //

CREATE PROCEDURE ApplyLoanDiscount()
BEGIN
    UPDATE Loans
    SET InterestRate = InterestRate - 1
    WHERE CustomerID IN (
        SELECT CustomerID
        FROM Customers
        WHERE TIMESTAMPDIFF(YEAR,DOB,CURDATE()) > 60
    );
END //

DELIMITER ;

CALL ApplyLoanDiscount();

SELECT * FROM Loans;  

UPDATE Customers
SET IsVIP=TRUE
WHERE Balance>10000;

SELECT * FROM Customers;

SELECT
Customers.Name,
Loans.EndDate
FROM Customers
JOIN Loans
ON Customers.CustomerID=Loans.CustomerID
WHERE Loans.EndDate BETWEEN CURDATE()
AND DATE_ADD(CURDATE(),INTERVAL 30 DAY);