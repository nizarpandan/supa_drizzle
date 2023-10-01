import { Hono } from "hono";
import { EmployeeRepo } from "../infrastructure/postgresql/repository/employeeRepo.ts";


export class EmployeeApi {
  private employeeRepo: EmployeeRepo;

  constructor (employeeRepo: EmployeeRepo) {
    this.employeeRepo = employeeRepo;
  }

  public apiRoutes() {
    const companyApi = new Hono().basePath('/employee');

    companyApi.get('/', async (c) => {
      const employees = await this.employeeRepo.getAllEmployees();
      return c.json(employees);
    });

    companyApi.get('/:id', async (c) => {
      const id = c.req.param('id');
      return c.text(`employee id is ${id}`);
    });

    return companyApi;
  }
}
