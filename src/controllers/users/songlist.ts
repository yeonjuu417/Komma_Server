import { Request, Response } from "express";
import { getManager } from "typeorm";
import Songlist from "../../database/entity/Songlist";

export default async (req: Request, res: Response) => {
  await getManager()
  .createQueryBuilder(Songlist, "Songlist")
  .getMany()
  .then(data => {
    res.status(200).send({ "songlist": data })})
}