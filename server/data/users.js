//database functions for user accounts
const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;

const bcrypt = require('bcryptjs');

let exportedMethods = {
  async getAllUsers() {
    const userCollection = await users();
    const userList = await userCollection.find({}).toArray();
    if (!userList) throw 'No users in system!';
    return userList;
  },

  async getUserById(id) {
    const userCollection = await users();
    const user = await userCollection.findOne({_id: id});
    if (!user) throw 'User not found';
    return user;
  },

  async getUserbyEmail(email) {
    const userCollection = await users();
    const user = await userCollection.findOne({email: email});
    return user;
  },


  async getUserbyUsername(username) {
    const userCollection = await users();
    const user = await userCollection.findOne({username: username});
    return user;
  },

  async addUser(firstName, lastName, email, password, username) {
    const userCollection = await users();
    const hashedPassword = await bcrypt.hash(password, 10);

    let newUser = {
      username: username,
      firstName: firstName,
      lastName: lastName,
      email: email,
      location: location,
      password: hashedPassword
    };
    const newInsertInformation = await userCollection.insertOne(newUser);

    console.log(newInsertInformation);
    if (newInsertInformation.insertedCount === 0) throw 'Insert failed!';
    return await this.getUserById(newInsertInformation.insertedId);
  },

  async removeUser(id) {
    const userCollection = await users();
    const deletionInfo = await userCollection.removeOne({_id: id});
    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete user with id of ${id}`;
    }
    return true;
  },

  async updateUser(id, updatedUser) {
    const user = await this.getUserById(id);
    const hashedPassword = bcrypt.hash(updatedUser.password, 10);

    let userUpdateInfo = {
      username : username,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      location: updatedUser.location,
      password: hashedPassword,
    };

    const userCollection = await users();

    const updateInfo = await userCollection.updateOne({_id: id}, {$set: userUpdateInfo});
    if (!updateInfo.matchedCount && !updateInfo.modifiedCount) throw 'Update failed';

    return await this.getUserById(id);
  }
};

module.exports = exportedMethods;
