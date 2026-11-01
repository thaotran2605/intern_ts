// 1. Kiểu Boolean
let isActive: boolean = true;
let hasPermission = false; // TypeScript tự suy luận kiểu 'boolean' (type inference)

console.log("--- 1. Boolean ---");
console.log("isActive:", isActive);
console.log("hasPermission:", hasPermission);

// 2. Kiểu Number
let decimal: number = 6;
let hex: number = 0xf00d; // Thập lục phân (Hexadecimal)
let binary: number = 0b1010; // Nhị phân (Binary)
let octal: number = 0o744; // Bát phân (Octal)
let float: number = 3.14; // Số thực (Floating point)

console.log("\n--- 2. Number ---");
console.log("decimal:", decimal);
console.log("hex:", hex);
console.log("binary:", binary);
console.log("octal:", octal);
console.log("float:", float);

// 3. Kiểu String
let color: string = "blue";
let fullName: string = "John Doe";
let age: number = 30;
let sentence: string = `Hello, my name is ${fullName} and I'll be ${age + 1} next year.`;

console.log("\n--- 3. String ---");
console.log("color:", color);
console.log("sentence:", sentence);

// 4. Kiểu BigInt (ES2020+)
const hugeNumber: bigint = BigInt(9007199254740991);

console.log("\n--- 4. BigInt ---");
console.log("hugeNumber:", hugeNumber.toString());

// 5. Kiểu Symbol
const uniqueKey: symbol = Symbol("description");
const obj = {
  [uniqueKey]: "This is a unique property",
};

console.log("\n--- 5. Symbol ---");
console.log("obj[uniqueKey]:", obj[uniqueKey]);
