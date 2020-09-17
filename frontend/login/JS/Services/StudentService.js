//clase que enviara la peticiones al servidor
export default class StudentService {
  constructor() {
    this.URL = "http://localhost:3000/student";
    this.token = localStorage.getItem("tokenUser");
  }

  async postStudent(student) {
    const respuesta = await fetch(this.URL, {
      headers: { Authorization: this.token },
      method: "POST",
      body: student,
    });
    return await respuesta.json();
  }

  async getStudents() {
    const respuesta = await fetch(this.URL, {
      headers: { Authorization: this.token },
    });
    return await respuesta.json();
  }

  async getStudentsBycod(cod_user) {
    const respuesta = await fetch(this.URL + `/${cod_user}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: this.token,
      },
      body: JSON.stringify({ cod_user }),
    });
    return await respuesta.json();
  }

  async getStudentsCodCivil(cod_estado_civil) {
    const respuesta = await fetch(
      this.URL + `/EstadoCivil/${cod_estado_civil}`,
      { headers: { Authorization: this.token }, method: "POST" }
    );
    return await respuesta.json();
  }

  async updateStudentWithImg(student) {
    const respuesta = await fetch(this.URL, {
      headers: { Authorization: this.token },
      method: "PUT",
      body: student,
    });
    return await respuesta.json();
  }

  async updateStudentWithoutImg(student) {
    const respuesta = await fetch(this.URL + "/sinImg", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: this.token,
      },
      body: student,
    });
    return await respuesta.json();
  }

  async inactiveStudent(codEstudiante) {
    console.log(this.token);
    const respuesta = await fetch(this.URL + `/${codEstudiante}`, {
      headers: { Authorization: this.token },
      method: "DELETE",
    });
    return await respuesta.json();
  }

  async buscarxDnioUsuario(data) {
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
