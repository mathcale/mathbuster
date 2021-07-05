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

## Tech

- [NestJS](https://nestjs.com/), on [DO App Platform](https://www.digitalocean.com/products/app-platform/)
- MongoDB, on [DO Managed Databases](https://www.digitalocean.com/products/managed-databases-mongodb/)

## Running the app locally

```bash
# Install the correct Node version with nvm
$ nvm install

# Install dependencies with Yarn
$ yarn

# Create a .env file based on the example
# Make sure to fill it with your MongoDB instance credentials
cp .env.example .env

# Start the dev server!
$ yarn start:dev
```

## Stay in touch

- Author: [Matheus Calegaro](https://matheus.me)

## License

[MIT licensed](LICENSE)
