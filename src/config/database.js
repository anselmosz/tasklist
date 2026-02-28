import knex from 'knex';
import knexfile from '../../knexfile.js';

const enviroment = process.env.NODE_ENV || "development";

export const conexaoDB = knex(knexfile[enviroment]);