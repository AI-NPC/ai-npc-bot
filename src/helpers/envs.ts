import * as dotenv from "dotenv";
dotenv.config();

export const OPENAI_API_KEY = String(process.env.OPENAI_API_KEY || "");
export const TOKEN = String(process.env.TOKEN || "");
export const APP_ID = String(process.env.APP_ID || "");
export const ENVIRONMENT = String(process.env.ENVIRONMENT || "development");
