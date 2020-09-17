import tbl_filtroPagos from "../../components/Pagos/tbl_filtroPagos.html";
import tbl_inscripciones from "../../components/Pagos/tbl_inscripciones.html";
import frmpago from "../../components/Pagos/frm_registrarPago.html";
import PagosServices from "../Services/PagosServices";
export default class GUIPagos {
  constructor() {
    this.codigo_inscripcion = 0;
    this.parametros = [];
    this.pagosService = new PagosServices();
    document.getElementById("irpagos").addEventListener("click", () => {
      let container = document.querySelector(".container");
      container.innerHTML = "";
      const div1 = document.createElement("div");
      div1.className = "row tb_filtro";
      div1.innerHTML = tbl_filtroPagos;
      const div2 = document.createElement("div");
      div2.className = "row tb_inscripciones";
      div2.innerHTML = tbl_inscripciones;
      container.appendChild(div1);
      container.appendChild(div2);
      this.filtradoDePagosAlCargar();
      this.renderFrmRegistrarPago();
      this.filtradoDePagosBtn();
      this.establecerDatosEnFrmRegistrarPagos();
      this.registrarPago();
    });
  }

  renderFrmRegistrarPago() {
    const frm = document.getElementById("frm-registerPago");
    frm.innerHTML = frmpago;
  }

  filtradoDePagosBtn() {
    //buscar causado por el boton
    document.getElementById("btnbuscar").addEventListener("click", async () => {
      const busqueda = document.querySelectorAll(".busqueda");

      let data = {};
      if (busqueda[0].value.length === 0) {
        data[busqueda[1].id] = busqueda[1].value;
        data = JSON.stringify(data);
        //filtrar x estado
        const resultado = await this.pagosService.filtrarInscripcionxEstado(
          data
        );
        this.mensajeParaCoincidencias(resultado);
        this.renderInscripciones(resultado);
      } else {
        data[busqueda[0].id] = busqueda[0].value;
        data[busqueda[1].id] = busqueda[1].value;
        data = JSON.stringify(data);
        console.log(data);
        const resultado = await this.pagosService.filtrarInscripcionxEstadoyUsuario(
          data
        );
        console.log(resultado);
        if (resultado.msg.length > 0) {
          this.mensajeParaCoincidencias(resultado);
          this.renderInscripciones(resultado);
        } else {
          Swal.fire({
            tittle: "Información",
            text: "No se encontraron los datos encontrados",
            icon: "warning",
            confirmButtonText: "Ok",
          });
          const cuerpo = document.getElementById("cuerpo_listado");
          cuerpo.innerHTML = "";
        }
      }
    });
  }

  async filtradoDePagosAlCargar() {
    //buscar al momento de caragar la pagina
    const busqueda = document.querySelectorAll(".busqueda");
    let data = {};

    data[busqueda[1].id] = 0;
    data = JSON.stringify(data);
    const resultado = await this.pagosService.filtrarInscripcionxEstado(data);
    if (resultado.msg.length > 0) {
      this.renderInscripciones(resultado);
    } else {
      Swal.fire({
        tittle: "Información",
        icon: "info",
        text: "No hay inscripciones pendientes",
        confirmButtonText: "Ok",
      });
    }
  }

  async renderInscripciones(inscripcion) {
    const cuerpo = document.getElementById("cuerpo_listado");
    cuerpo.innerHTML = "";
    let filas = "";

    //construir cuerpo
    inscripcion.msg.forEach((value) => {
      let estado = "";
      if (value.estado === 1) {
        estado = "Cancelado";
      } else {
        estado = "Pendiente";
      }
      filas += `<tr class="filasinscripciones" data-toggle="modal" data-target=".registrarModal">
      <td>${value.cod_incrip}</td>
      <td>${value.cod_generado}</td>
      <td>${value.usuario}</td>
      <td>${value.apellidos}</td>
      <td>${value.nombres}</td>
      <td>${value.nombre_carreras}</td>
      <td>${value.nombre_curso}</td>
      <td>${value.Precio}</td>
      <td>${value.horario}</td>
      <td>${value.frecuencia}</td>
      <td>${value.fecha_inicio}</td>
      <td>${value.fecha_final}</td>
      <td>${estado}</td>`;
    });
    //pintar cuerpo
    cuerpo.innerHTML = filas;
    //este metodo setea la propiedades necesaria para el registro
    //sy pinta lo datos en el formulario al darle click
    this.renderDatosEnFrmPagos();
  }

