import { Request, Response } from "express";
import { getConnection, getManager } from "typeorm";
import User from "../../database/entity/User";
import crypto from "crypto";

export default async (req: Request, res: Response) => {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    res.status(422).send({ message: "insufficient parameters supplied" });
  }
  const isemail = await getManager()
    .createQueryBuilder(User, "User")
    .where({ email: email })
    .getOne();

  if (isemail) {
    res.status(409).send({ message: "email exists" });
  } else {
    const createSalt: Function = () =>
      new Promise((resolve, reject) => {
        crypto.randomBytes(64, (err, buf) => {
          if (err) reject(err);
          resolve(buf.toString("base64"));
        });
      });
    const createHashedPassword: Function = (plainpassword) =>
      new Promise(async (resolve, reject) => {
        const salt = await createSalt();
        crypto.pbkdf2(plainpassword, salt, 1000, 64, "sha512", (err, key) => {
          if (err) reject(err);
          resolve({ hashPwd: key.toString("base64"), salt });
        });
      });
    const { hashPwd, salt } = await createHashedPassword(password);
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({
        email: email,
        password: hashPwd,
        username: username,
        darkMode: false,
        siteColor: "blue",
        salt: salt,
      })
      .execute();
    res.status(201).send({ message: "Sign successfully" });
  }
};
