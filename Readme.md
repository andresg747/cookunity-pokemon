<h3 align="center">
   <h2 class="rebrand text-slick center small" style="
    justify-content: center;
    font-size: 36px;
    line-height: 60px;
    font-weight: 700;
    margin-top: 0;
    display: flex;
    align-items: center;
    margin-bottom: 0;
    ">
   <img src="https://cu-landings-web-assets.imgix.net/assets/icons/slick-yellow.png" style="width: 96px;height: 56px;">
   <span style="margin-left: 0;text-align: center;position: absolute;color: #000;height: unset;">Pokemon App</span>
   </h2>
   <br>
    <img src="https://img.shields.io/badge/Node.js-20.13.1-green" alt="Node.js version">
    <img src="https://img.shields.io/badge/React-17.0.2-blue" alt="React version">
    <img src="https://img.shields.io/badge/Next.js-11.1.2-blue" alt="Next.js version">
    <img src="https://img.shields.io/badge/Prisma-3.8.1-blue" alt="Prisma version">
    <img src="https://img.shields.io/badge/PostgreSQL-13.3-blue" alt="PostgreSQL version">
    <!-- Made with love by AG -->
    <img src="https://img.shields.io/badge/Made%20with%20%E2%9D%A4%EF%B8%8F%20%20-by%20AG-ffc84e" alt="Made with love by AG">

## Server

It is a Node.js server that uses Express.js to create the API endpoints and Prisma to interact with the PostgreSQL database.

### How to run the server

1. Run the command `npm run dev` in the `app/server` folder
2. Wait for the server to start
3. The server will be running on `http://localhost:3001`

### API Endpoints

Swagger documentation can be found at `http://localhost:3001/api-docs`

### Unit / Integration Tests

This test suite is designed to test the API endpoints of the server. It uses a test docker container to create a new PostgreSQL DB and run the tests on it. The tests are written using Jest and Supertest.

### How it works

1. Create a test docker using .env.test with a new PostgreSQL DB
2. Run the prisma migrate command to create the tables in the new DB
3. Run the tests using jest and supertest
4. Delete all data and destroy the test docker

### How to run the tests

1. Run the command `npm run test` in the `app/server` folder
2. Wait for the tests to finish
3. Check the results in the terminal

## Client

The client is a `Next.js` application that uses `React` to create the UI components and `Tailwind CSS` for styling. It uses `axios` to fetch data from the server and `React Query` for managing the data.

### How to run the client

1. Run the command `npm run dev` in the `app/client` folder
2. Wait for the client to start
3. The client will be running on `http://localhost:3000`
