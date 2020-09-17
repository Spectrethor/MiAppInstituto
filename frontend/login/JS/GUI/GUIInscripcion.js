import tblfiltroProgramacion from "../../components/Inscripciones/tbl_filtroProgramacion.html";
import frmRegistrarInscripcion from "../../components/Inscripciones/frm_registrarInscripcion.html";
import InscripcionesServices from "../Services/InscripcionesServices.js";
import validacion from "../Validation/validaciones";

export default class GUIProgramacion {
  constructor() {
    this.usercodigo = 0;
    this.codProgramacion = 0;
    this.inscripcioneServices = new InscripcionesServices();
    document.getElementById("irinscripciones").addEventListener("click", () => {
      let container = document.querySelector(".container");
      container.innerHTML = "";
      const div1 = document.createElement("div");
      div1.className = "row frm_inscripcion";
      div1.innerHTML = frmRegistrarInscripcion;
      container.appendChild(div1);
      //filtra al estudiante por codigo usuario
      this.buscarUsuarioEstudiante();
      this.renderTablaFiltradoXanioymes();
      this.RenderDatosProgramacionMesyAnio();
      this.registrarInscripcion();
      validacion.validarCamposInscripciones();
    });
  }

  async bodyParaCrearInscripcion() {
    let prubeaJson = {};
    let errores = 0;
    document.querySelectorAll(".validarInput").forEach((item) => {
      if (item.d != "") {
        prubeaJson[item.id] = item.d;
      } else {
        errores += 1;
      }
    });
    console.log(prubeaJson);
    // dataJson += "}";
    // if (errores == 0) {
    //   return dataJson;
    // } else {
    //   return Promise.reject(
    //     "Todos los campos deben ser llenados para actualizar el personal"
    //   );
    // }
  }

  ///terminar esta parte llamando en cada

  renderTablaFiltradoXanioymes() {
    const tblfiltro = document.querySelector(".tblFiltroProgramacion");
    tblfiltro.innerHTML = tblfiltroProgramacion;
  }

  buscarUsuarioEstudiante() {
    document.getElementById("btnbuscar").addEventListener("click", async () => {
      const busqueda = document.querySelectorAll(".busqueda");

      if (busqueda[0].value === "" && busqueda[1].value === "") {
        this.MensajeAlerta("Unos de los campos deben ser llenados");
      } else if (busqueda[0].value !== "" && busqueda[1].value !== "") {
        this.MensajeAlerta(
          "Solo un campo debe ser llenado para ser la busqueda"
        );
      } else {
        if (busqueda[0].value !== "") {
        }
        if (busqueda[1].value !== "") {
          let user = JSON.stringify({ usuario: busqueda[1].value });
          const data = await this.inscripcioneServices.buscarUsuarioEstudiante(
            user
          );

          if (data.msg.length === 0) {
            this.MensajeAlerta("No existe  el codigo de usuario ");
          } else {
            const inputs = document.querySelectorAll(".validarInput");

            data.msg.forEach((u) => {
              this.usercodigo = u.cod_estudiante;
              inputs[0].value = u.dni;
              inputs[1].value = u.nombres;
              inputs[2].value = u.apellidos;
            });
          }
        }
      }
    });
  }

  RenderDatosProgramacionMesyAnio() {
    document
      .querySelector(".btnfiltrar")
      .addEventListener("click", async () => {
        const filtroProgramas = document.querySelectorAll(".filtro");
        let errores = 0;
        let json = {};
        filtroProgramas.forEach((f) => {
          if (f.value === "") {
            errores++;
          } else {
            json[f.id] = f.value;
          }
        });
        if (errores > 0) {
          this.MensajeAlerta(
            "Los campos Año y Mes deben estar llenos para hacer la busqueda Correspondiente"
          );
        } else {
          json = JSON.stringify(json);
          let dataFiltrada = await this.inscripcioneServices.FiltraProgramacionMesyAnio(
            json
          );
          let cmturnos = await this.inscripcioneServices.llenarTurnoDistintos(
            json
          );

          let cmcarreras = await this.inscripcioneServices.llenaroCarrerasDistintas(
            json
          );
          let cuerpo = document.getElementById("cuerpo_listado");

          const busqueda = document.querySelectorAll(".programafiltro");
          let optionturnos = "";
          cmturnos.msg.forEach((t) => {
            optionturnos += `<option>${t.descrip}</option>`;
          });
          busqueda[0].innerHTML = optionturnos;
          let optioncarreras = "";
          cmcarreras.msg.forEach((t) => {
            optioncarreras += `<option>${t.nombre_carreras}</option>`;
          });
          busqueda[1].innerHTML = optioncarreras;

          cuerpo.innerHTML = "";
          let filas = "";
          dataFiltrada.msg.forEach((d) => {
            filas += `<tr class="filas">
                  <td>${d.cod_programa}</td>
                  <td>${d.anio}</td>
                  <td>${d.mes}</td>
                  <td>${d.turno}</td>
                  <td>${d.nombre_carreras}</td>
                  <td>${d.nombre_modulo}</td>
                  <td>${d.curso}</td>
                  <td>${d.frecuencia}</td>
                  <td>${d.fecha_inicio}</td>
                  <td>${d.fecha_final}</td>
                  <td>${d.horario}</td>
                  <td>${d.descrip}</td>
                </tr>`;
          });
          cuerpo.innerHTML = filas;
          this.seleccion();
        }
      });
  }

  seleccion() {
    document.querySelector(".filas").addEventListener("click", () => {
      document.querySelector(".filas").style.backgroundColor = "#927F7B";
      const hijos = document.querySelector(".filas").children;
      let programa = {};
      let i = 0;
      for (const h of hijos) {
        programa[i++] = h.innerText;
      }
      const input = document.querySelectorAll(".programa");

      let contador = 0;
      this.codProgramacion = programa[0];
      for (let index = 3; index < 12; index++) {
        input[contador].value = programa[index];
        contador++;
      }
      $(".filtradoModal").modal("hide");
    });
  }

  async MensajeAlerta(respuesta) {
    if (typeof respuesta == "string") {
      Swal.fire({
        title: "Informacion",
        text: respuesta,
        icon: "warning",
        confirmButton: "Ok",
      });
    } else {
      if (respuesta.code === 200) {
        Swal.fire({
          title: "Informacion",
          text: respuesta.msg,
          icon: "success",
          confirmButton: "Ok",
        });
      } else if (respuesta.code === 500) {
        Swal.fire({
          title: "Informacion",
          text: respuesta.msg,
          icon: "error",
          confirmButton: "Ok",
        });
      }
    }
  }

  async registrarInscripcion() {
    document
      .getElementById("frm_registrarInscripcion")
      .addEventListener("submit", async (e) => {
        e.preventDefault();

        const programa = document.querySelectorAll(".programa");
        let errores = 0;
        programa.forEach((p) => {
          if (p.value === "") {
            errores++;
          }
        });

        const inputs = document.querySelectorAll(".validarInput");
        inputs.forEach((p) => {
          if (p.value === "") {
            errores++;
          }
        });
        if (errores > 0) {
          this.MensajeAlerta(
            "Los campos del estudiante y programacion deben estar completados para relizar la inscripcion"
          );
        } else {
          let data = {
            cod_estudiante: this.usercodigo,
            cod_programacion: this.codProgramacion,
          };
          const resultado = await this.inscripcioneServices.crearProgramacion(
            JSON.stringify(data)
          );
          console.log(resultado);
          await this.MensajeAlerta(resultado);
        }
      });
  }
}
