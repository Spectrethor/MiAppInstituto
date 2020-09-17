//clase que enviara la peticiones al servidor
export default class PersonalService {
  constructor() {
    this.URL = "http://localhost:3000/personal";
    this.token = localStorage.getItem("tokenUser");
  }

  async postPersonal(personal) {
    const respuesta = await fetch(this.URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: this.token,
      },
      body: personal,
    });
    return await respuesta.json();
  }

  async getAllPersonal() {
    const respuesta = await fetch(this.URL, {
      headers: { Authorization: this.token },
    });
    return await respuesta.json();
  }

  async getAllPersonalbyCod(cod_personal) {
    const respuesta = await fetch(this.URL + `/${cod_personal}`, {
      headers: { Authorization: this.token },
    });
    return await respuesta.json();
  }

  async getPersonalCodCivil(cod_estado_civil) {
    const respuesta = await fetch(
      this.URL + `/estadocivil/${cod_estado_civil}`,
      {
        headers: { Authorization: this.token },
      }
    );
    return await respuesta.json();
  }

  async getPersonalRolDiferente(codRol) {
    const respuesta = await fetch(this.URL + `/rol/${codRol}`, {
      headers: { Authorization: this.token },
    });
    return await respuesta.json();
  }

  async putPersonal(jsonBody) {
    const respuesta = await fetch(this.URL, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: this.token,
      },
      body: jsonBody,
    });
    return await respuesta.json();
  }

  async inactivarPersonal(codPersonal) {
    const respuesta = await fetch(this.URL + `/${codPersonal}`, {
      method: "DELETE",
      headers: { Authorization: this.token },
    });
    return await respuesta.json();
  }

  async buscarPersonalxDnioUsuario(data) {
    const respuesta = await fetch(this.URL + "/busqueda/DniOUsuario", {
      headers: {
        "content-type": "application/json",
        Authorization: this.token,
      },
      method: "POST",
      body: JSON.stringify(data),
    });

    return await respuesta.json();
  }
}
