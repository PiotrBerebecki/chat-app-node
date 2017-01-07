class Person {
  constructor(name, age) {
    console.log(name, age);
    this.name = name;
    this.age = age;
  }
  
  getUserDesc() {
    return `${this.name} is ${this.age} year(s) old.`;
  }
}

const me = new Person('Pete', 25); // Pete 25

console.log(me.name); // Pete
console.log(me.getUserDesc()); // Pete is 25 year(s) old.
