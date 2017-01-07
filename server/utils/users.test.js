const expect = require('expect');

const { Users } = require('./users');

describe('Users', () => {
  
  it('should add new user', () => {
    const someUser = {
      id: '123',
      name: 'Pete',
      room: 'React'
    };
    
    const roomUsers = new Users();
    const addedUser = roomUsers.addUser(someUser.id, someUser.name, someUser.room);
    
    expect(roomUsers.users).toEqual([someUser]);   
  });
  
});
