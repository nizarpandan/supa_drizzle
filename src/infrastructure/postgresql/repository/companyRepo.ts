import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { companies, Company } from "../schemas/company.ts";
import { eq } from "drizzle-orm";

export class CompanyRepo {
  private db: PostgresJsDatabase<Record<string, never>>;
 
  public constructor(
    db: PostgresJsDatabase<Record<string, never>>)
  {
    this.db = db;
  }
 
  public async getAllCompanies() {
    return await this.db.select().from(companies);
  }

  public async getCompanyById(id: string) {
    return await this.db.select().from(companies).where(eq(companies.id, id));
  }

  public async addCompany(company: Company) {
    await this.db.insert(companies).values(company);
  }

  public async updateCompanyById(id: string, company: Company) {
    await this.db.update(companies)
      .set({
        name: company.name,
        address: company.address,
        city: company.city,
        state:  company.state,
        country: company.country
      })
      .where(eq(companies.id, id));
  }

  public async deleteCompanyById(id: string) {
    await this.db.delete(companies).where(eq(companies.id, id));
  }
}
