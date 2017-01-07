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
}

// const list = new Users();

// console.log('start', list.users);

// list.addUser(1, 'Pete', 'React');
// console.log('addUser', list.users);

module.exports = {Users};





