let bcrypt = require('bcrypt')
let { insertUser, findUsers, findUserById, editUser, deleteUser } = require('./user.repository')

async function createUser(newUserData) {

    let hashedPassword = await bcrypt.hash(newUserData.password, 10)

    newUserData.password = hashedPassword
    let newUser = await insertUser(newUserData)
    return newUser
}

async function getAllUsers() {
    let users = await findUsers()
    return users
}

async function getUserById(id) {
    
    let user = await findUserById(id)
    if(!user){
        throw Error('User not found')
    }
    return user
}

async function editUserById(id, userData) {
    if(userData.password){
        let hashedPassword = await bcrypt.hash(userData.password, 10)
        userData.password = hashedPassword
    }
    await getUserById(id)
    let updatedUser = await editUser(id, userData)
    return updatedUser
}

async function deleteUserById(id) {
    await getUserById(id)
    await deleteUser(id)
}

module.exports = { createUser, getAllUsers, getUserById, editUserById, deleteUserById }