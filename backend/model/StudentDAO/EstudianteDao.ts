import BD from "../../config/Connection";
import E_Students from "../../Entitity/E_Students";
import E_user from "../../Entitity/E_User";
//import I_user from "./../../Interfaces/I_students";

export default class EstudianteDAO {
  async createStudentDao(E: E_Students, Euser: E_user): Promise<any> {
    const sqlStudent: string =
      "call sp_crearEstudiante(?,?,?,?,?,?,?,?,?,?,?,?,?)";
    const sqlUser: string =
      "INSERT INTO tb_usuarios(usuario,contra,fecha_creacion,fecha_actualizacion)values(?,?,?,?)";
    const sqlObtainTheRowUser =
      "select * from tb_usuarios ORDER BY cod_user DESC LIMIT 1";

    //son 13 ddatos de entrada
    const Students: any[] = [];
    Students.push(E.getDoc_identidad());
    Students.push(E.getNombres());
    Students.push(E.getApellidos());
    Students.push(E.getSexos());
    Students.push(E.getFecha_nacimiento());
    Students.push(E.getDomicilio());
    Students.push(E.getCod_estado_civil());
    Students.push(E.getTelefono());
    Students.push(E.getCorreo_electronico());
    Students.push(E.getFecha_creacion());
    Students.push(E.getFecha_actu());
    Students.push(E.getImg_url());

    const Users: any[] = [];
    Users.push(Euser.getUsuario());
    Users.push(Euser.getContra());
    Users.push(Euser.getFecha_creacion());
    Users.push(Euser.getFecha_actualizacion());

    const pool = await BD.getConex();
    const cnn = await pool.getConnection();
    try {
      //En vez de usar beginTransaction ,usamos el query START TRANSACTION hace lo mismo
      //y directamente
      //empezamos la conexion
      await cnn.query("START TRANSACTION");
      //insert el usuario del estudiantecreado
      await cnn.query(sqlUser, Users);
      const lastRow: any[] = await cnn.query(sqlObtainTheRowUser);
      const coduser = lastRow[0][0].cod_user;
      //ultimo dato es codigo user
      Students.push(coduser);
      const rows: any[] = await cnn.execute(sqlStudent, Students);
      //commit todas las consultas
      await cnn.query("COMMIT");
      cnn.release();
      Students.splice(0);
      //retorno la cantidad de filas insertadas
      return rows[0].affectedRows;
    } catch (Error) {
      await cnn.query("ROLLBACK");
      cnn.release();
      return Promise.reject("Error en la insercion de estudiante :" + Error);
    }
  }

  //este metodo obtiene toda la informacion detallada
  //este tienes que mostrarlo en la tabla de personal de administracion
  async getAllInformationStudents(): Promise<any> {
    const sql = "CALL sp_obtenerTodaLaInfodelEstudiante()";
    const pool = await BD.getConex();
    const cnn = await pool.getConnection();
    try {
      const rowsUsers: any[] = await cnn.execute(sql);
      cnn.release();
      return rowsUsers[0][0];
    } catch (error) {
      cnn.release();
      return Promise.reject(
        "Error en la mostrar toda la informacion del estudiante :" + Error
      );
    }
  }

  async getStudentsByCodDao(E: E_Students): Promise<any> {
    const sql = "CALL sp_Obt_Estud_por_cod(?)";
    const pool = await BD.getConex();
    const cnn = await pool.getConnection();

    try {
      const rowsUsers: any[] = await cnn.execute(sql, [E.getCod_estudiante()]);
      cnn.release();
      return rowsUsers[0][0];
    } catch (error) {
      cnn.release();
      return Promise.reject(
        "Error en la mostrar toda la informacion del estudiante por codigo :" +
          Error
      );
    }
  }

  async getEstadoCivilDiferentThatDao(E: E_Students): Promise<any> {
    const sql = "SELECT * FROM tb_estado_civiles WHERE cod_est_civil <> ?";
    const pool = await BD.getConex();
    const cnn = await pool.getConnection();
    console.log(E.getCod_estado_civil());
    try {
      const rowsEstadoCivil: any[] = await cnn.query(sql, [
        E.getCod_estado_civil(),
      ]);
      cnn.release();
      return rowsEstadoCivil[0];
    } catch (error) {
      cnn.release();
      return Promise.reject(
        "Error dar estado civiles diferentes al brindado :" + Error
      );
    }
  }

