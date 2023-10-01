import dotenv from "dotenv";
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { EmployeeRepo } from "./infrastructure/postgresql/repository/employeeRepo.ts";
import { CompanyRepo } from "./infrastructure/postgresql/repository/companyRepo.ts";
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { Api } from "./api/api.ts";

dotenv.config();
const connectionString = process.env.DATABASE_URL;
const client = postgres(connectionString);
const db = drizzle(client);

let companyRepo = new CompanyRepo(db);
let employeeRepo = new EmployeeRepo(db, client);
let api = new Api(
  companyRepo,
  employeeRepo
);
const app = new Hono();
app.get('/', (c) => c.text('Hono!'));
app.route('/', api.apiRoutes());

serve({
  fetch: app.fetch,
  port: +process.env.PORT
});

console.log(`Server is listening on http://localhost:${process.env.PORT}/`);