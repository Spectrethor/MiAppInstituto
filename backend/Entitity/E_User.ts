import moment from "moment";

export default class E_User {
  private cod_user: number;
  private usuario: string;
  private contra: string;
  private fecha_creacion: string;
  private fecha_actualizacion: string;

  constructor() {
    this.cod_user = 0;
    this.usuario = "";
    this.contra = "";
    this.fecha_creacion =
      moment().format("YYYY-MM-DD") + " " + moment().format("hh:mm:ss");
    this.fecha_actualizacion =
      moment().format("YYYY-MM-DD") + " " + moment().format("hh:mm:ss");
  }

  public getCod_user(): number {
    return this.cod_user;
  }

  public setCod_user(cod_user: number): void {
    this.cod_user = cod_user;
  }

  public getUsuario(): string {
    return this.usuario;
  }

  public setUsuario(usuario: string): void {
    this.usuario = usuario;
  }

  public getContra(): string {
    return this.contra;
  }

  public setContra(contra: string): void {
    this.contra = contra;
  }

  public getFecha_creacion(): string {
    return this.fecha_creacion;
  }

  public setFecha_creacion(fecha_creacion: string): void {
    this.fecha_creacion = fecha_creacion;
  }

  public getFecha_actualizacion(): string {
    return this.fecha_actualizacion;
  }

  public setFecha_actualizacion(fecha_actualizacion: string): void {
    this.fecha_actualizacion = fecha_actualizacion;
  }
}
