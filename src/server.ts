import { App } from './app/app.ts';
import "https://deno.land/x/dotenv/load.ts";
import { DatabaseConnection } from "./app/config/db.ts";
const PORT =  Deno.env.get("PORT") || 8000;
const app = new App(PORT);


const dbName = Deno.env.get("DB_NAME") || "deno_demo";
const dbHostUrl = Deno.env.get("DB_HOST_URL") || "mongodb://localhost:27017";
const db = new DatabaseConnection(dbName, dbHostUrl);
db.connect();
app.listen();