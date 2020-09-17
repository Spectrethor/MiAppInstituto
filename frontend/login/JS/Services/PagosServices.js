export default class PagosServices {
  constructor() {
    this.URL = "http://localhost:3000/pagos";
    this.token = localStorage.getItem("tokenUser");
  }

  async registrarPago(data) {
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

  async filtrarInscripcionxEstado(data) {
    const respuesta = await fetch(this.URL + "/filtrar/estado", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: this.token,
      },
      body: data,
    });
    return await respuesta.json();
  }

  async filtrarInscripcionxEstadoyUsuario(data) {
    const respuesta = await fetch(this.URL + "/filtrar/usuarioyestado", {
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
