const user = require('../models/userModels')


const UserService = {
    async getUserbyEmail(email) {
        return await user.getUserbyEmail(email)
    }
}
module.exports = UserService;