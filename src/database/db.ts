import { Pool } from 'pg';
import { config } from '../config/config';
const pool = new Pool(config.db);

export async function query(query: string, params?: Array<string | number>) {
    const {rows, fields} = await pool.query(query, params);

    return rows;
}
