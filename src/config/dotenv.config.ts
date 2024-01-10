import dotenv from "dotenv";
import { ProcessEnv } from "@interfaces";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();

if (envFound.error) throw new Error("⚠️  Couldn't find .env file  ⚠️");

export const { PORT, NODE_ENV }: ProcessEnv = process.env;
