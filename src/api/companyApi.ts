import { Hono } from "hono";
import { CompanyRepo } from "../infrastructure/postgresql/repository/companyRepo.ts";


export class CompanyApi {
  private companyRepo: CompanyRepo;
  constructor (companyRepo: CompanyRepo) {
    this.companyRepo = companyRepo;
  }

  public apiRoutes() {
    const companyApi = new Hono().basePath('/company');

    companyApi.get('/', async (c) => {
      const companies = await this.companyRepo.getAllCompanies();
      return c.json(companies);
    });

    companyApi.get('/:id', async (c) => {
      const id = c.req.param('id');
      return c.text(`company id is ${id}`);
    });

    return companyApi;
  }
}
