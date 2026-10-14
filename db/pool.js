#! /usr/bin/env node

import pg from "pg";
import dotenv from "dotenv";
import path from "path";

// Tell dotenv to look one level up (../) for the .env file
dotenv.config({ path: path.join(import.meta.dirname, "../.env") });

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;

export default new Pool({ connectionString });
