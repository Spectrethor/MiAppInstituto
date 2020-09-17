import loginServices from "../Services/LoginServices";
import vali from "../Validation/validaciones";
export default class Login {
  constructor() {
    this.loginservices = new loginServices();
    this.login();
    vali.validarCamposLogin();
  }

  login() {
    document
      .getElementById("frm-login")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        let errores = "";
        const validaruser = document.querySelectorAll(".validaruser");
        validaruser.forEach((u) => {
          if (u.value === "") {
            errores++;
          }
        });
        const roles = document.getElementById("roles");

        if (errores > 0) {
          this.MensajeAlerta("Todos los campos deben ser llenados");
        } else {
          let payload = {
            usuario: validaruser[0].value,
            contra: validaruser[1].value,
            cod_rol: roles.value,
          };
          if (payload.cod_rol == 3) {
            const respuesta = await this.loginservices.loginEstudiante(
              JSON.stringify(payload)
            );
            localStorage.setItem("tokenUser", respuesta.token);
            if (respuesta.code === 404) {
              Swal.fire({
                title: "Informacion",
                text: respuesta.msg,
                icon: "warning",
                confirmButton: "Ok",
              });
            } else {
              console.log(respuesta);
              this.MensajeLoegueado(respuesta);
            }
          } else {
            const respuesta = await this.loginservices.loginPersonal(
              JSON.stringify(payload)
            );
            localStorage.setItem("tokenUser", respuesta.token);
            console.log(respuesta);
            if (respuesta.code === 404) {
              Swal.fire({
                title: "Informacion",
                text: respuesta.msg,
                icon: "warning",
                confirmButton: "Ok",
              });
            } else {
              this.MensajeLoegueado(respuesta);
            }
          }
        }
      });
  }

  MensajeLoegueado(mensaje) {
    Swal.fire({
      title: "Informacion",
      text: mensaje.msg,
      icon: "success",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Entiendo",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.value) {
        window.location.href = mensaje.nextPage;
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
    }
  }
}
