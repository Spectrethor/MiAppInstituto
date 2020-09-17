import E_Inscripciones from "../../Entitity/E_Inscripciones";
import E_students from "./../../Entitity/E_Students";
import E_Personal from "../../Entitity/E_Personal";
import E_user from "./../../Entitity/E_User";
import E_pagos from "../../Entitity/E_Pagos";
import Security from "./../../Security/Security";
import EstudianteDao from "../../model/StudentDAO/EstudianteDao";
import PersonalDao from "../../model/PersonalDao/PersonalDao";
import ProgramacionDao from "../../model/ProgramacionDao/ProgramacionDao";
import InscripcionesDao from "../../model/InscripcionesDao/InscripcionesDao";
import PagosDao from "../../model/PagosDao/PagosDao";

import e, { Request, Response } from "express";
export default class AdminController {
  private estudiantesDao: EstudianteDao;
  private personalDao: PersonalDao;
  private programacionDao: ProgramacionDao;
  private inscripcionDao: InscripcionesDao;
  private pagosDao: PagosDao;
  generarCodigo(): number {
    const codigoGenerado: number = Math.floor(Math.random() * 100000000) + 1;
    return codigoGenerado;
  }

  constructor() {
    this.pagosDao = new PagosDao();
    this.programacionDao = new ProgramacionDao();
    this.estudiantesDao = new EstudianteDao();
    this.personalDao = new PersonalDao();
    this.inscripcionDao = new InscripcionesDao();
  }
  ////////
  //ESTUDIANTES
  //Crea un estudiante pero antes tiene que crear un usuario
  //que luego lo va poder cambiar
  async createStudent(req: Request, res: Response) {
    //esta objetos se crean cada vez que se haga la llamada osea tiene sentido
    const Estudent = new E_students();
    const Euser = new E_user();
    ///////////
    //creamos un estudiante
    Estudent.setDoc_identidad(req.body.doc_identidadRegistro);
    Estudent.setNombres(req.body.nombresRegistro);
    Estudent.setApellidos(req.body.apellidosRegistro);
    Estudent.setFecha_nacimiento(req.body.fecha_nacRegistro);
    Estudent.setDomicilio(req.body.domicilioRegistro);
    Estudent.setTelefono(req.body.telefonoRegistro);
    Estudent.setCorreo_electronico(req.body.correo_electronicoRegistro);
    Estudent.setCod_estado_civil(req.body.estado_civilRegistro);
    Estudent.setSexos(req.body.sexoRegistro);
    Estudent.setImg_url("/images/" + req.file.filename);
    ///////////
    //creamos un usuario
    Euser.setUsuario(this.generarCodigo().toString());
    //contraseña por defecto 123
    const password = await Security.Encription("123");
    Euser.setContra(password);
    ///////////
    try {
      const resultado = await this.estudiantesDao.createStudentDao(
        Estudent,
        Euser
      );
      if (resultado > 0) {
        res.status(200).json({ code: 200, msg: "Usuario creado" });
      }
    } catch (error) {
      res.status(400).json({ code: 500, msg: error });
    }
  }

  async getStudentByCod(req: Request, res: Response) {
    const Estudent = new E_students();
    Estudent.setCod_estudiante(parseInt(req.params.cod_user));
    try {
      const data = await this.estudiantesDao.getStudentsByCodDao(Estudent);
      res.status(200).json({ code: 200, msg: data });
    } catch (error) {
      res.status(500).json({ code: 500, msg: error });
    }
  }

  async getAllInfoStudents(req: Request, res: Response) {
    try {
      const data = await this.estudiantesDao.getAllInformationStudents();
      res.status(200).json({ code: 200, msg: data });
    } catch (error) {
      res.status(500).json({ code: 500, msg: error });
    }
  }

  async getEstadoCivilDiferentThat(req: Request, res: Response) {
    const Estudent = new E_students();
    Estudent.setCod_estado_civil(req.params.cod_estado_civil);
    try {
      const data = await this.estudiantesDao.getEstadoCivilDiferentThatDao(
        Estudent
      );
      res.status(200).json({ code: 200, msg: data });
    } catch (error) {
      res.status(500).json({ code: 500, msg: error });
    }
  }