  async UpdateStudentWithImgDao(E: E_Students) {
    const sql =
      "UPDATE tb_estudiantes SET dni=?, nombres=?,apellidos=?, sexos=?, fecha_nac=?, domicilio=?, estado_civil=?, telefono=?, correo_electronico=?, fecha_actu=?, img_url=? WHERE cod_estudiante=?";
    //son 13 datos de entrada
    const Students: any[] = [];
    Students.push(E.getDoc_identidad());
    Students.push(E.getNombres());
    Students.push(E.getApellidos());
    Students.push(E.getSexos());
    Students.push(E.getFecha_nacimiento());
    Students.push(E.getDomicilio());
    Students.push(E.getCod_estado_civil());
    Students.push(E.getTelefono());
    Students.push(E.getCorreo_electronico());
    Students.push(E.getFecha_actu());
    Students.push(E.getImg_url());
    Students.push(E.getCod_estudiante());
    const pool = await BD.getConex();
    const cnn = await pool.getConnection();
    try {
      const rowChanged: any[] = await cnn.execute(sql, Students);
      Students.splice(0);
      //liberar la conexion
      cnn.release();
      //retorno la cantidad de filas actualizadas
      return rowChanged[0].changedRows;
    } catch (Error) {
      Students.splice(0);
      cnn.release();
      return Promise.reject(
        "Error en la actualización de estudiante con Imagen :" + Error
      );
    }
  }

  async UpdateStudentWithoutImgDao(E: E_Students) {
    const sql =
      "UPDATE tb_estudiantes SET dni=?, nombres=?,apellidos=?, sexos=?, fecha_nac=?, domicilio=?, estado_civil=?, telefono=?, correo_electronico=?, fecha_actu=? WHERE cod_estudiante=?";
    //son 13 datos de entrada
    const Students: any[] = [];
    Students.push(E.getDoc_identidad());
    Students.push(E.getNombres());
    Students.push(E.getApellidos());
    Students.push(E.getSexos());
    Students.push(E.getFecha_nacimiento());
    Students.push(E.getDomicilio());
    Students.push(E.getCod_estado_civil());
    Students.push(E.getTelefono());
    Students.push(E.getCorreo_electronico());
    Students.push(E.getFecha_actu());
    Students.push(E.getCod_estudiante());
    const pool = await BD.getConex();
    const cnn = await pool.getConnection();
    try {
      const rowChanged: any[] = await cnn.execute(sql, Students);
      Students.splice(0);
      //liberar la conexion
      cnn.release();
      //retorno la cantidad de filas actualizadas
      return rowChanged[0].changedRows;
    } catch (Error) {
      Students.splice(0);
      cnn.release();
      return Promise.reject(
        "Error en la actualización de estudiante sin Imagen:" + Error
      );
    }
  }

  async InactiveStudentDao(E: E_Students) {
    const sql =
      "UPDATE tb_estudiantes SET fecha_actu=?, estado=? WHERE cod_estudiante=?";
    const Students: any[] = [];
    Students.push(E.getFecha_actu());
    Students.push(E.getEstado());
    Students.push(E.getCod_estudiante());
    const pool = await BD.getConex();
    const cnn = await pool.getConnection();
    try {
      const rowChanged: any[] = await cnn.execute(sql, Students);
      Students.splice(0);
      cnn.release();
      return rowChanged[0].changedRows;
    } catch (error) {
      Students.splice(0);
      cnn.release();
      return Promise.reject(
        "Error en la inactivacion de un estudiante:" + Error
      );
    }
  }

  async BusquedaxDniOUsuarioDao(E: E_Students) {
    const sql = "CALL sp_buscarxUsuarioODni(?,?,?)";
    const Students: any[] = [];
    Students.push(E.getDoc_identidad());
    Students.push(E.getCod_user());
    Students.push(E.getEstado());
    const pool = await BD.getConex();
    const cnn = await pool.getConnection();
    try {
      const rowsUsers: any[] = await cnn.execute(sql, Students);
      cnn.release();
      return rowsUsers[0][0];
    } catch (error) {
      Students.splice(0);
      cnn.release();
      return Promise.reject(
        "Error en la Busqueda por codigo o Usuario de estudiante sin Imagen:" +
          Error
      );
    }
  }
}
