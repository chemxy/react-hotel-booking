# Frontend

home page

- user should land on the home page by default.
- user should see a search criterial on the home page..

search results page

- user should be able to view the available hotels on a desired date range.
  - user should be able to book a hotel that is currently available, with specified duration.  

reservation page

- user must be logged in to make a room reservation.
- user should enter their information during checkout / reservation process, including user's first name, last name, cellphone number, age, etc.
- user should be able to select a payment method among visa, mastercard, paypal. 

profile page

- user should be able to login to see their profile and booking history.
- user should be able to edit their profile after login.
- user should be able to continue the payment if the user didnt finish the checkout. (advanced)





# Backend

- get available hotels: GET http://localhost:3201/rooms/all

- get a hotel by id: GET http://localhost:3201/room?id=101

- get all reservations for the given room: GET http://localhost:3201/reservations/room?id=102

- get all reservations for the given date: GET http://localhost:3201/reservations/all?startDate=2022-11-02&endDate=2022-11-04

- reserve a room: POST http://localhost:3201/reservations/reserve

  {

    "roomId": "102",

    "startDate": "2022-11-02",

    "endDate": "2022-11-04",

    "email": "test@test.com"

  }

- user login: POST http://localhost:3201/users/login

  {

    "email":"test@tes1t.com",

    "password":"test123"

  }

- user signup: POST http://localhost:3201/users/signup

  {

    "email":"test@test.com",

    "password":"test123"

  }

- get user profile: GET /users/profile?id=001



# Data object models

- hotel room model:
  - room id (101, 102...201, 202,...301,..305...,311,...)
  - room name
  - room price
  - room facilitations (those could be tags on the frontend?)
    - beds
    - bathroom & hot water
    - wifi
    - TV
    - ...
  
- reservation model
  - room model
  - start date
  - end date
  - paid flag (advanced)
  
- user model:
  - username
  
  - password
  
    