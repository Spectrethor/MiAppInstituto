import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";

interface Ipayload {
  user: string;
  iat: number;
  exp: number;
}

export default class Validation {
  static signToken(req: Request, res: Response): string {
    dotenv.config();
    let token = "";
    const payload = {
      cod_personal: req.body.cod_user,
      user: req.body.usuario,
      cod_rol: req.body.cod_rol,
    };
    //tiempo de expriacion 30 segundos
    token = jwt.sign(payload, process.env.SECRET_KEY || "GhostOfThushima");

    return token;
  }

  static verifyToken(req: Request, res: Response, next: NextFunction) {
    dotenv.config();
    const tokenToCompare = req.header("Authorization");
    try {
      if (tokenToCompare) {
        //tiempo de expriacion 30 segundos
        const payload = jwt.verify(
          tokenToCompare,
          process.env.SECRET_KEY || "GhostOfThushima"
        ) as Ipayload;

        console.log(payload);
        req.tokenUser = payload;
        next();
      } else {
        res.status(400).json({ code: 400, msg: "Acceso denegado" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ err: "Error sucedido en la verificacion :" + error });
    }
  }
}
