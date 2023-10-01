import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { employees } from "../schemas/employee.ts";

export class EmployeeRepo {
  private db: PostgresJsDatabase<Record<string, never>>;
  private client: postgres.Sql<{}>;
 
  public constructor(
    db: PostgresJsDatabase<Record<string, never>>,
    client: postgres.Sql<{}>)
  {
    this.db = db;
    this.client = client;
  }
 
  public async getAllEmployees() {
    return await this.db.select().from(employees);
  }

  public async getEmployees() {
    const users: any = await this.client`select * from "Employees"`;
    return users;
  }
}
