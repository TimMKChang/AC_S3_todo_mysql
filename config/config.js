module.exports = {
  development: {
    username: "root",
    password: "password",
    database: "todo_mysql",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DB,
    host: process.env.SQL_HOST,
    dialect: "mysql",
    operatorsAliases: false
  }
};