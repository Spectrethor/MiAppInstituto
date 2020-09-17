export default class E_Programacion {
  private cod_programa: number;
  private anio: number;
  private mes: string;
  private cod_mall: number;
  private cod_profesor: string;
  private cod_turno: string;
  private frecuencia: string;
  private fecha_inicio: string;
  private fecha_final: string;
  private horario: string;
  private cod_aulas_lab: number;

  constructor() {
    this.cod_programa = 0;
    this.anio = 0;
    this.mes = "";
    this.cod_mall = 0;
    this.cod_profesor = "";
    this.cod_turno = "";
    this.frecuencia = "";
    this.fecha_inicio = "";
    this.fecha_final = "";
    this.horario = "";
    this.cod_aulas_lab = 0;
  }

  public getCod_programa(): number {
    return this.cod_programa;
  }

  public setCod_programa(cod_programa: number): void {
    this.cod_programa = cod_programa;
  }

  public getAnio(): number {
    return this.anio;
  }

  public setAnio(anio: number): void {
    this.anio = anio;
  }

  public getMes(): string {
    return this.mes;
  }

  public setMes(mes: string): void {
    this.mes = mes;
  }

  public getCod_mall(): number {
    return this.cod_mall;
  }

  public setCod_mall(cod_mall: number): void {
    this.cod_mall = cod_mall;
  }

  public getCod_profesor(): string {
    return this.cod_profesor;
  }

  public setCod_profesor(cod_profesor: string): void {
    this.cod_profesor = cod_profesor;
  }

  public getCod_turno(): string {
    return this.cod_turno;
  }

  public setCod_turno(cod_turno: string): void {
    this.cod_turno = cod_turno;
  }

  public getFrecuencia(): string {
    return this.frecuencia;
  }

  public setFrecuencia(frecuencia: string): void {
    this.frecuencia = frecuencia;
  }

  public getFecha_inicio(): string {
    return this.fecha_inicio;
  }

  public setFecha_inicio(fecha_inicio: string): void {
    this.fecha_inicio = fecha_inicio;
  }

  public getFecha_final(): string {
    return this.fecha_final;
  }

  public setFecha_final(fecha_final: string): void {
    this.fecha_final = fecha_final;
  }

  public getHorario(): string {
    return this.horario;
  }

  public setHorario(horario: string): void {
    this.horario = horario;
  }

  public getCod_aulas_lab(): number {
    return this.cod_aulas_lab;
  }

  public setCod_aulas_lab(cod_aulas_lab: number): void {
    this.cod_aulas_lab = cod_aulas_lab;
  }
}
