export default class LoginServices {
  constructor() {
    this.URL = "http://localhost:3000/usuario";
  }

  async loginPersonal(payload) {
    const respuesta = await fetch(this.URL + "/loginpersonal", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: payload,
    });
    return await respuesta.json();
  }

  async loginEstudiante(payload) {
    const respuesta = await fetch(this.URL + "/loginestudiante", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: payload,
    });

    return await respuesta.json();
  }
}
