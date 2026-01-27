const dotenv = require("dotenv");
dotenv.config();

const sql = require("mssql");
const loadDbSecret = require("../vaultconfig/vault");

let pool; // singleton pool

async function initDb() {
  if (pool) return pool; // tránh tạo nhiều pool

  const dbSecret = await loadDbSecret();

  const config = {
    user: dbSecret.user,
    password: dbSecret.password,
    server: process.env.DB_HOST, // MSSQL dùng server
    database: process.env.DB_NAME,
    options: {
      encrypt: false, // true nếu Azure
      trustServerCertificate: true,
    },
  };

  try {
    pool = await sql.connect(config);
    console.log("✅ MSSQL connected with user:", config.user);
    return pool;
  } catch (err) {
    console.error("❌ Database Connection Failed:", err);
    throw err;
  }
}

module.exports = {
  sql,
  initDb,
};
