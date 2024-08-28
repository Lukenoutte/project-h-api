# Project H API

This is an API using Node and Express for a simplified e-commerce project. The idea is to remove barriers and make it easier for users to set up a simple e-commerce 
store, with their own customized URL and an administration dashboard.

[**1. Architecture**](documentation/architecture.md)

[**2. Routes**](documentation/routes/routes.md)

## Install and Run

**1. Install the dependencies. For this, you will need node ">=20.0.0".**

```bash
npm install
```

**2. Create a ".env" file following the template of the [".env.example"](.env.exemple) file.**

Replace the variables "ACCESS_TOKEN_SECRET" and "REFRESH_TOKEN_SECRET" with SHA256 tokens.

**3. You'll need a Postgres database; create one and replace the "DATABASE_URL" variable.**

**4. Run the migrations to create the tables in the database.**

```bash
npm run migrate:up
```
**5. Run the project.**

```bash
npm run dev
```
