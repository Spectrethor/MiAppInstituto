export default class Validacion {
  static soloNumeros(e) {
    var key = window.event ? e.which : e.keyCode;
    if (key < 48 || key > 57) {
      e.preventDefault();
    }
  }

  static validarCampos() {
    //validacion filtro
    const bus = document.querySelectorAll(".busqueda");

    bus[0].addEventListener("keypress", (e) => this.soloNumeros(e), false);
    bus[1].addEventListener("keypress", (e) => this.soloNumeros(e), false);

    //validacion frm registrar
    document
      .getElementById("doc_identidadRegistro")
      .addEventListener("keypress", (e) => this.soloNumeros(e), false);

    document
      .getElementById("telefonoRegistro")
      .addEventListener("keypress", (e) => this.soloNumeros(e), false);

    //validacion frm actualizar
    document
      .getElementById("doc_identidad")
      .addEventListener("keypress", (e) => this.soloNumeros(e), false);

    document
      .getElementById("telefono")
      .addEventListener("keypress", (e) => this.soloNumeros(e), false);
  }

  static validarCamposInscripciones() {
    //validacion filtro
    const bus = document.querySelectorAll(".busqueda");

    bus[0].addEventListener("keypress", (e) => this.soloNumeros(e), false);
    bus[1].addEventListener("keypress", (e) => this.soloNumeros(e), false);
  }

  static validarCamposLogin() {
    //validacion filtro
    const bus = document.querySelectorAll(".validaruser");

    bus[0].addEventListener("keypress", (e) => this.soloNumeros(e), false);
    // bus[1].addEventListener("keypress", (e) => this.soloNumeros(e), false);
  }
}
