<div align="center">
   <img src="./apps/client/public/images/readme-logo.png" width="200">
   </h2>
</div>
   <br>
<div align="center">
    <img src="https://img.shields.io/badge/Node.js-20.13.1-green" alt="Node.js version">
    <img src="https://img.shields.io/badge/React-^18-blue" alt="React version">
    <img src="https://img.shields.io/badge/Next.js-14.2.3-blue" alt="Next.js version">
    <img src="https://img.shields.io/badge/Prisma-5.14.0-blue" alt="Prisma version">
    <img src="https://img.shields.io/badge/PostgreSQL-16.3-blue" alt="PostgreSQL version">
    <img src="https://img.shields.io/badge/Made%20with%20%E2%9D%A4%EF%B8%8F%20%20-by%20AG-ffc84e" alt="Made with love by AG">
</div>

## Description

This is a full-stack application that uses Node.js, Express.js, Prisma, PostgreSQL, and Next.js (React), configured as monorepo using Microsoft's Rush.

The server is a REST API that interacts with a PostgreSQL database using Prisma. The client is a Next.js application that fetches data from the server and displays it in the UI.

## Features

- API:

  - Create, Read, Update, and Delete Pokemon
  - List all Pokemon with pagination
  - List Pokemon weaknesses and resistances
  - Pokemon battle simulation
  - Swagger documentation
  - Unit / Integration tests for endpoints and utility functions

- Client:
  - List all Pokemon
  - Filter Pokemon by name and type
  - Select a Pokemon to view its details
  - Battle mode to simulate a battle between two Pokemon

## Requirements

- [Node.js](https://nodejs.org/en/download/package-manager) `> v18.17.0`
- [@microsoft/rush](https://rushjs.io/pages/intro/get_started/) v5.0.0
  - Install using `npm install -g @microsoft/rush`
- [Docker](https://docs.docker.com/get-docker/)
- Unix-based system (Linux, macOS, WSL) as some commands rely heavily on Unix

## Installation

1. Clone the repository:
   - `git clone https://github.com/andresg747/cookunity-pokemon.git`
2. Navigate to the apps folder:
   - `cd cookunity-pokemon/apps`
3. Install dependencies:
   - `rush install`

> Note: For simplicity, the .env.\* files are included in the repository. In a production environment, these files should be kept secret.

#### Troubleshooting

- If you encounter any issues with the `rush` command, try running a clean install using the command `rush update --purge --full && rush build`

## Server

It is a Node.js server that uses Express.js to create the API endpoints and Prisma to interact with the PostgreSQL database.

### How to run the server

1. In a new terminal window, run the command `npm run dev` in the `apps/server` folder
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

1. Run the command `npm run test` in the `apps/server` folder
2. Wait for the tests to finish
3. Check the results in the terminal

## Client

The client is a `Next.js` application that uses `React` to create the UI components and `Tailwind CSS` for styling. It uses `axios` to fetch data from the server and `React Query` for managing the data.

### How to run the client

1. In a new terminal window, run the command `npm run dev` in the `apps/client` folder
2. Wait for the client to start
3. The client will be running on `http://localhost:3000`
