const expect = require('expect');

const { Users } = require('./users');

describe('Users', () => {
  
  
  let seedUsers;
  
  beforeEach('', () => {
    seedUsers = new Users();
    seedUsers.users = [
      { id: '1', name: 'Mike', room: 'Node Course' },
      { id: '2', name: 'Jen', room: 'React Course' },
      { id: '3', name: 'Julie', room: 'Node Course' }
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
  
  
  it('should remove user', () => {
    const expectedUsers = seedUsers.users.slice(1);
    const removedUser = seedUsers.removeUser('1');
    
    expect(seedUsers.users.length).toBe(2);
    expect(seedUsers.users).toEqual(expectedUsers);
  });
  
  
  it('should not remove user if id not found', () => {
    const removedUser = seedUsers.removeUser('42');
    
    expect(seedUsers.users.length).toBe(3);
    expect(removedUser).toBe(undefined);
    // or
    expect(removedUser).toNotExist();
  });
  
  
  it('should get user by id', () => {
    const needle = seedUsers.getUser('2');
    expect(needle).toEqual(seedUsers.users[1]);
  });
  
  
  it('should not get user if id not found', () => {
    const needle = seedUsers.getUser('42');
    expect(needle).toBe(undefined);
    // or
    expect(needle).toNotExist();
  });
  
  
  it('should get names of users in a given room', () => {
    const nodeUsers = seedUsers.getUserList('Node Course');
    expect(nodeUsers).toEqual(['Mike', 'Julie']);
    
    const reactUsers = seedUsers.getUserList('React Course');
    expect(reactUsers).toEqual(['Jen']);
  });
  
});
