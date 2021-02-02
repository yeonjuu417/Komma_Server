import { Request, Response } from "express";
import { getManager } from "typeorm";
import User from "../../database/entity/User";
import crypto from "crypto";
import "dotenv/config";
import jwt from 'jsonwebtoken'

export default async (req: Request, res: Response) => {

  const email: string = req.body.email;
  const password: string = req.body.password;

  const user = await getManager()
    .createQueryBuilder(User, "User")
    .where({ email: email })
    .getOne();

  if (!user) {
    res.status(400).send({ data: null, message: "not authorized" })
  } else {
    const { salt } = user;

    const createHashedPassword = (plainpassword: string) =>
      new Promise(async (resolve, reject) => {
        crypto.pbkdf2(plainpassword, salt, 1000, 64, 'sha512', (err, key) => {
          if (err) reject(res.status(400).send({ message: "hashPwd exists" }));
          resolve(key.toString('base64'));
        });
      });
    const hashPwd = await createHashedPassword(password);

    const userInfo = await getManager()
      .createQueryBuilder(User, "User")
      .where({ password: hashPwd })
      .getOne()
      
      if(!userInfo){
        res.status(400).send({ data: null, message: "Passwords do not match" })
      }else{
        const accessToken = jwt.sign(
          {
            'id': userInfo.id,
            'username': userInfo.username,
            'email': userInfo.email,
            'darkMode': false,
            'siteColor': "random",
          },
          process.env.ACCESS_SECRET,
          { expiresIn: '1d' });//하루 뒤 파괴
        res.send({ accessToken: accessToken, message: "Login successfully" })
      }
    
  }

};