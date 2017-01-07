const expect = require('expect');

const { Users } = require('./users');

describe('Users', () => {
  
  
  let seedUsers;
  
  beforeEach('', () => {
    seedUsers = new Users();
    seedUsers.users = [
      { id: 1, name: 'Mike', room: 'Node Course' },
      { id: 2, name: 'Jen', room: 'React Course' },
      { id: 3, name: 'Julie', room: 'Node Course' }
    ];
  });
  
  
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
  
  
  // it('should remove user', () => {
    
  // });
  
  
  it('should return names of users in a given room', () => {
    const nodeUsers = seedUsers.getUserList('Node Course');
    expect(nodeUsers).toEqual(['Mike', 'Julie']);
    
    const reactUsers = seedUsers.getUserList('React Course');
    expect(reactUsers).toEqual(['Jen']);
  });
  
});
