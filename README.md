# ecommerce-api
This is the assignment on the E-commerce API. Access the swagger at /docs

## Dependencies
- Use PostgreSQL database
- Use prisma 
- ENV constains:
  - PORT (A port the app will be exposed on)
  - PRIVATE_KEY (For JWT and auth token creation and comparison)
  - DATABASE_URL (For prisma cleint to connect to db e.g. postgresql://[user]:[PASS]@localhost:5432/assignment?schema=public)


## Start
To run the application:
- Run the db.sql file attched to generate the database schemas
- Run npm install
- Run npx prisma db pull
- Run npx prisma generate
- Run npm start
