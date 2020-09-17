import { Request, Response } from "express";
import E_user from "../../Entitity/E_User";
import UserDAO from "../../model/UserDAO/UserDAO";
import Security from "../../Security/Security";
import Validation from "../../validation/Validation";

export default class UserController {
  private userdao: UserDAO;
  constructor() {
    this.userdao = new UserDAO();
  }

  async LoginPersonal(req: Request, res: Response) {
    const e_user = new E_user();
    e_user.setUsuario(req.body.usuario);
    const cod_rol = req.body.cod_rol;
    try {
      const usuario = await this.userdao.LoginPersonalDao(e_user, cod_rol);
      if (typeof usuario === "undefined" || usuario === null) {
        res.status(404).json({ code: 404, msg: "No existe el usuario" });
      } else {
        const valido = await Security.Description(
          req.body.contra,
          usuario.contra
        );
        req.body.cod_user = usuario.cod_personal;

        if (valido) {
          if (cod_rol == 2) {
            const token = Validation.signToken(req, res);
            console.log(token);
            res.header("athorazation", token).status(200).json({
              code: 200,
              msg: "Docente Logueado",
              token: token,
              nextPage: "docente.html",
            });
          }
          if (cod_rol == 1) {
            const token = Validation.signToken(req, res);
            console.log(token);
            res.header("athorazation", token).status(200).json({
              code: 200,
              msg: "Administrador Logueado",
              token: token,
              nextPage: "admin.html",
            });
          }
        } else {
          res
            .status(400)
            .json({ code: 400, msg: "La contraseña es incorrecta" });
        }
      }
    } catch (error) {
      res
        .status(500)
        .json({ code: 500, msg: "Error en LoginPersonalDao" + error });
    }
  }

  async LoginEstudiante(req: Request, res: Response) {
    const e_user = new E_user();
    e_user.setUsuario(req.body.usuario);
    try {
      const usuario = await this.userdao.LoginEstudianteDao(e_user);
      if (typeof usuario === "undefined" || usuario === null) {
        res.status(404).json({
          code: 404,
          msg: "No existe ese usuario con el rol de estudiante ",
        });
      } else {
        const valido = await Security.Description(
          req.body.contra,
          usuario.contra
        );
        if (valido) {
          const token = Validation.signToken(req, res);
          console.log(token);
          res.status(200).json({
            code: 200,
            msg: "Estudiante Logueado",
            token: token,
            nextPage: "estudiante.html",
          });
        } else {
          res
            .status(400)
            .json({ code: 400, msg: "La contraseña es incorrecta" });
        }
      }
    } catch (error) {
      res
        .status(500)
        .json({ code: 500, msg: "Error LoginEstudiante : " + error });
    }
  }
}
