create table users(id varchar(50) primary key,email varchar(30),name varchar(50),password varchar(100));

create table rooms(id varchar(5) primary key, name varchar(20),price int, image varchar(100), wifi BOOL, tv bool, beds int, shower bool, kitchen bool);

create table reservations(id varchar(50) primary key,startDate Date,endDate Date, userId varchar(50) references users(id),roomId varchar(5) references rooms(id));

insert into users values('a68f3e9d-2db0-4a42-b3de-02f193850240', 'test@test.com', 'test name', '$2b$12$IwLmXRvaXXPMECvIUxVVmO57/L16.oDr3lAVaUl2GYpnRfj8R4vsu');

insert into rooms values('101','room 1', 180, 'http://localhost:3201/images/room103.jpg', true, true, 2, true, true);
insert into rooms values('102','room 2', 180, 'http://localhost:3201/images/room103.jpg', true, true, 3, true, true);
insert into rooms values('103','room 3', 180, 'http://localhost:3201/images/room103.jpg', true, true, 1, true, true);
insert into rooms values('104','room 4', 180, 'http://localhost:3201/images/room103.jpg', true, true, 2, true, true);
insert into rooms values('105','room 5', 180, 'http://localhost:3201/images/room103.jpg', true, true, 2, true, true);
insert into rooms values('106','room 6', 180, 'http://localhost:3201/images/room103.jpg', true, true, 2, true, true);
insert into rooms values('201','room 7', 180, 'http://localhost:3201/images/room103.jpg', true, true, 2, true, true);
insert into rooms values('202','room 8', 180, 'http://localhost:3201/images/room103.jpg', true, true, 2, true, true);
insert into rooms values('203','room 9', 180, 'http://localhost:3201/images/room103.jpg', true, true, 2, true, true);
insert into rooms values('204','room 10', 180, 'http://localhost:3201/images/room103.jpg', true, true, 2, true, true);

insert into reservations values('0f09c87a-b4d0-41e6-804e-0b6e49a793cc', TO_DATE('2022-11-12', 'YYYY-MM-DD'), TO_DATE('2022-11-14', 'YYYY-MM-DD'), 'a68f3e9d-2db0-4a42-b3de-02f193850240', '101');
insert into reservations values('30e8f6a7-0947-4b7f-a29e-2096b2467e14', TO_DATE('2022-11-18', 'YYYY-MM-DD'), TO_DATE('2022-11-24', 'YYYY-MM-DD'), 'a68f3e9d-2db0-4a42-b3de-02f193850240', '102');
