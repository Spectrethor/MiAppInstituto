import { Router } from "express";

import UserController from "./../../controller/UserController/UserController";

export default class UserRoutes {
  private rutas: Router;
  private UControl: UserController;

  constructor() {
    this.rutas = Router();
    this.UControl = new UserController();
  }

  rutasUsuario(): Router {
    this.rutas.post("/usuario/loginpersonal", (req, res) => {
      this.UControl.LoginPersonal(req, res);
    });
    this.rutas.post("/usuario/loginestudiante", (req, res) => {
      this.UControl.LoginEstudiante(req, res);
    });

    this.rutas.get("/", (req, res) => {
      res.send("ola madre y eli");
    });

    return this.rutas;
  }
}
