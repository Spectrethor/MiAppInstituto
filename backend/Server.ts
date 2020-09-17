//importaciones
import express, { Application } from "express";
import cors from "cors";
import path from "path";
import morgan from "morgan";
import UserRoutes from "./routes/UserRoutes/UserRoutes";
import AdminRoutes from "./routes/AdminRoutes/AdminRoutes";

export default class Server {
  private static app: Application = express();
  private static port: string | number = process.env.PORT || 3000;

  public static main(): void {
    this.settings();
    this.middlewares();
    this.router();
    this.filesStatic();
    this.listen();
  }

  private static settings(): void {
    //settings
    this.app.set("views", path.join(__dirname, "views"));
    this.app.set("view engine", "ejs");
  }

  private static middlewares(): void {
    //middlewares
    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    //this.app.use(express.urlencoded({ extended: false }));
  }

  private static router(): void {
    //routes
    this.app.use(new AdminRoutes().rutasCrudEstudiantes());
    this.app.use(new AdminRoutes().rutasCrudPersonal());
    this.app.use(new AdminRoutes().rutasCrudProgramacion());
    this.app.use(new AdminRoutes().rutasInscripciones());
    this.app.use(new UserRoutes().rutasUsuario());
    this.app.use(new AdminRoutes().rutasPagos());
    //this.app.use(new AdminRoutes().rutasPruebas());
  }

  private static filesStatic(): void {
    //express static
    this.app.use(express.static(path.join(__dirname, "public")));
  }

  private static listen(): void {
    //star server
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}
