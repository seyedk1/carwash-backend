const { register } = require('./register-controller')
const { login } = require('./login-controller')
const { getAllUsers } = require('./get-all-users-controller')
const { getSingleUser } = require('./get-single-user-controller')
const { editUser } = require('./edit-user-controller')
const { deleteUser } = require('./delete-user-controller')

module.exports = {
    register,
    login,
    getAllUsers,
    getSingleUser,
    editUser,
    deleteUser
}
