import StudentService from "../Services/StudentService.js";
import frm_editarStudent from "../../components/Estudiante/frm_editarEstudiante.html";
import tbl_studentInfo from "../../components/Estudiante/tbl_studentInfo.html";
import frm_register from "../../components/Estudiante/frm_registrarEstudiante.html";
import tbl_filtro from "../../components/Estudiante/tbl_filtroEstudiante.html";
import Validaciones from "../Validation/validaciones";

export default class GuiStudent {
  constructor() {
    document.getElementById("irestudiantes").addEventListener("click", () => {
      let container = document.querySelector(".container");
      container.innerHTML = "";
      const div1 = document.createElement("div");
      div1.className = "row tb_filtro";
      div1.innerHTML = tbl_filtro;
      const div2 = document.createElement("div");
      div2.className = "row tb_estudiante";
      div2.innerHTML = tbl_studentInfo;
      container.appendChild(div1);
      container.appendChild(div2);
      //funcionaliadades
      this.buscarxDnioUsuario();
      this.studentService = new StudentService();
      this.renderEstudiantes();
      this.RenderFrm();
      this.crearEstudiante();
      this.addEventsBtn();
      this.EditarEstudiante();
      //valida campos que para sean solo numeros
      Validaciones.validarCampos();
    });
  }

