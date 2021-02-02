import "reflect-metadata";
import express from "express";
import session from "express-session";
import cors from "cors";
import logger from "morgan";
import bodyParser from "body-parser";
import { createConnection } from "typeorm";
import "dotenv/config";
const usersRouter = require('./routes/user');

createConnection()
  .then(() => console.log("typeorm connection complete"))
  .catch((error) => console.log("TypeORM connection error: ", error));

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  cors({
    origin: ['http://kommaproject.s3-website.ap-northeast-2.amazonaws.com','http://komma.co.kr.s3-website.ap-northeast-2.amazonaws.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    credentials: true,
  })
);

app.use(
  session({
    secret: '@codestates',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 6 * 60 * 10000,
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    }
  }));

app.get('/', (req, res) => {
  res.status(200).send('Success');
});

app.use('/users', usersRouter);
app.use('/sounds', express.static('./src/sounds'));

const PORT = 2527;

app.listen(PORT, () => {
  console.log(`Server is Running : Port ${PORT}`);
});

module.exports = app;
