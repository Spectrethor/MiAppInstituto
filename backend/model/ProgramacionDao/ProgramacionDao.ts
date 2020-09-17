import E_Programacion from "../../Entitity/E_Programacion";
import BD from "../../config/Connection";
export default class ProgramacionDao {
  async crearProgramacionDao(pr: E_Programacion) {
    const sqlProgramacion = "CALL sp_crearProgramacion(?,?,?,?,?,?,?,?,?,?)";
    const programacion: any[] = [];
    programacion.push(pr.getAnio());
    programacion.push(pr.getMes());
    programacion.push(pr.getCod_mall());
    programacion.push(pr.getCod_profesor());
    programacion.push(pr.getCod_turno());
    programacion.push(pr.getFrecuencia());
    programacion.push(pr.getFecha_inicio());
    programacion.push(pr.getFecha_final());
    programacion.push(pr.getHorario());
    programacion.push(pr.getCod_aulas_lab());
    const pool = await BD.getConex();
    const cnn = await pool.getConnection();

    try {
      await cnn.query("START TRANSACTION");
    } catch (error) {
      await cnn.query("ROLLBACK");
      cnn.release();
      return Promise.reject("Error en la insercion de Progrmación :" + Error);
    }
  }

  async obtenerCarrerasDao() {
    const sqlProgramacion =
      "SELECT id_carreras,nombre_carreras FROM tb_carreras";
    const pool = await BD.getConex();
    const cnn = await pool.getConnection();
    try {
      const rowscarreras: any[] = await cnn.query(sqlProgramacion);
      cnn.release();
      return rowscarreras[0];
    } catch (error) {
      cnn.release();
      return Promise.reject(
        "Error en la mostrar toda la informacion de las carreras :" + Error
      );
    }
  }

  async obtenerModulosDao() {
    const sqlProgramacion = "SELECT * FROM `tb_modulo`";
    const pool = await BD.getConex();
    const cnn = await pool.getConnection();
    try {
      const rowsmodulos: any[] = await cnn.query(sqlProgramacion);
      cnn.release();
      return rowsmodulos[0];
    } catch (error) {
      cnn.release();
      return Promise.reject(
        "Error en la mostrar toda la informacion de los modulos :" + Error
      );
    }
  }

  async ObtenerCodMallaCurricular(
    cod_carrera: string,
    cod_modulo: string,
    cod_curso: string
  ) {
    const sqlProgramacion =
      "SELECT * FROM `tb_malla_curricular` WHERE id_carreras=?,cod_modulo=?,cod_curso=?";
    const pool = await BD.getConex();
    const cnn = await pool.getConnection();
    const programacion: any[] = [];
    try {
      const rowscarreras: any[] = await cnn.query(sqlProgramacion, [
        cod_carrera,
        cod_modulo,
        cod_curso,
      ]);
      cnn.release();
      return rowscarreras[0][0].cod_mall;
    } catch (error) {
      cnn.release();
      return Promise.reject("Error en la mostrar la malla currilar :" + Error);
    }
  }

  async ObtenerCursosFiltradosDao(cod_carrera: string, cod_modulo: string) {
    const sqlProgramacion = "CALL sp_filtradoXcursos(?,?)";
    const pool = await BD.getConex();
    const cnn = await pool.getConnection();
    try {
      const rowscursos: any[] = await cnn.execute(sqlProgramacion, [
        cod_carrera,
        cod_modulo,
      ]);
      cnn.release();
      return rowscursos[0][0];
    } catch (error) {
      cnn.release();
      return Promise.reject("Error ObtenerCursosFiltradosDao :" + Error);
    }
  }

  async ObtenerProfesoresDao() {
    const sqlProgramacion =
      "SELECT cod_personal,CONCAT(apellidos,' ',nombres) as 'Nombres' FROM `tb_personal` WHERE cod_rol=2";
    const pool = await BD.getConex();
    const cnn = await pool.getConnection();
    try {
      const rowsprofesores: any[] = await cnn.query(sqlProgramacion);
      cnn.release();
      return rowsprofesores[0];
    } catch (error) {
      cnn.release();
      return Promise.reject("Error Obtener Profesores Dao :" + Error);
    }
  }

  async ObtenerTurnosDao() {
    const sqlProgramacion = "SELECT * FROM `tb_turnos`";
    const pool = await BD.getConex();
    const cnn = await pool.getConnection();
    try {
      const rowsturnos: any[] = await cnn.query(sqlProgramacion);
      cnn.release();
      return rowsturnos[0];
    } catch (error) {
      cnn.release();
      return Promise.reject("Error Obtener Turnos Dao :" + Error);
    }
  }

  async ObtenerAulasDao() {
    const sqlProgramacion = "SELECT * FROM `tb_aulas_labs`";
    const pool = await BD.getConex();
    const cnn = await pool.getConnection();
    try {
      const rowsaulas: any[] = await cnn.query(sqlProgramacion);
      cnn.release();
      return rowsaulas[0];
    } catch (error) {
      cnn.release();
      return Promise.reject("Error Obtener Aulas Dao :" + Error);
    }
  }
}
