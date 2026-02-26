import './src/config/env.js'

export default {
  development: {
    client: process.env.DB_CLIENT,
    connection: {
      host: process.env.DB_HOST,
      port: process.env.PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_USER_PASSWORD,
    }
  },

  staging: {
    client: process.env.DB_CLIENT,
    connection: {
      host: process.env.DB_HOST,
      port: process.env.PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_USER_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10
    },
    // migrations: {
    //   tableName: 'knex_migrations'
    // }
  },

  production: {
    client: '',
    connection: {
      database: '',
      user:     '',
      password: ''
    },
    pool: {
      min: 2,
      max: 10
    },
    // migrations: {
    //   tableName: 'knex_migrations'
    // }
  }
};
