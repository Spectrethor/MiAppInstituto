import tbl_personal from "../../components/Personal/tbl_personal.html";
import frmRegisterPersonal from "../../components/Personal/frm_registrarPersonal.html";
import PersonalService from "../../JS/Services/PersonalService.js";
import frmeditarPersonal from "../../components/Personal/frm_editarPersonal.html";
import tbl_filtroPersonal from "../../components/Personal/tbl_filtroPersonal.html";
import Validaciones from "../Validation/validaciones";

export default class GuiPersonal {
  constructor() {
    this.p_service = new PersonalService();
    document.getElementById("irpersonal").addEventListener("click", () => {
      let container = document.querySelector(".container");
      container.innerHTML = "";
      const div1 = document.createElement("div");
      div1.className = "row tb_filtro";
      div1.innerHTML = tbl_filtroPersonal;
      const div2 = document.createElement("div");
      div2.className = "row tb_personal";
      div2.innerHTML = tbl_personal;
      container.appendChild(div1);
      container.appendChild(div2);
      this.buscarPersonalxDnioUsuario();
      this.renderFrmRegistroPersonal();
      this.crearPersonal();
      this.renderPersonal();
      this.renderFrmActualizarPersonal();
      this.addEventsBtn();
      this.actualizarPersonal();
      //valida campos que para sean solo numeros
      Validaciones.validarCampos();
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

  async addEventsBtn() {
    document
      .getElementById("cuerpo_listado")
      .addEventListener("click", async (e) => {
        if (e.target.classList.contains("editarPersonal")) {
          const codPersonal =
            e.target.parentElement.parentElement.firstElementChild.innerText;
          //Obtenemos Todo la data

          const data = await this.p_service.getAllPersonalbyCod(codPersonal);
          let EstadoCiviles = await this.p_service.getPersonalCodCivil(
            data.msg[0].cod_est_civil
          );
          EstadoCiviles = EstadoCiviles.msg;
          let Roles = await this.p_service.getPersonalRolDiferente(
            data.msg[0].cod_rol
          );
          Roles = Roles.msg;

          // //seteamos todos los datos en el formulario
          data.msg.forEach((p) => {
            //establecemos todos los inputs de texto en el frm
            document.querySelectorAll(".validar")[0].value = p.cod_personal;
            document.querySelectorAll(".validar")[1].value = p.dni;
            document.querySelectorAll(".validar")[2].value = p.nombres;
            document.querySelectorAll(".validar")[3].value = p.apellidos;
            document.querySelectorAll(".validar")[4].value = p.fecha_nac;
            document.querySelectorAll(".validar")[5].value = p.domicilio;
            document.querySelectorAll(".validar")[6].value = p.telefono;
            document.querySelectorAll(".validar")[7].value =
              p.correo_electronico;
            const estado = document.getElementById("estado_civil");
            let opcionesCivil = `<option value="${p.cod_est_civil}">${p.estado_civil}</option>`;
            EstadoCiviles.forEach((c) => {
              opcionesCivil += `<option value="${c.cod_est_civil}">${c.estado_civil}</option>`;
            });
            estado.innerHTML = opcionesCivil;
            const rol = document.querySelector(".roles");
            let opcionesRoles = `<option value="${p.cod_rol}">${p.rol}</option>`;
            opcionesRoles += `<option value="${Roles.cod_rol}">${Roles.rol}</option>`;
            rol.innerHTML = opcionesRoles;
            document.querySelectorAll(".sexos").forEach((item) => {
              if (item.value == p.sexo) {
                item.checked = true;
                return;
              }
            });
          });
        }
        if (e.target.classList.contains("inactivar")) {
          let codPersonal =
            e.target.parentElement.parentElement.firstElementChild.innerText;
          await this.mensajeParaInactivar(codPersonal);
        }
      });
  }

  async darJsonBodyParaRegistrar() {
    let dataJson = "{";
    let errores = 0;
    document.querySelectorAll(".validarRegistro").forEach((item) => {
      if (item.value != "") {
        dataJson += `"${item.id}" : "${item.value}",`;
      } else {
        errores += 1;
      }
    });
    document.querySelectorAll(".sexoRegistro").forEach((item) => {
      if (item.checked) {
        dataJson += `"${item.classList}" : "${item.value}",`;
      }
    });
    //este no necesita validacion ya que este ya tiene
    const estado_civil = document.getElementById("estado_civilRegistro");
    dataJson += `"${estado_civil.id}" : "${estado_civil.value}",`;

    const cod_rol = document.getElementById("cod_rol");
    dataJson += `"${cod_rol.id}" : "${cod_rol.value}"`;

    dataJson += "}";
    if (errores == 0) {
      return dataJson;
    } else {
      return Promise.reject(
        "Todos los campos deben ser llenados para realizar eñ registro de un personal"
      );
    }
  }

  renderFrmRegistroPersonal() {
    const frm = document.getElementById("frm-registerPersonal");
    frm.innerHTML = frmRegisterPersonal;
  }

  crearPersonal() {
    document
      .getElementById("frm_registrarPersonal")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        try {
          const jsonBody = await this.darJsonBodyParaRegistrar();

          const resultado = await this.p_service.postPersonal(jsonBody);
          await this.MensajeAlerta(resultado);
          $(".registrarModal").modal("hide");
          this.resetFrm("frm_registrarPersonal");
          this.renderPersonal();
        } catch (error) {
          this.MensajeAlerta(error);
        }
      });
  }

  async renderPersonal(data) {
    const cuerpo = document.getElementById("cuerpo_listado");
    cuerpo.innerHTML = "";
    let personal = null;
    if (typeof data == "undefined") {
      personal = await this.p_service.getAllPersonal();
    } else {
      personal = data;
    }
    let filas = "";
    personal.msg.forEach((value) => {
      filas += `<tr>
                  <td>${value.cod_personal}</td>
                  <td>${value.dni}</td>
                  <td>${value.usuario}</td>
                  <td>${value.nombres}</td>
                  <td>${value.apellidos}</td>
                  <td>${value.sexo}</td>
                  <td>${value.fecha_nac}</td>
                  <td>${value.domicilio}</td>
                  <td>${value.estado_civil}</td>
                  <td>${value.telefono}</td>
                  <td>${value.correo_electronico}</td>
                  <td>${value.fecha_alta}</td>
                  <td>${value.fecha_actua}</td>
                  <td>${value.rol}</td>
                  <td>${value.estado}</td> 
                  <td ><button
                  type="button"
                  class="btn btn-primary editarPersonal"
                  data-toggle="modal"
                  data-target=".editarmodal"
                  >
                  Editar
                </button></td>
                  <td ><a href="#" class="btn btn-secondary inactivar">Inactivar</a></td>
                </tr>`;
    });

    cuerpo.innerHTML = filas;
  }

  resetFrm(frm) {
    document.getElementById(frm).reset();
  }

  renderFrmActualizarPersonal() {
    const div = document.getElementById("frm_actualizaPersonal");
    div.innerHTML = frmeditarPersonal;
  }

  async darJsonBodyParaActualizar() {
    let dataJson = "{";
    let errores = 0;
    document.querySelectorAll(".validar").forEach((item) => {
      if (item.value != "") {
        dataJson += `"${item.id}" : "${item.value}",`;
      } else {
        errores += 1;
      }
    });
    document.querySelectorAll(".sexos").forEach((item) => {
      if (item.checked) {
        dataJson += `"${item.classList}" : "${item.value}",`;
      }
    });
    //este no necesita validacion ya que este ya tiene
    const estado_civil = document.getElementById("estado_civil");
    dataJson += `"${estado_civil.id}" : "${estado_civil.value}",`;

    const cod_rol = document.querySelector(".roles");
    dataJson += `"${cod_rol.id}" : "${cod_rol.value}"`;

    dataJson += "}";
    if (errores == 0) {
      return dataJson;
    } else {
      return Promise.reject(
        "Todos los campos deben ser llenados para actualizar el personal"
      );
    }
  }

  actualizarPersonal() {
    document
      .getElementById("frmEditarEstudiante")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        try {
          let jsonBody = await this.darJsonBodyParaActualizar();
          jsonBody = JSON.parse(jsonBody);
          const cod_user = document.getElementById("cod_user").value;
          jsonBody.cod_personal = cod_user;
          const respuesta = await this.p_service.putPersonal(
            JSON.stringify(jsonBody)
          );
          this.MensajeAlerta(respuesta);
          $(".editarmodal").modal("hide");
          this.renderPersonal();
        } catch (error) {
          this.MensajeAlerta(error);
        }
      });
  }

  async inactivarPersonal(codPersonal) {
    const respuesta = await this.p_service.inactivarPersonal(codPersonal);
    if (respuesta.code === 200) {
      await this.MensajeAlerta(respuesta);
      this.renderPersonal();
    } else {
      await this.MensajeAlerta(respuesta);
    }
  }

  async mensajeParaInactivar(codpersonal) {
    const respuesta = await Swal.fire({
      title: "Estas seguro que quiere inactivar a este personal?",
      text: "luego ya no se podra revertir la operacion!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Inactivar",
    });

    if (respuesta.value) {
      this.inactivarPersonal(codpersonal);
      // Swal.fire("Deleted!", "Your file has been deleted.", "success");
    } else {
      Swal.fire("Mensaje", "Ok", "info");
    }
  }

  buscarPersonalxDnioUsuario() {
    document.getElementById("btnbuscar").addEventListener("click", async () => {
      const busqueda = document.querySelectorAll(".busqueda");
      const estadoUser = document.getElementById("estadoUser").value;
      let errores = 0;
      busqueda.forEach((b) => {
        if (b.value === "") {
          errores++;
        }
      });

      if (errores > 1) {
        this.MensajeAlerta(
          "Rellene uno de los campos por favor para hacer la busqueda"
        );
      } else {
        let bodyJson = {
          dni: busqueda[0].value,
          usuario: busqueda[1].value,
          estadoUser: estadoUser,
        };
        const data = await this.p_service.buscarPersonalxDnioUsuario(bodyJson);
        if (data.code == 200) {
          if (data.msg.length > 0) {
            //si hay que pinte la data encontrada
            this.renderPersonal(data);
          } else {
            this.MensajeAlerta("No se encontro el personal filtrado");
            //si no hay datos que pinte todos los datos como siempre
            this.renderPersonal();
          }
        } else if (data.code == 500) {
          await this.MensajeAlerta(data.msg);
        }
      }
    });
  }
}
