import moment from "moment";
export default class E_Personal {
  private codpersonal: number;
  private doc_identidad: string;
  private nombres: string;
  private apellidos: string;
  private sexos: string;
  private fecha_nacimiento: string;
  private domicilio: string;
  private cod_estado_civil: string;
  private telefono: string;
  private correo_electronico: string;
  private fecha_creacion: string;
  private fecha_actu: string;
  private cod_user: number;
  private estado: number;
  private cod_Rol: number;

  constructor() {
    this.codpersonal = 0;
    this.doc_identidad = "";
    this.apellidos = "";
    this.nombres = "";
    this.sexos = "";
    this.fecha_nacimiento = "";
    this.cod_estado_civil = "";
    this.domicilio = "";
    this.telefono = "";
    this.correo_electronico = "";
    this.cod_Rol = 0;
    this.fecha_creacion =
      moment().format("YYYY-MM-DD") + " " + moment().format("hh:mm:ss");
    this.fecha_actu =
      moment().format("YYYY-MM-DD") + " " + moment().format("hh:mm:ss");
    this.estado = 1;
    this.cod_user = 0;
  }

  public getCodpersonal(): number {
    return this.codpersonal;
  }

  public setCodpersonal(codpersonal: number): void {
    this.codpersonal = codpersonal;
  }

  public getDoc_identidad(): string {
    return this.doc_identidad;
  }

  public setDoc_identidad(doc_identidad: string): void {
    this.doc_identidad = doc_identidad;
  }

  public getApellidos(): string {
    return this.apellidos;
  }

  public setApellidos(apellidos: string): void {
    this.apellidos = apellidos;
  }

  public getNombres(): string {
    return this.nombres;
  }

  public setNombres(nombres: string): void {
    this.nombres = nombres;
  }

  public getSexos(): string {
    return this.sexos;
  }

  public setSexos(sexos: string): void {
    this.sexos = sexos;
  }

  public getFecha_nacimiento(): string {
    return this.fecha_nacimiento;
  }

  public setFecha_nacimiento(fecha_nacimiento: string): void {
    this.fecha_nacimiento = fecha_nacimiento;
  }

  public getCod_estado_civil(): string {
    return this.cod_estado_civil;
  }

  public setCod_estado_civil(cod_estado_civil: string): void {
    this.cod_estado_civil = cod_estado_civil;
  }

  public getDomicilio(): string {
    return this.domicilio;
  }

  public setDomicilio(domicilio: string): void {
    this.domicilio = domicilio;
  }

  public getTelefono(): string {
    return this.telefono;
  }

  public setTelefono(telefono: string): void {
    this.telefono = telefono;
  }

  public getCorreo_electronico(): string {
    return this.correo_electronico;
  }

  public setCorreo_electronico(correo_electronico: string): void {
    this.correo_electronico = correo_electronico;
  }

  public getEstado(): number {
    return this.estado;
  }

  public setEstado(estado: number): void {
    this.estado = estado;
  }

  public getCod_user(): number {
    return this.cod_user;
  }

  public setCod_user(cod_user: number): void {
    this.cod_user = cod_user;
  }

  public getFecha_creacion(): string {
    return this.fecha_creacion;
  }

  public setFecha_creacion(fecha_creacion: string): void {
    this.fecha_creacion = fecha_creacion;
  }

  public getFecha_actu(): string {
    return this.fecha_actu;
  }

  public setFecha_actu(fecha_actu: string): void {
    this.fecha_actu = fecha_actu;
  }

  public getCod_Rol(): number {
    return this.cod_Rol;
  }

  public setCod_Rol(cod_Rol: number): void {
    this.cod_Rol = cod_Rol;
  }
}
