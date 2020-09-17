import E_Inscripcion from "../../Entitity/E_Inscripciones";
import E_User from "../../Entitity/E_User";
import BD from "../../config/Connection";
export default class InscripcionesDao {
  async CrearInscripcionDao(I: E_Inscripcion) {
    const sqlPersonal =
      "INSERT INTO tb_incripciones(cod_generado,cod_estudiante,cod_programacion,fecha_inscripcion,cod_personal)VALUES(?,?,?,?,?)";
    const sqlquery =
      "SELECT cod_generado FROM tb_incripciones ORDER BY cod_incrip LIMIT 1";
    const inscripcion: any[] = [];
    inscripcion.push(I.getCod_generado());
    inscripcion.push(I.getCod_estudiante());
    inscripcion.push(I.getCod_programacion());
    inscripcion.push(I.getFecha_inscripcion());
    inscripcion.push(I.getCod_personal());

    const pool = await BD.getConex();
    const cnn = await pool.getConnection();
    try {
      const rowsinscripcion: any[] = await cnn.query(sqlPersonal, inscripcion);

      const filas = rowsinscripcion[0].affectedRows;
      if (filas > 0) {
        let lastrow: any[] = await cnn.query(sqlquery);
        lastrow = lastrow[0][0].cod_generado;
        inscripcion.splice(0);
        cnn.release();
        return lastrow;
      }
    } catch (error) {
      cnn.release();
      return Promise.reject("Error en CrearInscripcion : " + Error);
    }
  }

  //obtener la programacion filtrado por año y mes
  async BusquedaProgramacionPorMesAnioDao(anio: number, mes: string) {
    const sqlPersonal = "Call	sp_buscarProgramacionPorMesyAnio(?,?)";
    const pool = await BD.getConex();
    const cnn = await pool.getConnection();
    try {
      const rowsinscripcion: any[] = await cnn.execute(sqlPersonal, [
        anio,
        mes,
      ]);
      cnn.release();
      return rowsinscripcion[0][0];
    } catch (error) {
      cnn.release();
      return Promise.reject(
        "Error en BusquedaProgramacionPorMesAnioDao : " + Error
      );
    }
  }

  //busca al estudiante activo por el usuario
  async BusquedaXEstudiantexUsuarioDao(U: E_User) {
    const sqlInscripcion = "CALL sp_buscarEstudiantexUsuario(?)";
    const pool = await BD.getConex();
    const cnn = await pool.getConnection();
    try {
      const rowsinscripcion: any[] = await cnn.execute(sqlInscripcion, [
        U.getUsuario(),
      ]);
      cnn.release();
      return rowsinscripcion[0][0];
    } catch (error) {
      cnn.release();
      return Promise.reject(
        "Error en BusquedaXEstudiantexUsuarioDao :" + Error
      );
    }
  }

  async llenarTurnoDistintosDao(anio: number, mes: string) {
    const sqlPersonal = "Call sp_llenarTurnoDistintos(?,?)";
    const pool = await BD.getConex();
    const cnn = await pool.getConnection();
    try {
      const rowsinscripcion: any[] = await cnn.execute(sqlPersonal, [
        anio,
        mes,
      ]);
      console.log(rowsinscripcion[0][0]);
      cnn.release();
      return rowsinscripcion[0][0];
    } catch (error) {
      cnn.release();
      return Promise.reject("Error en llenarTurnoDistintosDao : " + Error);
    }
  }

  async llenarCarreraNoRepetidasDao(anio: number, mes: string) {
    const sqlPersonal = "Call  sp_llenarCarreraNoRpetidas(?,?)";
    const pool = await BD.getConex();
    const cnn = await pool.getConnection();
    try {
      const rowsinscripcion: any[] = await cnn.execute(sqlPersonal, [
        anio,
        mes,
      ]);
      cnn.release();
      return rowsinscripcion[0][0];
    } catch (error) {
      cnn.release();
      return Promise.reject("Error en llenarCarreraNoRpetidasDao : " + Error);
    }
  }
}
