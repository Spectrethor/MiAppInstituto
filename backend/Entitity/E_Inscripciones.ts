import moment from "moment";
export default class E_Inscripcion {
  private cod_incrip: number;
  private cod_generado: number;
  private cod_estudiante: number;
  private cod_programacion: number;
  private fecha_inscripcion: string;
  private cod_personal: number;
  private estado: number;

  public getEstado(): number {
    return this.estado;
  }

  public setEstado(estado: number): void {
    this.estado = estado;
  }

  public getCod_incrip(): number {
    return this.cod_incrip;
  }

  public setCod_incrip(cod_incrip: number): void {
    this.cod_incrip = cod_incrip;
  }

  public getCod_generado(): number {
    return this.cod_generado;
  }

  public setCod_generado(cod_generado: number): void {
    this.cod_generado = cod_generado;
  }

  public getCod_estudiante(): number {
    return this.cod_estudiante;
  }

  public setCod_estudiante(cod_estudiante: number): void {
    this.cod_estudiante = cod_estudiante;
  }

  public getCod_programacion(): number {
    return this.cod_programacion;
  }

  public setCod_programacion(cod_programacion: number): void {
    this.cod_programacion = cod_programacion;
  }

  public getFecha_inscripcion(): string {
    return this.fecha_inscripcion;
  }

  public setFecha_inscripcion(fecha_inscripcion: string): void {
    this.fecha_inscripcion = fecha_inscripcion;
  }

  public getCod_personal(): number {
    return this.cod_personal;
  }

  public setCod_personal(cod_personal: number): void {
    this.cod_personal = cod_personal;
  }

  constructor() {
    this.cod_incrip = 0;
    this.cod_generado = 0;
    this.cod_estudiante = 0;
    this.cod_programacion = 0;
    this.fecha_inscripcion =
      moment().format("YYYY-MM-DD") + " " + moment().format("hh:mm:ss");
    this.cod_personal = 0;
    this.estado = 0;
  }
}
