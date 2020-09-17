export default class ProgramaService {
  constructor() {
    this.URL = "http://localhost:3000/programacion";
  }

  async ObtenerCarreras() {
    const resultado = await fetch(this.URL + "/carreras");
    return await resultado.json();
  }

  async ObtenerModulos() {
    const resultado = await fetch(this.URL + "/modulos");
    return await resultado.json();
  }

  async ObtenerProfesores() {
    const resultado = await fetch(this.URL + "/profesores");
    return await resultado.json();
  }

  async ObtenerTurnos() {
    const resultado = await fetch(this.URL + "/turnos");
    return await resultado.json();
  }

  async ObtenerAulas() {
    const resultado = await fetch(this.URL + "/aulas");
    return await resultado.json();
  }

  async FiltradoCursos(filtro) {
    const resultado = await fetch(this.URL + "/filtradocursos", {
      headers: { "content-type": "application/json" },
      method: "POST",
      body: JSON.stringify(filtro),
    });
    return await resultado.json();
  }
}
