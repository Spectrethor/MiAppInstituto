import E_personal from "../../Entitity/E_Personal";
import E_user from "./../../Entitity/E_User";
import BD from "./../../config/Connection";

export default class PersonalDao {
  async crearPersonalDao(P: E_personal, Euser: E_user): Promise<any> {
    const sqlPersonal: string =
      "call sp_crearPersonal(?,?,?,?,?,?,?,?,?,?,?,?,?)";
    const sqlUser: string =
      "INSERT INTO tb_usuarios(usuario,contra,fecha_creacion,fecha_actualizacion)values(?,?,?,?)";
    const sqlObtainTheRowUser =
      "select * from tb_usuarios ORDER BY cod_user DESC LIMIT 1";

    //son 13 ddatos de entrada
    const Personal: any[] = [];
    Personal.push(P.getDoc_identidad());
    Personal.push(P.getNombres());
    Personal.push(P.getApellidos());
    Personal.push(P.getSexos());
    Personal.push(P.getFecha_nacimiento());
    Personal.push(P.getDomicilio());
    Personal.push(P.getCod_estado_civil());
    Personal.push(P.getTelefono());
    Personal.push(P.getCorreo_electronico());
    Personal.push(P.getFecha_creacion());
    Personal.push(P.getFecha_actu());

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
      console.log("Ultima fila");
      console.log(lastRow);
      const coduser = lastRow[0][0].cod_user;
      //aqui se ponen los dos ultimos parametros
      Personal.push(coduser);
      Personal.push(P.getCod_Rol());
      console.log(Personal);
      const rows: any[] = await cnn.execute(sqlPersonal, Personal);
      //commit todas las consultas
      cnn.query("COMMIT");
      cnn.release();
      Personal.splice(0);
      //retorno la cantidad de filas insertadas
      return rows[0].affectedRows;
    } catch (Error) {
      await cnn.query("ROLLBACK");
      cnn.release();
      return Promise.reject("Error en la insercion de Personal :" + Error);
    }
  }

  async actualizarPersonalDao(P: E_personal) {
    const sqlPersonal =
      "UPDATE tb_personal SET dni=?,nombres=?,apellidos=?,sexo=?,fecha_nac=?,domicilio=?,cod_estado_civil=?,telefono=?,correo_electronico=?,fecha_actua=?,cod_rol=? WHERE cod_personal=?";
    const Personal: any[] = [];
    Personal.push(P.getDoc_identidad());
    Personal.push(P.getNombres());
    Personal.push(P.getApellidos());
    Personal.push(P.getSexos());
    Personal.push(P.getFecha_nacimiento());
    Personal.push(P.getDomicilio());
    Personal.push(P.getCod_estado_civil());
    Personal.push(P.getTelefono());
    Personal.push(P.getCorreo_electronico());
    Personal.push(P.getFecha_actu());
    Personal.push(P.getCod_Rol());
    Personal.push(P.getCodpersonal());
    const pool = await BD.getConex();
    const cnn = await pool.getConnection();
    try {
      const rowChanged: any[] = await cnn.query(sqlPersonal, Personal);
      Personal.splice(0);
      cnn.release();
      //retorno la cantidad de filas insertadas
      return rowChanged[0].changedRows;
    } catch (Error) {
      Personal.splice(0);
      cnn.release();
      return Promise.reject("Error en la actualización de Personal : " + Error);
    }
  }

  async InactivarPersonalByCodDao(P: E_personal) {
    const sqlPersonal =
      "UPDATE tb_personal SET fecha_actua=?,estado=? WHERE cod_personal=?";
    const Personal: any[] = [];
    Personal.push(P.getFecha_actu());
    Personal.push(P.getEstado());
    Personal.push(P.getCodpersonal());
    const pool = await BD.getConex();
    const cnn = await pool.getConnection();
    try {
      const rowChanged: any[] = await cnn.query(sqlPersonal, Personal);
      Personal.splice(0);
      cnn.release();
      //retorno la cantidad de filas insertadas
      console.log("Se inactivo");
      return rowChanged[0].changedRows;
    } catch (Error) {
      Personal.splice(0);
      cnn.release();
      return Promise.reject("Error en la inactivación  de Personal : " + Error);
    }
  }

  async ObtenertodoElPersonalDao() {
    const sqlPersonal = "Call sp_obtenertodoElPersonal()";
    const pool = await BD.getConex();
    const cnn = await pool.getConnection();
    try {
      const rowsPersonal: any[] = await cnn.execute(sqlPersonal);
      cnn.release();
      return rowsPersonal[0][0];
    } catch (error) {
      cnn.release();
      return Promise.reject(
        "Error en la mostrar toda la informacion de el personal :" + Error
      );
    }
  }

  async ObtenertodoElPersonalByCodDao(P: E_personal) {
    const sqlPersonal = "Call sp_obtenerPersonalporCodigo(?)";
    const pool = await BD.getConex();
    const cnn = await pool.getConnection();

    try {
      const rowsPersonal: any[] = await cnn.execute(sqlPersonal, [
        P.getCodpersonal(),
      ]);
      cnn.release();
      return rowsPersonal[0][0];
    } catch (error) {
      cnn.release();
      return Promise.reject(
        "Error en la mostrar toda la informacion de el personal por codigo :" +
          Error
      );
    }
  }

  async diferenteRolByCod(P: E_personal) {
    const sqlPersonal =
      "SELECT * FROM `tb_rol` WHERE cod_rol <> 3 AND cod_rol <> ?";
    const pool = await BD.getConex();
    const cnn = await pool.getConnection();

    try {
      const rowsPersonal: any[] = await cnn.execute(sqlPersonal, [
        P.getCod_Rol(),
      ]);
      cnn.release();
      return rowsPersonal[0][0];
    } catch (error) {
      cnn.release();
      return Promise.reject(
        "Error en la mostrar todos los roles a diferenciar :" + Error
      );
    }
  }

  async ObtenerPersonalxDnioUsuarioDao(P: E_personal) {
    const sqlPersonal = "Call sp_buscarPersonalXUsuarioODni(?,?,?)";
    const pool = await BD.getConex();
    const cnn = await pool.getConnection();
    const personal: any[] = [];
    personal.push(P.getDoc_identidad());
    personal.push(P.getCod_user());
    personal.push(P.getEstado());
    try {
      const rowsPersonal: any[] = await cnn.execute(sqlPersonal, personal);
      cnn.release();
      return rowsPersonal[0][0];
    } catch (error) {
      cnn.release();
      return Promise.reject(
        "Error en la mostrar toda la informacion de el personal por usuario o dni :" +
          Error
      );
    }
  }
}