  renderDatosEnFrmPagos() {
    const filasinscripciones = document.querySelectorAll(".filasinscripciones");
    filasinscripciones.forEach((f) => {
      f.addEventListener("click", () => {
        const tabledata = f.children;
        for (let i = 0; i < tabledata.length; i++) {
          this.parametros.push(tabledata[i].innerText);
        }
        this.establecerDatosEnFrmRegistrarPagos();
      });
    });
  }

  establecerDatosEnFrmRegistrarPagos() {
    const validar = document.querySelectorAll(".validar");
    this.codigo_inscripcion = this.parametros[0];
    validar[0].value = this.parametros[1];
    validar[1].value = this.parametros[2];
    validar[2].value = this.parametros[3];
    validar[3].value = this.parametros[4];
    validar[4].value = this.parametros[5];
    validar[5].value = this.parametros[6];
    validar[6].value = this.parametros[8];
    validar[7].value = this.parametros[9];
    validar[8].value = this.parametros[10];
    validar[9].value = this.parametros[11];
    //precio
    validar[10].value = this.parametros[7];
    //luego elimino para que no se acumelene los array
    //ya que este le pertenece al objeto en si ,no de manera local en una funcion
    //del objeto
    if (this.parametros[12] === "Cancelado") {
      document.querySelector(".botones").innerHTML = "";
    } else {
      document.querySelector(
        ".botones"
      ).innerHTML = `<div class="col-md-2"></div>
      <div class="form-group mx-auto col-md-4">
        <button type="submit" class="btn btn-info btn-block">
          Registrar Pago
        </button>
      </div>
      <div class="form-group mx-auto col-md-4">
        <button
          type="button"
          class="btn btn-danger btn-block"
          id="cancel"
          data-dismiss="modal"
          aria-hidden="true"
          value="Cancelar"
        >
          Cancelar
        </button>
      </div>
      <div class="col-md-2"></div>`;
    }

    this.parametros.splice(0);
  }

  registrarPago() {
    document
      .getElementById("frm_registrarProgramacion")
      .addEventListener("submit", async (e) => {
        e.preventDefault();

        const validar = document.querySelectorAll(".validar");
        let errores = 0;
        validar.forEach((v) => {
          if (v.value === "") {
            errores++;
          }
        });
        if (errores > 0) {
          Swal.fire({
            tittle: "Información",
            icon: "warning",
            text: "Todos los campos deben ser llenados",
            confirmButtonText: "Ok",
          });
        } else {
          const { value: respuesta } = await Swal.fire({
            tittle: "Información",
            icon: "info",
            showCancelButton: true,
            text:
              "Si se realiza el pago ,luego no se podra revertir esta operacion",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si ,Realizar el pago",
          });

          if (respuesta) {
            let data = {
              cod_inscripcion: this.codigo_inscripcion,
              total: validar[10].value,
            };

            const response = await this.pagosService.registrarPago(
              JSON.stringify(data)
            );
            this.renderMensaje(response);
            this.filtradoDePagosAlCargar();
          }
        }
      });
  }

  renderMensaje(rpta) {
    if (rpta.code === 200) {
      Swal.fire({
        tittle: "Información",
        icon: "success",
        text: rpta.msg,
        confirmButtonText: "Ok",
      });
    } else {
      Swal.fire({
        tittle: "Información",
        icon: "error",
        text: rpta.msg,
        confirmButtonText: "Ok",
      });
    }
  }

  mensajeParaCoincidencias(rpta) {
    Swal.fire({
      title: "Resultado de la busqueda",
      text: `La cantidad de resultados encontrados fueron : ${rpta.msg.length}`,
      icon: "info",
    });
  }
}