  async UpdateStudentWithImg(req: Request, res: Response) {
    const Estudent = new E_students();
    try {
      //creamos un estudiante
      Estudent.setCod_estudiante(req.body.cod_user);
      Estudent.setDoc_identidad(req.body.doc_identidad);
      Estudent.setNombres(req.body.nombres);
      Estudent.setApellidos(req.body.apellidos);
      Estudent.setFecha_nacimiento(req.body.fecha_nac);
      Estudent.setDomicilio(req.body.domicilio);
      Estudent.setTelefono(req.body.telefono);
      Estudent.setCorreo_electronico(req.body.correo_electronico);
      Estudent.setCod_estado_civil(req.body.estado_civil);
      Estudent.setSexos(req.body.sexos);
      console.log(req.file.filename);
      Estudent.setImg_url("/images/" + req.file.filename);

      const resultado = await this.estudiantesDao.UpdateStudentWithImgDao(
        Estudent
      );
      console.log(resultado);
      if (resultado > 0) {
        res.status(200).json({ code: 200, msg: "Usuario editado" });
      }
    } catch (error) {
      res.status(400).json({ code: 500, msg: error });
    }
  }

  async UpdateStudentWithoutImg(req: Request, res: Response) {
    const Estudent = new E_students();
    try {
      //creamos un estudiante
      Estudent.setCod_estudiante(req.body.cod_user);
      Estudent.setDoc_identidad(req.body.doc_identidad);
      Estudent.setNombres(req.body.nombres);
      Estudent.setApellidos(req.body.apellidos);
      Estudent.setFecha_nacimiento(req.body.fecha_nac);
      Estudent.setDomicilio(req.body.domicilio);
      Estudent.setTelefono(req.body.telefono);
      Estudent.setCorreo_electronico(req.body.correo_electronico);
      Estudent.setCod_estado_civil(req.body.estado_civil);
      Estudent.setSexos(req.body.sexos);
      const resultado = await this.estudiantesDao.UpdateStudentWithoutImgDao(
        Estudent
      );
      if (resultado > 0) {
        res.status(200).json({ code: 200, msg: "Usuario editado" });
      }
    } catch (error) {
      res.status(500).json({ code: 500, msg: error });
    }
  }

  async InactiveStudent(req: Request, res: Response) {
    const Estudent = new E_students();
    Estudent.setEstado(0);
    Estudent.setCod_estudiante(parseInt(req.params.cod_user));
    try {
      const resultado = await this.estudiantesDao.InactiveStudentDao(Estudent);
      if (resultado > 0) {
        res.status(200).json({ code: 200, msg: "Personal inactivado" });
      }
    } catch (error) {
      res.status(500).json({ code: 500, msg: error });
    }
  }

  async BusquedaxDniOUsuario(req: Request, res: Response) {
    const Estudent = new E_students();
    Estudent.setDoc_identidad(req.body.dni);
    Estudent.setCod_user(req.body.usuario);
    Estudent.setEstado(req.body.estadoUser);
    try {
      const resultado = await this.estudiantesDao.BusquedaxDniOUsuarioDao(
        Estudent
      );
      if (typeof resultado === "undefined") {
        res.status(400).json({
          code: 400,
          msg: "No hay concidencias con los datos brindados",
        });
      }
      res.status(200).json({ code: 200, msg: resultado });
    } catch (error) {
      res.status(500).json({ code: 500, msg: error });
    }
  }
  /////////////
  //PERSONAL
  async crearPersonal(req: Request, res: Response) {
    const e_personal = new E_Personal();
    const euser = new E_user();
    e_personal.setDoc_identidad(req.body.doc_identidadRegistro);
    e_personal.setNombres(req.body.nombresRegistro);
    e_personal.setApellidos(req.body.apellidosRegistro);
    e_personal.setSexos(req.body.sexoRegistro);
    e_personal.setFecha_nacimiento(req.body.fecha_nacRegistro);
    e_personal.setDomicilio(req.body.domicilioRegistro);
    e_personal.setCod_estado_civil(req.body.estado_civilRegistro);
    e_personal.setTelefono(req.body.telefonoRegistro);
    e_personal.setCorreo_electronico(req.body.correo_electronicoRegistro);
    e_personal.setCod_Rol(req.body.cod_rol);
    ///////////
    //creamos un usuario
    euser.setUsuario(this.generarCodigo().toString());
    //contraseña por defecto 123
    const password = await Security.Encription("123");
    euser.setContra(password);
    ///////////
    try {
      const resultado = await this.personalDao.crearPersonalDao(
        e_personal,
        euser
      );
      if (resultado > 0) {
        res.status(200).json({ code: 200, msg: "Personal registrado" });
      }
    } catch (error) {
      res.status(500).json({ code: 500, msg: error });
    }
  }

