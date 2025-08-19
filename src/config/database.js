const dotenv = require("dotenv")
dotenv.config();

const sql = require("mssql");

const config = {
    user: process.env.DB_USER ,
    password: process.env.DB_PASS ,
    server: process.env.DB_HOST ,
    database: process.env.DB_NAME ,
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('✅ MSSQL connected');
        return pool;
    })
    .catch(err => {
        console.error('❌ Database Connection Failed:', err);
        throw err;
    });

module.exports = {
    sql,
    poolPromise
};
