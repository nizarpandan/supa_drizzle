import { Hono } from "hono";
import { CompanyRepo } from "../infrastructure/postgresql/repository/companyRepo.ts";
import { EmployeeRepo } from "../infrastructure/postgresql/repository/employeeRepo.ts";
import { CompanyApi } from "./companyApi.ts";
import { EmployeeApi } from "./employeeApi.ts";

export class Api {
  private companyRepo: CompanyRepo;
  private employeeRepo: EmployeeRepo;

  constructor (
    companyRepo: CompanyRepo,
    employeeRepo: EmployeeRepo
  ) {
    this.companyRepo = companyRepo;
    this.employeeRepo = employeeRepo;
  }

  public apiRoutes() {
    let companyApi= new CompanyApi(this.companyRepo);
    let employeeApi= new EmployeeApi(this.employeeRepo);
    const api = new Hono().basePath('/api');
    api.route('/', companyApi.apiRoutes());
    api.route('/', employeeApi.apiRoutes());

    return api;
  }
}