  async actualizarPersonal(req: Request, res: Response) {
    const e_personal = new E_Personal();
    try {
      e_personal.setCodpersonal(req.body.cod_personal);
      e_personal.setDoc_identidad(req.body.doc_identidad);
      e_personal.setNombres(req.body.nombres);
      e_personal.setApellidos(req.body.apellidos);
      e_personal.setSexos(req.body.sexos);
      e_personal.setFecha_nacimiento(req.body.fecha_nac);
      e_personal.setDomicilio(req.body.domicilio);
      e_personal.setCod_estado_civil(req.body.estado_civil);
      e_personal.setTelefono(req.body.telefono);
      e_personal.setCorreo_electronico(req.body.correo_electronico);
      e_personal.setCod_Rol(req.body.cod_rol);
      const resultado = await this.personalDao.actualizarPersonalDao(
        e_personal
      );
      if (resultado > 0) {
        res.status(200).json({ code: 200, msg: "Personal editado" });
      }
    } catch (error) {
      res.status(500).json({ code: 500, msg: error });
    }
  }

  async inactivarPersonal(req: Request, res: Response) {
    const e_personal = new E_Personal();
    e_personal.setCodpersonal(parseInt(req.params.cod_personal));
    e_personal.setEstado(0);
    try {
      const resultado = await this.personalDao.InactivarPersonalByCodDao(
        e_personal
      );
      if (resultado > 0) {
        res.status(200).json({ code: 200, msg: "Personal inactivado" });
      }
    } catch (error) {
      res.status(500).json({ code: 500, msg: error });
    }
  }

  async obtenerTodoElPersonal(req: Request, res: Response) {
    try {
      const data = await this.personalDao.ObtenertodoElPersonalDao();
      res.status(200).json({ code: 200, msg: data });
    } catch (error) {
      res.status(500).json({ code: 500, msg: error });
    }
  }

  async obtenerPersonalxCod(req: Request, res: Response) {
    const personal = new E_Personal();
    personal.setCodpersonal(parseInt(req.params.codPersonal));
    try {
      const data = await this.personalDao.ObtenertodoElPersonalByCodDao(
        personal
      );
      res.status(200).json({ code: 200, msg: data });
    } catch (error) {
      res.status(500).json({ code: 500, msg: error });
    }
  }

  async obtenerRolDiferente(req: Request, res: Response) {
    const personal = new E_Personal();
    personal.setCod_Rol(parseInt(req.params.codRol));
    try {
      const data = await this.personalDao.diferenteRolByCod(personal);
      console.log(data);
      res.status(200).json({ code: 200, msg: data });
    } catch (error) {
      res.status(500).json({ code: 500, msg: error });
    }
  }

  async obtenerPersonalxDnioUsuario(req: Request, res: Response) {
    const personal = new E_Personal();
    personal.setDoc_identidad(req.body.dni);
    personal.setCod_user(req.body.usuario);
    personal.setEstado(req.body.estadoUser);
    try {
      const data = await this.personalDao.ObtenerPersonalxDnioUsuarioDao(
        personal
      );
      res.status(200).json({ code: 200, msg: data });
    } catch (error) {
      res.status(500).json({ code: 500, msg: error });
    }
  }

  ///PROGRAMACION

  async obtenerCarreras(req: Request, res: Response) {
    try {
      const data = await this.programacionDao.obtenerCarrerasDao();
      res.status(200).json({ code: 200, msg: data });
    } catch (error) {
      res.status(500).json({ code: 500, msg: error });
    }
  }

  async obtenerModulos(req: Request, res: Response) {
    try {
      const data = await this.programacionDao.obtenerModulosDao();
      res.status(200).json({ code: 200, msg: data });
    } catch (error) {
      res.status(500).json({ code: 500, msg: error });
    }
  }

  async obtenerCodMalla(req: Request, res: Response) {
    const { cod_carrera, cod_modulo, cod_curso } = req.body;
    try {
      const data = await this.programacionDao.ObtenerCodMallaCurricular(
        cod_carrera,
        cod_modulo,
        cod_curso
      );
      res.status(200).json({ code: 200, msg: data });
    } catch (error) {
      res.status(500).json({ code: 500, msg: error });
    }
  }

  async obtenerFiltradoCursos(req: Request, res: Response) {
    const { cod_carrera, cod_modulo } = req.body;
    try {
      const data = await this.programacionDao.ObtenerCursosFiltradosDao(
        cod_carrera,
        cod_modulo
      );

      res.status(200).json({ code: 200, msg: data });
    } catch (error) {
      console.log(error);
      res.status(500).json({ code: 500, msg: error });
    }
  }

  async obtenerProfesores(req: Request, res: Response) {
    try {
      const data = await this.programacionDao.ObtenerProfesoresDao();
      res.status(200).json({ code: 200, msg: data });
    } catch (error) {
      res.status(500).json({ code: 500, msg: error });
    }
  }

