import multer, { StorageEngine } from "multer";
import { Request, Response } from "express";
import path from "path";
export default class Imagen {
  //middleware
  static multerOptions(req: Request, res: Response, cb: Function) {
    multer({
      storage: multer.diskStorage({
        destination: path.join(__dirname, "./public/uploads"),
        filename: (req, file, cb) => {
          cb(
            null,
            new Date().getTime() +
              path.extname(file.originalname).toLocaleLowerCase()
          );
        },
      }),
      limits: { fileSize: 1000000 },
      fileFilter: (req, file, cb) => {
        this.checkfile(file, cb);
      },
    }).single("foto");
  }

  static checkfile(file: Express.Multer.File, cb: Function) {
    const filestype = /jpeg|jpg|png/;
    const extname = filestype.test(
      path.extname(file.originalname).toLocaleLowerCase()
    );
    const mimetype = filestype.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      return cb("Error : Images only");
    }
  }
}
