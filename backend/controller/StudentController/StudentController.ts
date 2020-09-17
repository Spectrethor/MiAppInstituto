import StudentDao from "../../model/StudentDAO/EstudianteDao";
import { Request, Response } from "express";

export default class StudentController {
  private SDAO: StudentDao;

  constructor() {
    this.SDAO = new StudentDao();
  }

  //  createStudent(req:Request,res:Response):Promise<any>{

  //  }
}
