import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import User from "../../database/entity/User";
import { getConnection } from "typeorm";
import crypto from "crypto";

export default async (req: Request, res: Response) => {
  const authorization = req.headers['authorization'];
  const { username, password, darkMode, sitecolor } = req.body;

  if (!authorization) {
    res.status(400).send({ "data": null, "message": "invalid access token" });
  } else {
    
    const token = authorization.split(' ')[1];
    let data: any = jwt.verify(JSON.parse(token), process.env.ACCESS_SECRET);
       
  //사이트 배경색상
       if (sitecolor) {
        await getConnection()
          .createQueryBuilder()
          .update(User)
          .set({ siteColor: sitecolor })
          .where({ id: data.id })
          .execute();
        res.status(200).send({ "message": "update successfully" })
      }


    //이름수정
    if (username) { 
      await getConnection()
        .createQueryBuilder()
        .update(User)
        .set({ username: username })
        .where({ id: data.id })
        .execute();
      res.status(200).send({ "message": "update successfully" })
    }

    //비번수정
    if (password) {
      const createSalt: Function = () =>
        new Promise((resolve, reject) => {
          crypto.randomBytes(64, (err, buf) => {
            if (err) reject(err);
            resolve(buf.toString('base64'));
          });
        })
      const createHashedPassword: Function = (plainpassword) =>
        new Promise(async (resolve, reject) => {
          const salt = await createSalt();
          crypto.pbkdf2(plainpassword, salt, 1000, 64, 'sha512', (err, key) => {
            if (err) reject(err);
            resolve({ hashPwd: key.toString('base64'), salt });
          });
        });
      const { hashPwd, salt } = await createHashedPassword(password);
      await getConnection()
        .createQueryBuilder()
        .update(User)
        .set({ password: hashPwd, salt: salt })
        .where({ id: data.id })
        .execute();
      res.status(200).send({ "message": "update successfully" })
    }

    //다크모드
    if (darkMode) {
      await getConnection()
        .createQueryBuilder()
        .update(User)
        .set({ darkMode: darkMode })
        .where({ id: data.id })
        .execute();
      res.status(200).send({ "message": "update successfully" })
    }
  }
}

