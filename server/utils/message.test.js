const expect = require('expect');

const { generateMessage, generateLocationMessage } = require('./message');


describe('generateMessage', () => {
  
  it('should generate correct chat message object', () => {
    const msg = {
      from: 'Andrew',
      text: 'Hi'
    };
    
    const res = generateMessage(msg.from, msg.text);
    
    expect(res.from).toBe(msg.from);
    expect(res.text).toBe(msg.text);
    expect(res.createdAt).toBeA('number');
  });
  
});


describe('generateLocationMessage', () => {
  
  it('should generate correct message object', () => {
    const from = 'Admin';
    const latitude = 51;
    const longitude = 0;
    const url = `https://www.google.com/maps/?q=${latitude},${longitude}`;
    
    const res = generateLocationMessage(from, latitude, longitude);
    
    expect(res).toInclude({from, url});
    expect(res.createdAt).toBeA('number');
  });
  
});

