create table users(id varchar(50) primary key,email varchar(30),name varchar(50),password varchar(100));

create table rooms(id varchar(5) primary key, name varchar(20),price int, image varchar(100), wifi BOOL, tv bool, beds int, shower bool, kitchen bool);

create table reservations(id varchar(50) primary key,startDate Date,endDate Date, userId varchar(50) references users(id),roomId varchar(5) references rooms(id));
