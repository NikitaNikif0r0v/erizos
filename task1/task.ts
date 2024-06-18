const myParseInt = (str: string): number => {
  return parseInt(str, 10);
};

console.log("test1", myParseInt("123") + 2);
console.log("test2", myParseInt("abc") + 2);
