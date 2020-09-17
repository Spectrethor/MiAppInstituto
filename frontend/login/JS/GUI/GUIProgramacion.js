import tblProgramacion from "../../components/Programacion/tblprogramacion.html";
import tblfiltro from "../../components/Programacion/tbl_filtro_Programacion.html";
import frmRegistrarFormulario from "../../components/Programacion/frm_registrarProgramacion.html";
import ProgramacionServices from "../Services/ProgramaService";
export default class GUIProgramacion {
  constructor() {
    this.programaService = new ProgramacionServices();
    document.getElementById("irprogramacion").addEventListener("click", () => {
      let container = document.querySelector(".container");
      container.innerHTML = "";
      const div1 = document.createElement("div");
      div1.className = "row tb_filtro";
      div1.innerHTML = tblfiltro;
      const div2 = document.createElement("div");
      div2.className = "row tb_programacion";
      div2.innerHTML = tblProgramacion;
      container.appendChild(div1);
      container.appendChild(div2);
      this.renderFrmEstudiante();
      this.crearProgramacion();
      this.LLenarcomboboxEnFrmRegistro();
      this.addEventcmb();
    });
  }

  renderFrmEstudiante() {
    const frm = document.getElementById("frm-registrarProgramacion");
    frm.innerHTML = frmRegistrarFormulario;
  }

  async bodyParaCrearProgramacion() {
    let prubeaJson = {};
    let errores = 0;
    document.querySelectorAll(".validarInput").forEach((item) => {
      if (item.value != "") {
        prubeaJson[item.id] = item.value;
      } else {
        errores += 1;
      }
    });
    console.log(prubeaJson);
    // dataJson += "}";
    // if (errores == 0) {
    //   return dataJson;
    // } else {
    //   return Promise.reject(
    //     "Todos los campos deben ser llenados para actualizar el personal"
    //   );
    // }
  }

  crearProgramacion() {
    document
      .getElementById("frm_registrarProgramacion")
      .addEventListener("submit", async (e) => {
        e.preventDefault();

        await this.bodyParaCrearProgramacion();
      });
  }

  async LLenarcomboboxEnFrmRegistro() {
    const cmbcarreras = document.getElementById("carreraRegistro");
    const carreras = await this.programaService.ObtenerCarreras();
    let optioncarreras = "";
    carreras.msg.forEach((c) => {
      optioncarreras += `<option value="${c.id_carreras}">${c.nombre_carreras}</option>`;
    });
    cmbcarreras.innerHTML = optioncarreras;

    const cmbmodulos = document.getElementById("modulosRegistro");
    const modulos = await this.programaService.ObtenerModulos();
    let optionmodulos = "";
    modulos.msg.forEach((c) => {
      optionmodulos += `<option value="${c.cod_mod}">${c.nombre_modulo}</option>`;
    });
    cmbmodulos.innerHTML = optionmodulos;
    //aqui seteamos los datos de para obtener los cursos
    const cod_carrera = cmbcarreras.value;
    const cod_modulo = cmbmodulos.value;
    const data = { cod_carrera, cod_modulo };
    await this.FiltradoCursos(data);

    const cmbprofesores = document.getElementById("profesorRegistro");
    const profesores = await this.programaService.ObtenerProfesores();
    let optioprofesores = "";
    profesores.msg.forEach((c) => {
      optioprofesores += `<option value="${c.cod_personal}">${c.Nombres}</option>`;
    });
    cmbprofesores.innerHTML = optioprofesores;

    const cmbturnos = document.getElementById("turnoRegistro");
    const turnos = await this.programaService.ObtenerTurnos();

    let optionturnos = "";
    turnos.msg.forEach((c) => {
      optionturnos += `<option value="${c.cod_turnos}">${c.descrip}</option>`;
    });
    cmbturnos.innerHTML = optionturnos;

    const cmbaulas = document.getElementById("aulaRegistro");
    const aulas = await this.programaService.ObtenerAulas();
    let optionaulas = "";
    aulas.msg.forEach((c) => {
      optionaulas += `<option value="${c.cod_aula_lab}">${c.descrip}</option>`;
    });
    cmbaulas.innerHTML = optionaulas;
  }

  ///terminar esta parte llamando en cada
  async addEventcmb() {
    const filtro = document.querySelectorAll(".filtrocurso");

    filtro[0].addEventListener("change", async () => {
      const data = {
        cod_carrera: filtro[0].value,
        cod_modulo: filtro[1].value,
      };
      await this.FiltradoCursos(data);
    });

    filtro[1].addEventListener("change", async () => {
      const data = {
        cod_carrera: filtro[0].value,
        cod_modulo: filtro[1].value,
      };
      await this.FiltradoCursos(data);
    });
  }

  async FiltradoCursos(data) {
    const cursosencontrados = await this.programaService.FiltradoCursos(data);
    const cursos = document.getElementById("cursosRegistro");
    let opcionescursos = "";
    cursosencontrados.msg.forEach((c) => {
      opcionescursos += `<option value="${c.cod_curso}">${c.nombre_curso}</option>`;
    });
    cursos.innerHTML = opcionescursos;
  }
}
