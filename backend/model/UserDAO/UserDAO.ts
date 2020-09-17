import E_user from "./../../Entitity/E_User";
import BD from "./../../config/Connection";

export default class UserDao {
  async updateUserDao(Euser: E_user): Promise<any> {
    const sql =
      "UPDATE tb_usuarios SET usuario=?,contra=?,fecha_actualizacion=? WHERE cod_user=?";
    const Users: any[] = [];
    Users.push(Euser.getUsuario());
    Users.push(Euser.getContra());
    Users.push(Euser.getFecha_actualizacion());
    Users.push(Euser.getCod_user());
    const pool = await BD.getConex();
    const cnn = await pool.getConnection();
    try {
      const updatedRows: any[] = await cnn.query(sql, Users);
      cnn.release();
      //vacio el array una vez que ya no se utiliza
      Users.splice(0);
      return updatedRows[0].changedRows;
    } catch (error) {
      Users.splice(0);
      cnn.release();
      return Promise.reject(`Error en la actualizacion del usuario : ${error}`);
    }
  }

  async getUserDaoByCodUser(Euser: E_user) {
    const Users: any[] = [];
    const sql =
      "SELECT cod_user,usuario,contra,fecha_creacion,fecha_actualizacion FROM tb_usuarios WHERE cod_user=?";
    const pool = await BD.getConex();
    const cnn = await pool.getConnection();
    Users.push(Euser.getCod_user());
    try {
      const RowUser: any[] = await cnn.query(sql, Users);

      cnn.release();
      //vacio el array una vez que ya no se utiliza
      Users.splice(0);
      //obtenemos asi todos los datos ya que la consulta nos devuelve un array bidemensional
      return RowUser[0][0];
    } catch (error) {
      Users.splice(0);
      cnn.release();
      return Promise.reject(`Error en obtener usuario por codigo: ${error}`);
    }
  }

  async getAllUsersDao() {
    const sql =
      "SELECT cod_user,usuario,contra,fecha_creacion,fecha_actualizacion FROM tb_usuarios";
    const pool = await BD.getConex();
    const cnn = await pool.getConnection();
    try {
      const RowUsers: any[] = await cnn.query(sql);
      cnn.release();
      //vacio el array una vez que ya no se utiliza
      //obtenemos todos los usuarios
      return RowUsers[0][0];
    } catch (error) {
      cnn.release();
      return Promise.reject(`Error en obtener usuario por codigo: ${error}`);
    }
  }

  async LoginPersonalDao(E: E_user, rol: number) {
    const sqlLogin =
      "SELECT u.cod_user,per.cod_personal,u.usuario,u.contra,per.cod_rol FROM tb_usuarios as u JOIN tb_personal AS per on u.cod_user=per.cod_user WHERE u.usuario=? AND per.cod_rol=?";
    const pool = await BD.getConex();
    const cnn = await pool.getConnection();

    try {
      const RowUsers: any[] = await cnn.query(sqlLogin, [E.getUsuario(), rol]);
      cnn.release();
      return RowUsers[0][0];
    } catch (error) {
      cnn.release();
      return Promise.reject(`Error en LoginPersonalDao : ${error}`);
    }
  }

  async LoginEstudianteDao(E: E_user) {
    const sqlLogin =
      "SELECT  u.cod_user,u.usuario,u.contra,es.cod_rol FROM tb_usuarios as u JOIN tb_estudiantes AS es on u.cod_user=es.cod_user WHERE u.usuario=? AND es.cod_rol=3";
    const pool = await BD.getConex();
    const cnn = await pool.getConnection();
    try {
      const RowUsers: any[] = await cnn.query(sqlLogin, [E.getUsuario()]);
      cnn.release();
      return RowUsers[0][0];
    } catch (error) {
      cnn.release();
      return Promise.reject(`Error en LoginEstudianteDao : ${error}`);
    }
  }
}
