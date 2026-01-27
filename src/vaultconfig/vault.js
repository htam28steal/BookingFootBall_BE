const vault = require("node-vault")({
  endpoint: process.env.VAULT_ADDR,
});

async function loadDbSecret() {
  // login bằng AppRole
  const login = await vault.approleLogin({
    role_id: process.env.VAULT_ROLE_ID,
    secret_id: process.env.VAULT_SECRET_ID,
  });

  vault.token = login.auth.client_token;

  // đọc secret DB
  const result = await vault.read("secret/data/test/booking-db");

  return {
    user: result.data.data.db_user,
    password: result.data.data.db_pass,
  };
}

module.exports = loadDbSecret;
