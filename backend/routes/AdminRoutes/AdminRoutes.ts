import { Router } from "express";
import multer from "multer";
import path from "path";
import AdminController from "./../../controller/AdminController/AdminController";
import V from "../../validation/Validation";
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../../public/images"),
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().getTime() + path.extname(file.originalname).toLocaleLowerCase()
    );
  },
});

const subida = multer({
  storage,
  limits: { fileSize: 1000000 },

  fileFilter: (req, file, cb) => {
    checkfile(file, cb);
  },
}).single("foto");

function checkfile(file: Express.Multer.File, cb: Function) {
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
export default class AdminRoutes {
  private router: Router;
  private Acontroller: AdminController;

  constructor() {
    this.router = Router();
    this.Acontroller = new AdminController();
  }

  public rutasCrudEstudiantes(): Router {
    //routes Students
    this.router.post("/student", V.verifyToken, (req, res) => {
      subida(req, res, (err: any) => {
        if (err) {
          if (typeof err == "string") {
            res.status(500).json({ code: 500, msg: err });
          } else {
            res.status(500).json({ code: 500, msg: err.message });
          }
        } else {
          this.Acontroller.createStudent(req, res);
        }
      });
    });

    this.router.post("/student/:cod_user", V.verifyToken, (req, res) => {
      this.Acontroller.getStudentByCod(req, res);
    });

    this.router.post(
      "/student/EstadoCivil/:cod_estado_civil",
      V.verifyToken,
      (req, res) => {
        this.Acontroller.getEstadoCivilDiferentThat(req, res);
      }
    );

    this.router.post(
      "/student/busqueda/DniOUsuario",
      V.verifyToken,
      (req, res) => {
        this.Acontroller.BusquedaxDniOUsuario(req, res);
      }
    );

    this.router.put("/student", V.verifyToken, (req, res) => {
      subida(req, res, (err: any) => {
        if (err) {
          if (typeof err == "string") {
            res.status(500).json({ code: 500, msg: err });
          } else {
            res.status(500).json({ code: 500, msg: err.message });
          }
        } else {
          this.Acontroller.UpdateStudentWithImg(req, res);
        }
      });
    });

    this.router.put("/student/sinImg", V.verifyToken, (req, res) => {
      this.Acontroller.UpdateStudentWithoutImg(req, res);
    });

    this.router.get("/student", V.verifyToken, (req, res) => {
      this.Acontroller.getAllInfoStudents(req, res);
    });

    this.router.delete("/student/:cod_user", V.verifyToken, (req, res) => {
      this.Acontroller.InactiveStudent(req, res);
    });

    return this.router;
  }

  public rutasCrudPersonal(): Router {
    this.router.post("/personal", V.verifyToken, async (req, res) => {
      await this.Acontroller.crearPersonal(req, res);
    });

    this.router.put("/personal", V.verifyToken, async (req, res) => {
      await this.Acontroller.actualizarPersonal(req, res);
    });

    this.router.get("/personal", V.verifyToken, async (req, res) => {
      await this.Acontroller.obtenerTodoElPersonal(req, res);
    });

    this.router.delete(
      "/personal/:cod_personal",
      V.verifyToken,
      async (req, res) => {
        await this.Acontroller.inactivarPersonal(req, res);
      }
    );

    this.router.get(
      "/personal/:codPersonal",
      V.verifyToken,
      async (req, res) => {
        await this.Acontroller.obtenerPersonalxCod(req, res);
      }
    );

    this.router.get(
      "/personal/estadocivil/:cod_estado_civil",
      V.verifyToken,
      async (req, res) => {
        await this.Acontroller.getEstadoCivilDiferentThat(req, res);
      }
    );

    this.router.get(
      "/personal/rol/:codRol",
      V.verifyToken,
      async (req, res) => {
        await this.Acontroller.obtenerRolDiferente(req, res);
      }
    );

    this.router.post(
      "/personal/busqueda/DniOUsuario",
      V.verifyToken,
      async (req, res) => {
        await this.Acontroller.obtenerPersonalxDnioUsuario(req, res);
      }
    );

    return this.router;
  }

  public rutasCrudProgramacion(): Router {
    this.router.get("/programacion/carreras", (req, res) => {
      this.Acontroller.obtenerCarreras(req, res);
    });

    this.router.get("/programacion/modulos", (req, res) => {
      this.Acontroller.obtenerModulos(req, res);
    });

    this.router.get("/programacion/turnos", (req, res) => {
      this.Acontroller.obtenerTurnos(req, res);
    });

    this.router.get("/programacion/aulas", (req, res) => {
      this.Acontroller.obtenerAulas(req, res);
    });

    this.router.get("/programacion/profesores", (req, res) => {
      this.Acontroller.obtenerProfesores(req, res);
    });

    this.router.post("/programacion/filtradocursos", (req, res) => {
      this.Acontroller.obtenerFiltradoCursos(req, res);
    });

    return this.router;
  }

  public rutasInscripciones(): Router {
    this.router.post("/inscripcion/usuario", async (req, res) => {
      await this.Acontroller.BusquedaXEstudiantexUsuario(req, res);
    });

    this.router.post("/inscripcion/mesyanio", async (req, res) => {
      await this.Acontroller.BusquedaProgramacionPorMesAnio(req, res);
    });

    this.router.post("/inscripcion/mesyanio/turno", async (req, res) => {
      await this.Acontroller.llenarTurnoDistintos(req, res);
    });

    this.router.post("/inscripcion/mesyanio/carreras", async (req, res) => {
      await this.Acontroller.llenarCarreraNoRepetidas(req, res);
    });

    this.router.post("/inscripcion", V.verifyToken, async (req, res) => {
      await this.Acontroller.CrearProgramacion(req, res);
    });

    return this.router;
  }

  public rutasPagos(): Router {
    this.router.post("/pagos", V.verifyToken, (req, res) => {
      this.Acontroller.registrarPago(req, res);
    });

    this.router.post("/pagos/filtrar/estado", V.verifyToken, (req, res) => {
      this.Acontroller.filtrarInscripcionesxEstado(req, res);
    });

    this.router.post(
      "/pagos/filtrar/usuarioyestado",
      V.verifyToken,
      (req, res) => {
        this.Acontroller.filtrarInscripcionesxUsuarioyEstado(req, res);
      }
    );

    return this.router;
  }

  /*public rutasPruebas(): Router {
    this.router.post("/api/estudiantesPrueba", (req, res) => {
      console.log(req.body);

      res.json({ code: 200, listaPersona: req.body.listaPersona });
    });
    return this.router;
  }*/
}
