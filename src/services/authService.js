const tokenUtils = require('../utils/tokenUtils')
const bcrypt = require('bcryptjs');
const users = require('../data/data.js')
const jwt = require('jsonwebtoken')
const  UserModel  = require('../models/userModels')

const AuthService = {

    generateAccessToken: async (user) => {
        const accesstoken = tokenUtils.generateToken(
            { user },
            process.env.TOKEN_LIFE
        )

        return accesstoken
    },

    generateRefreshToken: async (user) => {

        const refreshToken = tokenUtils.generateRefreshToken(
            { user }
        )

        return refreshToken
    },

    login: async (email, password) => {

        const res = await UserModel.getUserByEmail(email);
        console.log(`res`, res)
        if (!res) throw new Error('User not found');
        const user = res;

        const isMatch = password === user.password;


        if (!isMatch) throw new Error('Invalid password');
        const accesstoken = await AuthService.generateAccessToken(user);
        const refreshToken = await AuthService.generateRefreshToken(user);
        return {
            user: {
                name: user.email,
                accessToken: accesstoken,
                refreshToken: refreshToken
            }
        }
    },


    refreshToken: async (refreshToken) => {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
        const payload = { id: decoded.id, email: decoded.email }
        const newAccessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '7d'
        });

        console.log(`USER `, { User: payload });

        return newAccessToken;

    }

}
module.exports = AuthService; 