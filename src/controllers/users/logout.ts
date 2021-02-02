import { NextFunction, Request, Response } from "express";

export default async (req: Request, res: Response): Promise<void | Response> => {
  const authorization = req.headers['authorization'];

  if (!authorization) {
    res.status(400).json({ data: null, message: 'not authorized' });
  } else {
    //req.cookies.set('access_token');
    res.cookie("x_auth", "")
    res.status(205).json({ data: null, message: 'Logout successfully' });
  }
}