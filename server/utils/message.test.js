const expect = require('expect');

const { generateMessage } = require('./message');


describe('generateMessage', () => {
  
  it('should generate correct message object', () => {
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
