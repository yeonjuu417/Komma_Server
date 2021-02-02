const dotenv = require('dotenv').config()

module.exports = {
   "type": "mysql",
   "host": process.env.DATABASE_HOST || "localhost",
   "port": process.env.DATABASE_PORT || 3306,
   "username": process.env.DATABASE_USERNAME || "root",
   "password": process.env.DATABASE_PASSWORD || "1234",
   "database": process.env.DATABASE_NAME || "Komma",
   "synchronize": false,
   "logging": false,
   "entities": [
      "src/database/entity/**/*.ts"
   ],
   "migrations": [
      "src/database/migration/**/*.ts"
   ],
   "seeds": [
      "src/database/seeder/**/*.ts"
   ],
   "factories": [
      "src/database/factories/**/*{.ts,.js}"
   ],
   "subscribers": [
      "src/database/subscriber/**/*.ts"
   ],
   "cli": {
      "entitiesDir": "src/database/entity",
      "migrationsDir": "src/database/migration",
      "subscribersDir": "src/database/subscriber"
   }
}