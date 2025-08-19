
const userDATA = [
    {
        email: 'tam@gmail.com',
        name: 'Thanh Tam',
        age: '22',
        address: 'Long Hai'
    },
    {
        email: 'thuytrang23',
        name: 'Thuy Trang',
        age: '23',
        address: 'Bien Hoa'
    }

]

const userService = require('../services/userService')


const UserController = {
    async getUser(req, res, next) {

        const user = req.user
        const inforUser = userDATA.find(u => u.email === req.user.email);

        if (!inforUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            name: inforUser.name,
            age: inforUser.age,
            address: inforUser.address
        });
    }
}
module.exports = UserController;