import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { getManager, createConnection, AdvancedConsoleLogger } from "typeorm";
import { User, Playlist, Savesong } from "../../database/entity";

export default async (req: Request, res: Response) => {
  const { title, savesongs, icon } = req.body;

  const addPlayListId = function (param: number) {
    return savesongs.map(savesong => {
      savesong.playlist = param;
    })
  }

  const authorization = req.headers['authorization'];
  
  if (!authorization) {
    res.status(400).send({ "data": null, "message": "invalid access token" });
  } else {
    const token = authorization.split(' ')[1];// barer 빼고 토큰만 가져오기 
    const data: any = jwt.verify(JSON.parse(token), process.env.ACCESS_SECRET);//토큰 유효한지 확인하는 작업 verify 토큰 내용 가져오기 

    await getManager()
      .createQueryBuilder()
      .insert()
      .into(Playlist)
      .values({
        title: title,
        icon: icon,
        user: data.id
      })
      .execute()
      .then(data => {
        addPlayListId(data.identifiers[0].id);
        getManager()
          .createQueryBuilder()
          .insert()
          .into(Savesong)
          .values(savesongs)
          .execute()
      })

    res.status(200).send({ message: "Save playList Successfully" })
  }
}
