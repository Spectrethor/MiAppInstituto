export default class InscripcionesServices {
  constructor() {
    this.URL = "http://localhost:3000/inscripcion";
    this.token = localStorage.getItem("tokenUser");
  }

  async buscarUsuarioEstudiante(usuario) {
    const respuesta = await fetch(this.URL + "/usuario", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: this.token,
      },
      body: usuario,
    });
    return await respuesta.json();
  }

  async FiltraProgramacionMesyAnio(data) {
    const respuesta = await fetch(this.URL + "/mesyanio", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: this.token,
      },
      body: data,
    });
    return await respuesta.json();
  }

  async llenarTurnoDistintos(data) {
    const respuesta = await fetch(this.URL + "/mesyanio/turno", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: this.token,
      },
      body: data,
    });
    return await respuesta.json();
  }

  async llenaroCarrerasDistintas(data) {
    const respuesta = await fetch(this.URL + "/mesyanio/carreras", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: this.token,
      },
      body: data,
    });
    return await respuesta.json();
  }

  async crearProgramacion(data) {
    const respuesta = await fetch(this.URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: this.token,
      },
      body: data,
    });
    return await respuesta.json();
  }
}
