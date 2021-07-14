<!-- markdownlint-disable MD033 MD041 -->
<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src=".github/img/logo.png" width="320" alt="Mathbuster" />
  </a>

  <p align="center">An old-school movie rental app, built with modern tech for Digital Ocean's 2021 MongoDB Hackathon</p>

  <p align="center">
    <a href="https://insomnia.rest/run/?label=Mathbuster&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fmathcale%2Fmathbuster%2Fmain%2Fdocs%2Finsomnia-requests-collection.yaml" target="_blank">
      <img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia">
    </a>
  </p>
</p>

## Features

- 📼 Movies

  - Create
  - List all
  - Show one
  - Edit
  - Delete

- 👨‍👩‍👧‍👦 Customers

  - Create
  - List all
  - Show one
  - Edit

- ⏳ Rental
  - Rent movie to customer
  - Return movie

## Tech

- [NestJS](https://nestjs.com/) as back-end;
- [Next.js](https://nextjs.org/) as front-end;
- MongoDB, on [DO Managed Databases](https://www.digitalocean.com/products/managed-databases-mongodb/)
- [DO App Platform](https://www.digitalocean.com/products/app-platform/)

## Running the app locally

```bash
# Install the correct Node version with nvm
$ nvm install

# Install dependencies with Yarn
$ yarn

# Install packages' dependencies with Lerna
$ yarn bootstrap

# Create a .env file based on the example for the back-end
# Make sure to fill it with your MongoDB instance credentials
$ cp packages/backend/.env.example packages/backend/.env

# Create a .env file based on the example for the back-end
# Fill it with your local api address
$ cp packages/frontend/.env.example packages/frontend/.env.local

# Start dev servers!
# Back-end is available on port 3000 and front-end on port 3001
$ yarn start
```

## Who made this?

- [Matheus Calegaro](https://matheus.me)

## License

[MIT licensed](LICENSE)
