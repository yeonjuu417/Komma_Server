import {  Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { getConnection } from "typeorm";
import User from "../../database/entity/User";
import Playlist from "../../database/entity/Playlist";

export default async (req: Request, res: Response) => {
    const authorization = req.headers['authorization'];
    const title = req.body.title;

    if (!authorization) {
        res.status(400).send({ "data": null, "message": "invalid access token" });
      } else {
        const token = authorization.split(' ')[1];// barer 빼고 토큰만 가져오기 
        const data: any = jwt.verify(JSON.parse(token), process.env.ACCESS_SECRET);//토큰 유효한지 확인하는 작업 verify 토큰 내용 가져오기 

        // await getManager()
        // .createQueryBuilder(User, "user")
        // .innerJoinAndSelect("user.playlists", "playlist")
        // .update(Playlist)
        // .set({ title: title })
        // .where("user.id = :id", { id: data.id})
        // .execute();
        console.log(data.id)
        await getConnection()
        .createQueryBuilder()
        .update(Playlist)
        .set({ title: title })
        .where("userId = :id", { id: data.id })
        .execute();
        res.status(302).send({ "message": "update successfully" })
    }
}