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

- get available hotels: GET /rooms/all?startdate=20221120&enddate=20221122

- get a hotel by id: GET /rooms/room?id=201

- book a room: POST /rooms/reserve

  {

  room id: 

  room name:

  start date:

  end date:

  }

- login: POST /users/login

  {

  username:

  password:

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
  - reservation history / reservation list3