const { sql, poolPromise } = require('../config/database');

const UserModel = {
    getUserByEmail: async (email) => {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('email', sql.VarChar, email)
                .query('SELECT * FROM dbo.users WHERE email = @email');

            return result.recordset[0];
        } catch (err) {
            console.error('Error in getUserByEmail:', err);
            throw err;
        }
    }
};

module.exports = UserModel;