  async obtenerTurnos(req: Request, res: Response) {
    try {
      const data = await this.programacionDao.ObtenerTurnosDao();
      res.status(200).json({ code: 200, msg: data });
    } catch (error) {
      res.status(500).json({ code: 500, msg: error });
    }
  }

  async obtenerAulas(req: Request, res: Response) {
    try {
      const data = await this.programacionDao.ObtenerAulasDao();
      res.status(200).json({ code: 200, msg: data });
    } catch (error) {
      res.status(500).json({ code: 500, msg: error });
    }
  }

  async CrearProgramacion(req: Request, res: Response) {
    const { cod_personal } = req.tokenUser;
    const E_user = new E_Inscripciones();
    E_user.setCod_generado(this.generarCodigo());
    E_user.setCod_estudiante(req.body.cod_estudiante);
    E_user.setCod_programacion(req.body.cod_programacion);
    E_user.setCod_personal(cod_personal);

    try {
      const codgenerado = await this.inscripcionDao.CrearInscripcionDao(E_user);
      if (typeof codgenerado != "undefined") {
        res.status(200).json({
          code: 200,
          msg: `Se creo la inscripción y su codigo es ${codgenerado}`,
        });
      }
    } catch (error) {
      res.status(500).json({ code: 500, msg: error });
    }
  }

  /////////////////////////////////////////////////////////////
  //////////////INSCRIPCION
  async BusquedaProgramacionPorMesAnio(req: Request, res: Response) {
    const { anio, mes } = req.body;
    try {
      const data = await this.inscripcionDao.BusquedaProgramacionPorMesAnioDao(
        anio,
        mes
      );
      res.status(200).json({ code: 200, msg: data });
    } catch (error) {
      console.log(error);
      res.status(500).json({ code: 500, msg: error });
    }
  }

  async llenarTurnoDistintos(req: Request, res: Response) {
    const { anio, mes } = req.body;
    try {
      const data = await this.inscripcionDao.llenarTurnoDistintosDao(anio, mes);
      res.status(200).json({ code: 200, msg: data });
    } catch (error) {
      console.log(error);
      res.status(500).json({ code: 500, msg: error });
    }
  }

  async llenarCarreraNoRepetidas(req: Request, res: Response) {
    const { anio, mes } = req.body;
    try {
      const data = await this.inscripcionDao.llenarCarreraNoRepetidasDao(
        anio,
        mes
      );
      res.status(200).json({ code: 200, msg: data });
    } catch (error) {
      console.log(error);
      res.status(500).json({ code: 500, msg: error });
    }
  }

  async BusquedaXEstudiantexUsuario(req: Request, res: Response) {
    const User = new E_user();

    User.setUsuario(req.body.usuario);
    try {
      const data = await this.inscripcionDao.BusquedaXEstudiantexUsuarioDao(
        User
      );
      res.status(200).json({ code: 200, msg: data });
    } catch (error) {
      console.log(error);
      res.status(500).json({ code: 500, msg: error });
    }
  }

  /////PAGOS
  //////////////////////////
  async registrarPago(req: Request, res: Response) {
    const { cod_personal } = req.tokenUser;
    const e_pagos = new E_pagos();
    e_pagos.setNroRecibo(this.generarCodigo());
    e_pagos.setCod_inscripcion(req.body.cod_inscripcion);
    e_pagos.setPago_realizado(req.body.total);
    e_pagos.setTotal(req.body.total);
    e_pagos.setCod_personal(cod_personal);
    console.log(req.body);
    try {
      const rows = await this.pagosDao.registrarPagoDao(e_pagos);
      if (rows > 0) {
        res.status(200).json({
          code: 200,
          msg: `Se registro el pago`,
        });
      }
    } catch (error) {
      res.status(500).json({ code: 500, msg: error });
    }
  }

  async filtrarInscripcionesxEstado(req: Request, res: Response) {
    //estado pendiente 0 y cancelado 1
    const e_inscripciones = new E_Inscripciones();
    e_inscripciones.setEstado(req.body.estado);
    try {
      const rows = await this.pagosDao.filtrarInscripcionesxEstadoDao(
        e_inscripciones
      );
      res.status(200).json({ code: 200, msg: rows });
    } catch (error) {
      console.log(error);
      res.status(500).json({ code: 500, msg: error });
    }
  }

  async filtrarInscripcionesxUsuarioyEstado(req: Request, res: Response) {
    try {
      const rows = await this.pagosDao.filtrarInscripcionesxUsuarioyEstadoDao(
        req.body.usuario,
        req.body.estado
      );
      res.status(200).json({ code: 200, msg: rows });
    } catch (error) {
      console.log(error);
      res.status(500).json({ code: 500, msg: error });
    }
  }
}
