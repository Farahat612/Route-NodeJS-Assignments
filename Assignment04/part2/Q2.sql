-- Create Sales-Office table
CREATE TABLE Sales_Office (
    Number INT PRIMARY KEY,
    Location VARCHAR(255),
    Manager_Id INT,
    FOREIGN KEY (Manager_Id) REFERENCES Employee(Id)
);

-- Create Employee table
CREATE TABLE Employee (
    Id INT PRIMARY KEY,
    Name VARCHAR(255),
    Sales_Office_Number INT,
    FOREIGN KEY (Sales_Office_Number) REFERENCES Sales_Office(Number)
);

-- Create Property table
CREATE TABLE Property (
    Id INT PRIMARY KEY,
    Location VARCHAR(255),
    Code VARCHAR(255),
    Address VARCHAR(255),
    City VARCHAR(255),
    State VARCHAR(255),
    Sales_Office_Number INT,
    FOREIGN KEY (Sales_Office_Number) REFERENCES Sales_Office(Number)
);

-- Create Owner table
CREATE TABLE Owner (
    Id INT PRIMARY KEY,
    Name VARCHAR(255)
);



-- Create Own table
CREATE TABLE Own (
    Owner_Id INT,
    Property_Id INT,
    PRIMARY KEY (Owner_Id, Property_Id),
    FOREIGN KEY (Owner_Id) REFERENCES Owner(Id),
    FOREIGN KEY (Property_Id) REFERENCES Property(Id)
);
 