  async crearEstudiante() {
    document
      .getElementById("frm_registrarStudent")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        try {
          const formdata = await this.capturarCamposRegistro();
          let respuesta = await this.studentService.postStudent(formdata);
          await this.MensajeAlerta(respuesta);
          await this.cleanFormERegistrar();
          $(".registrarModal").modal("hide");
          await this.renderEstudiantes();
        } catch (error) {
          console.log(error);
          this.MensajeAlerta(error);
        }
      });
  }

  async cleanFormEditar() {
    document.getElementById("frmEditarEstudiante").reset();
  }

  async cleanFormERegistrar() {
    document.getElementById("frm_registrarStudent").reset();
  }

  async renderEstudiantes(data) {
    const cuerpo = document.getElementById("cuerpo_listado");
    cuerpo.innerHTML = "";
    let students = null;
    if (typeof data == "undefined") {
      students = await this.studentService.getStudents();
    } else {
      students = data;
    }
    let filas = "";
    students.msg.forEach((value) => {
      filas += `<tr>
                  <td>${value.cod_estudiante}</td>
                  <td>${value.dni}</td>
                  <td>${value.usuario}</td>
                  <td>${value.nombres}</td>
                  <td>${value.apellidos}</td>
                  <td>${value.sexos}</td>
                  <td>${value.fecha_nac}</td>
                  <td>${value.domicilio}</td>
                  <td>${value.estado_civil}</td>
                  <td>${value.telefono}</td>
                  <td>${value.correo_electronico}</td>
                  <td>${value.fecha_creacion}</td>
                  <td>${value.fecha_actu}</td>
                  <td>${value.estado}</td>
                  <td ><button
                  type="button"
                  class="btn btn-primary editar"
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

  async addEventsBtn() {
    document
      .getElementById("cuerpo_listado")
      .addEventListener("click", async (e) => {
        if (e.target.classList.contains("editar")) {
          const codUser =
            e.target.parentElement.parentElement.firstElementChild.innerText;
          //Obtenemos Todo la data
          const data = await this.studentService.getStudentsBycod(codUser);
          let EstadoCiviles = await this.studentService.getStudentsCodCivil(
            data.msg[0].cod_est_civil
          );
          EstadoCiviles = EstadoCiviles.msg;

          //seteamos todos los datos en el formulario
          data.msg.forEach((s) => {
            //establecemos todos los inputs de texto en el frm
            document.querySelectorAll(".validar")[0].value = s.cod_estudiante;
            document.querySelectorAll(".validar")[1].value = s.dni;
            document.querySelectorAll(".validar")[2].value = s.nombres;
            document.querySelectorAll(".validar")[3].value = s.apellidos;
            document.querySelectorAll(".validar")[4].value = s.fecha_nac;
            document.querySelectorAll(".validar")[5].value = s.domicilio;
            document.querySelectorAll(".validar")[6].value = s.telefono;
            document.querySelectorAll(".validar")[7].value =
              s.correo_electronico;
            const estado = document.getElementById("estado_civil");
            let opcionesCivil = `<option value="${s.cod_est_civil}">${s.estado_civil}</option>`;
            EstadoCiviles.forEach((c) => {
              opcionesCivil += `<option value="${c.cod_est_civil}">${c.estado_civil}</option>`;
            });
            estado.innerHTML = opcionesCivil;
            document.querySelectorAll(".sexos").forEach((item) => {
              if (item.value == s.sexos) {
                item.checked = true;
                return;
              }
            });
            const Url = "http://localhost:3000" + s.img_url;
            document.getElementById("imgEstudiante").src = Url;
          });
        }
        if (e.target.classList.contains("inactivar")) {
          let codUser =
            e.target.parentElement.parentElement.firstElementChild.innerText;
          this.mensajeParaInactivar(codUser);
        }
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

  RenderFrm() {
    document.getElementById("frm-register").innerHTML = frm_register;
    document.getElementById(
      "frm_actualizaEstudiante"
    ).innerHTML = frm_editarStudent;
  }

  EditarEstudiante() {
    document
      .getElementById("frmEditarEstudiante")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        const student = await this.capturarCampos();
        if (typeof student.get("foto").name === "undefined") {
          let jsonBody = await this.DarJsonData();
          const data = await this.studentService.updateStudentWithoutImg(
            jsonBody
          );
          if (data.code == 200) {
            this.cleanFormEditar();
            await this.MensajeAlerta(data);
            $(".editarmodal").modal("hide");
            this.renderEstudiantes();
          } else {
            await this.MensajeAlerta(data);
          }
        } else {
          const data = await this.studentService.updateStudentWithImg(student);
          if (data.code === 200) {
            this.cleanFormEditar();
            await this.MensajeAlerta(data);
            $(".editarmodal").modal("hide");
            this.renderEstudiantes();
          } else {
            await this.MensajeAlerta(data);
          }
        }
      });
  }

  async inactivarEstudiante(cod_Estudiante) {
    const respuesta = await this.studentService.inactiveStudent(cod_Estudiante);
    console.log(respuesta);
    if (respuesta.code === 200) {
      await this.MensajeAlerta(respuesta);
      this.renderEstudiantes();
    } else {
      await this.MensajeAlerta(respuesta);
    }
  }

  async capturarCampos() {
    const myform = new FormData();
    let errores = 0;
    document.querySelectorAll(".validar").forEach((item) => {
      if (item.value != "") {
        myform.append(`${item.id}`, item.value);
      } else {
        errores += 1;
      }
    });
    //classList te obtiene el nombre de la clase o te lo setea de un elemento
    document.querySelectorAll(".sexos").forEach((item) => {
      if (item.checked) {
        myform.append(`${item.classList}`, item.value);
      }
    });
    //este no necesita validacion ya que este ya tiene
    const estado_civil = document.getElementById("estado_civil");
    myform.append(`${estado_civil.id}`, estado_civil.value);

    //con la propiedad files obtendremos el dato del archivo y eso lo mandamos en el formdata
    const foto = document.getElementById("imagen").files;
    myform.append("foto", foto[0]);

    if (errores == 0) {
      return myform;
    } else {
      this.MensajeAlerta("Todos los campos deben ser llenados");
    }
  }

  async capturarCamposRegistro() {
    const myform = new FormData();
    let errores = 0;
    document.querySelectorAll(".validarRegistro").forEach((item) => {
      if (item.value != "") {
        myform.append(`${item.id}`, item.value);
      } else {
        errores += 1;
      }
    });
    //classList te obtiene el nombre de la clase o te lo setea de un elemento
    document.querySelectorAll(".sexoRegistro").forEach((item) => {
      if (item.checked) {
        myform.append(`${item.classList}`, item.value);
      }
    });
    //este no necesita validacion ya que este ya tiene
    const estado_civil = document.getElementById("estado_civilRegistro");
    myform.append(`${estado_civil.id}`, estado_civil.value);
    //con la propiedad files obtendremos el dato del archivo y eso lo mandamos en el formdata
    const foto = document.getElementById("imagenRegistro").files;
    if (foto.length > 0) {
      myform.append("foto", foto[0]);
    } else {
      errores += 1;
    }

    if (errores == 0) {
      return myform;
    } else {
      return Promise.reject(
        "Todos los campos deben ser llenados ,con su respectiva imagen del estudiante"
      );
    }
  }

  async DarJsonData() {
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
    dataJson += `"${estado_civil.id}" : "${estado_civil.value}"`;
    dataJson += "}";
    if (errores == 0) {
      return dataJson;
    } else {
      this.MensajeAlerta("Todos los campos deben ser llenados");
    }
  }

  buscarxDnioUsuario() {
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
        const data = await this.studentService.buscarxDnioUsuario(bodyJson);
        if (data.code == 200) {
          if (data.msg.length > 0) {
            //si hay que pinte la data encontrada
            this.renderEstudiantes(data);
          } else {
            this.MensajeAlerta("No se encontro el estudiante filtrado");
            //si no hay datos que pinte todos los datos como siempre
            this.renderEstudiantes();
          }
        } else if (data.code == 500) {
          await this.MensajeAlerta(data.msg);
        }
      }
    });
  }

  async mensajeParaInactivar(codpersonal) {
    const respuesta = await Swal.fire({
      title: "Estas seguro que quiere inactivar a este estudiante?",
      text: "Luego ya no se podra revertir la operacion!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Inactivar",
    });

    if (respuesta.value) {
      this.inactivarEstudiante(codpersonal);
    } else {
      Swal.fire("Mensaje", "Ok", "info");
    }
  }
}
