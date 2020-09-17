import moment from "moment";
export default class E_Pagos {
  private codrecibo: number;
  private nroRecibo: number;
  private cod_inscripcion: number;
  private pago_realizado: number;
  private total: number;
  private fecha_pago: string;
  private cod_personal: number;

  public getCodrecibo(): number {
    return this.codrecibo;
  }

  public setCodrecibo(codrecibo: number): void {
    this.codrecibo = codrecibo;
  }

  public getNroRecibo(): number {
    return this.nroRecibo;
  }

  public setNroRecibo(nroRecibo: number): void {
    this.nroRecibo = nroRecibo;
  }

  public getCod_inscripcion(): number {
    return this.cod_inscripcion;
  }

  public setCod_inscripcion(cod_inscripcion: number): void {
    this.cod_inscripcion = cod_inscripcion;
  }

  public getTotal(): number {
    return this.total;
  }

  public setTotal(total: number): void {
    this.total = total;
  }

  public getFecha_pago(): string {
    return this.fecha_pago;
  }

  public setFecha_pago(fecha_pago: string): void {
    this.fecha_pago = fecha_pago;
  }

  public getPago_realizado(): number {
    return this.pago_realizado;
  }

  public setPago_realizado(pago_realizado: number): void {
    this.pago_realizado = pago_realizado;
  }

  public getCod_personal(): number {
    return this.cod_personal;
  }

  public setCod_personal(cod_personal: number): void {
    this.cod_personal = cod_personal;
  }

  constructor() {
    this.codrecibo = 0;
    this.nroRecibo = 0;
    this.cod_inscripcion = 0;
    this.pago_realizado = 0;
    this.total = 0;
    this.fecha_pago =
      moment().format("YYYY-MM-DD") + " " + moment().format("hh:mm:ss");
    this.cod_personal = 0;
  }
}
