import mysql from "mysql2";

export default class Config {
  //me devuleve una promesa de pool
  public static async getConex() {
    const pool = mysql.createPool({
      host: "127.0.0.1",
      user: "root",
      password: "",
      dateStrings: true,
      database: "db_iisep",
      connectionLimit: 5,
    });
    const promisePool = pool.promise();
    return promisePool;
  }
}
