import {  Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import Playlist from "../../database/entity/Playlist";
import {getConnection} from "typeorm";

export default async (req: Request, res: Response) => {
    const authorization = req.headers['authorization'];
    const id = req.body.id;
    if (!authorization) {
      res.status(400).send({ "data": null, "message": "invalid access token" });
    } else {
      const token = authorization.split(' ')[1];// barer 빼고 토큰만 가져오기 
      const data: any = jwt.verify(JSON.parse(token), process.env.ACCESS_SECRET);//토큰 유효한지 확인하는 작업 verify 토큰 내용 가져오기 
    
      await getConnection()
          .createQueryBuilder()
          .delete()
          .from(Playlist)
          .where("id = :id", { id: id })
          .execute();

        res.status(200).send({ "message": "Delete playlist Successfully"});
    }
}