CREATE TABLE Musician (
    id INT PRIMARY KEY,
    Name VARCHAR(255),
    Ph_Number VARCHAR(255),
    Street VARCHAR(255),
    City VARCHAR(255)
);


CREATE TABLE Album (
    id INT PRIMARY KEY,
    Title VARCHAR(255),
    Date DATE,
    Musician_id INT,
    FOREIGN KEY (Musician_id) REFERENCES Musician(id)
);

CREATE TABLE Instrument (
    Name VARCHAR(255) PRIMARY KEY,
    `Key` VARCHAR(255)
);

CREATE TABLE Song (
    Title VARCHAR(255) PRIMARY KEY,
    Author VARCHAR(255),
    Album_id INT,
    FOREIGN KEY (Album_id) REFERENCES Album(id)
);



CREATE TABLE Play (
    Musician_id INT,
    Instrument_Name VARCHAR(255),
    PRIMARY KEY (Musician_id, Instrument_Name),
    FOREIGN KEY (Musician_id) REFERENCES Musician(id),
    FOREIGN KEY (Instrument_Name) REFERENCES Instrument(Name)
);


CREATE TABLE Perform (
    Musician_id INT,
    Song_Title VARCHAR(255),
    PRIMARY KEY (Musician_id, Song_Title),
    FOREIGN KEY (Musician_id) REFERENCES Musician(id),
    FOREIGN KEY (Song_Title) REFERENCES Song(Title)
);

