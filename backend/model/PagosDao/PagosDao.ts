import E_Pagos from "../../Entitity/E_Pagos";
import E_Inscripciones from "../../Entitity/E_Inscripciones";
import BD from "../../config/Connection";
export default class PagosDao {
  async registrarPagoDao(P: E_Pagos) {
    const sqlPagos =
      "INSERT INTO tb_pagos(nroRecibo,cod_inscripcion,pago_realizado,total,fecha_pago,cod_personal)VALUES(?,?,?,?,?,?)";
    const sqlcambiarestadoinscripcion =
      "UPDATE tb_incripciones SET estado=1 WHERE cod_incrip=?";
    //son 6 parametros
    const pagos: any[] = [];
    pagos.push(P.getNroRecibo());
    pagos.push(P.getCod_inscripcion());
    pagos.push(P.getPago_realizado());
    pagos.push(P.getTotal());
    pagos.push(P.getFecha_pago());
    pagos.push(P.getCod_personal());
    const pool = await BD.getConex();
    const cnn = await pool.getConnection();
    let resultado = 0;
    try {
      await cnn.query("START TRANSACTION");
      let rowpagos: any[] = await cnn.query(sqlPagos, pagos);
      if (rowpagos[0].affectedRows > 0) {
        const data: any[] = await cnn.query(sqlcambiarestadoinscripcion, [
          P.getCod_inscripcion(),
        ]);
        resultado = data[0].changedRows;
      }
      await cnn.query("COMMIT");
      cnn.release();
      pagos.splice(0);
      return resultado;
    } catch (error) {
      await cnn.query("ROLLBACK");
      cnn.release();
      return Promise.reject("Error en registrarPagoDao :" + Error);
    }
  }

  async filtrarInscripcionesxEstadoDao(I: E_Inscripciones) {
    const sqlPagos = "CALL sp_filtraInscripcionesxEstado(?)";
    //son 6 parametros
    const pool = await BD.getConex();
    const cnn = await pool.getConnection();
    try {
      await cnn.query("START TRANSACTION");
      let rows: any[] = await cnn.query(sqlPagos, [I.getEstado()]);
      await cnn.query("COMMIT");
      cnn.release();
      return rows[0][0];
    } catch (error) {
      await cnn.query("ROLLBACK");
      cnn.release();
      return Promise.reject("Error en obtenerInscripcionesxEstado:" + Error);
    }
  }

  async filtrarInscripcionesxUsuarioyEstadoDao(
    usuario: number,
    estado: number
  ) {
    const sqlPagos = "CALL sp_busInscripcionXusuarioYestado(?,?)";
    //son 6 parametros
    const pool = await BD.getConex();
    const cnn = await pool.getConnection();
    try {
      await cnn.query("START TRANSACTION");
      let rows: any[] = await cnn.query(sqlPagos, [usuario, estado]);
      await cnn.query("COMMIT");
      cnn.release();
      return rows[0][0];
    } catch (error) {
      await cnn.query("ROLLBACK");
      cnn.release();
      return Promise.reject(
        "Error en filtrarInscripcionesxUsuarioyEstadoDao : " + Error
      );
    }
  }
}
