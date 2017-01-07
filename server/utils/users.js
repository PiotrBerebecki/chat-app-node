// add a user
// remove a user
// fetch a user
// get user list from a room

class Users {
  constructor() {
    this.users = [];
  }
  
  addUser(id, name, room) {
    const user = {id, name, room};
    this.users.push(user);
    return user;
  }
  
  removeUser(id) {
    let removedUser;
    let updatedUsers = [];
    
    this.users.forEach(user => {
      if (user.id === id) {
        removedUser = user;
      } else {
        updatedUsers.push(user);
      }
    });
    
    this.users = updatedUsers;
    return removedUser;
  }
  
  getUser(id) {
    return this.users.find(user => user.id === id);
  }
  
  getUserList(room) {
    return this.users
      .filter(user => user.room === room)
      .map(user => user.name);
  }
}

module.exports = {Users};
