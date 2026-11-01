# 📘 Sổ Tay Tổng Hợp TypeScript Toàn Diện (TypeScript Cheat Sheet)

> Tài liệu tóm tắt ngắn gọn, trực quan và dễ nhớ toàn bộ kiến thức TypeScript cốt lõi từ cơ bản đến nâng cao.

---

## 📑 Mục Lục Nhanh
1. [Khởi tạo & Cấu hình (`tsconfig.json`)](#1-khởi-tạo--cấu-hình-tsconfigjson)
2. [Các Kiểu Dữ Liệu Cơ Bản (Primitives)](#2-các-kiểu-dữ-liệu-cơ-bản-primitives)
3. [Mảng (Arrays) & Bộ Dữ Liệu (Tuples)](#3-mảng-arrays--bộ-dữ-liệu-tuples)
4. [Kiểu Đối Tượng & Chữ Ký Chỉ Mục (Objects & Index Signatures)](#4-kiểu-đối-tượng--chữ-ký-chỉ-mục-objects--index-signatures)
5. [Kiểu Liệt Kê (Enums)](#5-kiểu-liệt-kê-enums)
6. [`type` vs `interface` & Hợp kiểu (Union/Intersection)](#6-type-vs-interface--hợp-kiểu-unionintersection)
7. [Hàm (Functions)](#7-hàm-functions)
8. [Ép Kiểu (Type Casting)](#8-ép-kiểu-type-casting)
9. [Lớp & Hướng Đối Tượng (Classes)](#9-lớp--hướng-đối-tượng-classes)
10. [Generics (Kiểu Tham Số Hóa)](#10-generics-kiểu-tham-số-hóa)
11. [Các Kiểu Tiện Ích (Utility Types) & `keyof`](#11-các-kiểu-tiện-ích-utility-types--keyof)
12. [Xử lý Null/Undefined & Thu Hẹp Kiểu (Type Guards)](#12-xử-lý-nullundefined--thu-hẹp-kiểu-type-guards)
13. [Kiểu Nâng Cao (Conditional, Mapped, Template Literals)](#13-kiểu-nâng-cao-conditional-mapped-template-literals)
14. [Lập Trình Bất Đồng Bộ & Xử Lý Lỗi (Async & Errors)](#14-lập-trình-bất-đồng-bộ--xử-lý-lỗi-async--errors)
15. [Ứng Dụng Thực Tế (Node.js, React, JSDoc, Decorators)](#15-ứng-dụng-thực-tế-nodejs-react-jsdoc-decorators)
16. [10 Nguyên Tắc Vàng (Best Practices)](#16-10-nguyên-tắc-vàng-best-practices)

---

## 1. Khởi tạo & Cấu hình (`tsconfig.json`)

```bash
npm init -y
npm install typescript @types/node --save-dev
npx tsc --init
```

### Cấu hình chuẩn (`tsconfig.json`):
```json
{
  "compilerOptions": {
    "target": "ES2020",             // Phiên bản JS xuất ra
    "module": "commonjs",           // Hệ thống module (hoặc "nodenext" / "esnext")
    "rootDir": "./src",             // Thư mục chứa code TypeScript
    "outDir": "./dist",             // Thư mục chứa code JS sau khi build
    "strict": true,                 // BẬT TOÀN BỘ KIỂM TRA NGHIÊM NGẶT
    "noImplicitAny": true,          // Không cho phép biến tự nhận kiểu 'any'
    "strictNullChecks": true,       // Bắt buộc kiểm tra null/undefined
    "esModuleInterop": true,        // Tương thích import ES Module và CommonJS
    "skipLibCheck": true,           // Bỏ qua kiểm tra type của thư viện node_modules
    "sourceMap": true               // Sinh map để debug trực tiếp trên file .ts
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

---

## 2. Các Kiểu Dữ Liệu Cơ Bản (Primitives)

```typescript
let isDone: boolean = true;
let age: number = 25;                       // Số nguyên, số thực (3.14), hex (0xf00d)
let name: string = `Hello, ${age}`;         // Nháy đơn, nháy kép, backtick
let bigNum: bigint = 9007199254740991n;     // Số cực lớn (ES2020+)
let sym: symbol = Symbol("id");             // Khóa định danh độc nhất

// Suy luận kiểu (Type Inference): Để TS tự đoán khi giá trị đã rõ ràng
let count = 10; // TS tự gán kiểu 'number', không cần viết `: number`
```

---

## 3. Mảng (Arrays) & Bộ Dữ Liệu (Tuples)

| Cấu trúc | Cú pháp | Đặc điểm |
| :--- | :--- | :--- |
| **Array** | `string[]` hoặc `Array<string>` | Danh sách độ dài động, các phần tử cùng kiểu |
| **Readonly Array** | `readonly number[]` | Mảng chỉ đọc, cấm `.push()`, `.pop()`, sửa phần tử |
| **Tuple** | `[string, number]` | Cố định độ dài và kiểu tại từng vị trí (*index*) |
| **Named Tuple** | `[x: number, y: number]` | Tuple có nhãn chú thích ý nghĩa tọa độ |
| **Readonly Tuple** | `readonly [string, number]` | Cấm thêm phần tử ngoài độ dài khai báo ban đầu |

```typescript
// Mảng & Readonly
const skills: string[] = ["TS", "JS"];
const nums: readonly number[] = [1, 2, 3];
// nums.push(4); // ❌ Lỗi

// Tuple & Named Tuple
let user: [string, number] = ["Alice", 25];
const coords: [x: number, y: number] = [10.5, 20.3];
const [x, y] = coords; // Phân rã (destructuring)
```

---

## 4. Kiểu Đối Tượng & Chữ Ký Chỉ Mục (Objects & Index Signatures)

```typescript
// 1. Khai báo Object & Thuộc tính tùy chọn (?)
interface Car {
  brand: string;
  year: number;
  mileage?: number; // Tùy chọn (có hoặc không)
}

// 2. Chữ ký chỉ mục (Index Signature) - Cho object có key động
interface Dict {
  [key: string]: string; // Bất kỳ key chuỗi nào cũng phải trả về string
}
const dict: Dict = { en: "English", vi: "Vietnamese" };

// 3. Kết hợp key cố định + key động
interface ApiResponse {
  status: number;
  [key: string]: any; // Key khác thoải mái
}
```

---

## 5. Kiểu Liệt Kê (Enums)

```typescript
// 1. Numeric Enum (Tự động tăng từ 0, hoặc từ giá trị chỉ định)
enum Direction {
  Up = 1, // 1
  Down,   // 2
  Left,   // 3
  Right   // 4
}

// 2. String Enum (Khuyên dùng vì tường minh, dễ debug)
enum Status {
  Success = "SUCCESS",
  Error = "ERROR",
  Pending = "PENDING"
}
```

---

## 6. `type` vs `interface` & Hợp kiểu (Union/Intersection)

### So sánh nhanh:
* **`interface`**: Dành riêng cho **Object / Class**, có khả năng mở rộng bằng `extends` và tự **gộp khai báo** (*Declaration Merging*).
* **`type`**: Dành cho **tất cả mọi thứ**: Union (`|`), Intersection (`&`), Tuple, Primitives, Mapped types.

```typescript
// Union (|) - Hoặc cái này hoặc cái kia
type Status = "idle" | "loading" | "success" | "error";
type ID = string | number;

// Intersection (&) - Gộp thuộc tính của cả hai
type Person = { name: string };
type Employee = Person & { employeeId: number };

// Interface kế thừa
interface Animal { name: string; }
interface Dog extends Animal { bark(): void; }

// Interface tự động gộp (Merging)
interface User { name: string; }
interface User { age: number; }
// -> User có cả name và age
```

---

## 7. Hàm (Functions)

```typescript
// Tham số tường minh, kiểu trả về, tham số tùy chọn (?) và mặc định (=)
function add(a: number, b: number = 0, c?: number): number {
  return a + b + (c ?? 0);
}

// Hàm không trả về giá trị (void)
function log(msg: string): void {
  console.log(msg);
}

// Rest parameters (gom tham số)
function sum(...nums: number[]): number {
  return nums.reduce((a, b) => a + b, 0);
}

// Type Alias cho chữ ký hàm (Function signature)
type MathOp = (x: number, y: number) => number;
const multiply: MathOp = (x, y) => x * y;
```

---

## 8. Ép Kiểu (Type Casting)

```typescript
// 1. Từ khóa 'as' (Khuyên dùng)
let rawData: unknown = "Hello TypeScript";
let len: number = (rawData as string).length;

// 2. Cú pháp angle-bracket '<>' (Không dùng trong file React .tsx)
let strLen: number = (<string>rawData).length;

// 3. Ép kiểu cưỡng chế (Force casting khi 2 kiểu không liên quan)
let num = ((rawData as unknown) as number);
```

---

## 9. Lớp & Hướng Đối Tượng (Classes)

### Phạm vi truy cập (Access Modifiers):
* `public`: (Mặc định) Truy cập ở mọi nơi.
* `private`: Chỉ truy cập trong nội bộ lớp đó.
* `protected`: Truy cập trong nội bộ lớp đó và **các lớp con kế thừa**.

```typescript
abstract class Animal {
  // Parameter Property: Viết tắt khai báo & gán thuộc tính ngay trong constructor
  constructor(protected name: string, private readonly id: number) {}

  abstract makeSound(): void; // Lớp con bắt buộc phải cài đặt
}

class Dog extends Animal {
  constructor(name: string, id: number) {
    super(name, id);
  }

  // Ghi đè phương thức an toàn
  public override makeSound(): void {
    console.log(`${this.name}: Gâu gâu`);
  }
}
```

---

## 10. Generics (Kiểu Tham Số Hóa `<T>`)

Generics biến hàm, class, interface thành các khuôn mẫu tái sử dụng cho nhiều kiểu dữ liệu khác nhau.

```typescript
// 1. Hàm Generic
function getFirst<T>(arr: T[]): T {
  return arr[0];
}
const n = getFirst([1, 2, 3]);       // T là number
const s = getFirst(["a", "b", "c"]); // T là string

// 2. Ràng buộc Generic (Constraints với 'extends')
function logWithId<T extends { id: number }>(item: T): void {
  console.log("ID:", item.id);
}

// 3. Interface Generic có giá trị mặc định
interface ApiResponse<T = any> {
  data: T;
  status: number;
}
```

---

## 11. Các Kiểu Tiện Ích (Utility Types) & `keyof`

Cho kiểu đối tượng `type User = { id: number; name: string; email?: string }`:

| Utility Type | Ý nghĩa | Kết quả minh họa |
| :--- | :--- | :--- |
| **`Partial<T>`** | Biến tất cả thuộc tính thành **tùy chọn (`?`)** | `{ id?: number; name?: string; email?: string }` |
| **`Required<T>`** | Biến tất cả thuộc tính thành **bắt buộc** | `{ id: number; name: string; email: string }` |
| **`Readonly<T>`** | Biến tất cả thành **chỉ đọc** | `{ readonly id: number; ... }` |
| **`Pick<T, K>`** | **Chỉ lấy** một số thuộc tính chỉ định | `Pick<User, "id" \| "name">` |
| **`Omit<T, K>`** | **Loại bỏ** các thuộc tính chỉ định | `Omit<User, "email">` |
| **`Record<K, V>`** | Tạo object với key thuộc `K` và value thuộc `V` | `Record<string, number>` $\rightarrow$ `{ [k: string]: number }` |
| **`Exclude<T, U>`** | Loại trừ kiểu trong Union | `Exclude<string \| number, string>` $\rightarrow$ `number` |
| **`ReturnType<T>`** | Lấy kiểu trả về của hàm | `ReturnType<() => number>` $\rightarrow$ `number` |
| **`Parameters<T>`** | Lấy danh sách kiểu tham số của hàm | `Parameters<(a: string, b: number) => void>` $\rightarrow$ `[string, number]` |

### Toán tử `keyof`:
```typescript
interface User { id: number; name: string; }
type UserKey = keyof User; // "id" | "name"

function getProp(user: User, key: keyof User) {
  return user[key]; // An toàn tuyệt đối, không sợ typo sai tên key
}
```

---

## 12. Xử lý Null/Undefined & Thu Hẹp Kiểu (Type Guards)

```typescript
// 1. Optional Chaining (?.) & Nullish Coalescing (??)
const city = user?.address?.city ?? "Chưa có địa chỉ";

// 2. Toán tử khẳng định không Null (!) - Dùng khi chắc chắn 100% không null
const el = document.getElementById("app")!;

// 3. Type Guards chuẩn (Narrowing)
function handle(val: string | number | Date) {
  if (typeof val === "string") val.toUpperCase();       // typeof (kiểu nguyên thủy)
  else if (typeof val === "number") val.toFixed(2);
  else if (val instanceof Date) val.getTime();          // instanceof (class/đối tượng)
}

// 4. Kiểm tra sự tồn tại của thuộc tính ('in')
if ("bark" in pet) pet.bark();

// 5. Hàm bảo vệ kiểu do người dùng tự tạo (Type Predicate: 'val is Type')
function isString(val: unknown): val is string {
  return typeof val === "string";
}

// 6. Hàm khẳng định kiểu (Assertion Function)
function assertString(val: unknown): asserts val is string {
  if (typeof val !== "string") throw new Error("Không phải chuỗi!");
}
```

---

## 13. Kiểu Nâng Cao (Conditional, Mapped, Template Literals)

### 13.1. Conditional Types & từ khóa `infer`
$$\text{T extends U ? X : Y}$$
```typescript
// Kiểm tra điều kiện kiểu
type IsString<T> = T extends string ? true : false;

// 'infer': Tự động bóc tách kiểu con
type UnpackArray<T> = T extends (infer U)[] ? U : T;
type Num = UnpackArray<number[]>; // number
```

### 13.2. Mapped Types (Biến đổi đồng loạt thuộc tính)
```typescript
// Biến tất cả thuộc tính thành boolean
type Flags<T> = {
  [K in keyof T]: boolean;
};

// Thêm/Xóa modifier (+ / -)
type Mutable<T> = {
  -readonly [K in keyof T]-?: T[K]; // Bỏ readonly và bỏ dấu '?'
};
```

### 13.3. Template Literal Types (Chuỗi mẫu cấp độ kiểu)
```typescript
type Direction = "top" | "bottom";
type Alignment = "left" | "right";
type Position = `${Direction}-${Alignment}`; // "top-left" | "top-right" | ...

// Event name tự động tạo
type EventName = `on${Capitalize<"click" | "hover">}`; // "onClick" | "onHover"
```

---

## 14. Lập Trình Bất Đồng Bộ & Xử Lý Lỗi (Async & Errors)

```typescript
// 1. Định kiểu cho Promise & Async/Await
async function fetchUser(id: number): Promise<User> {
  const res = await fetch(`/api/user/${id}`);
  if (!res.ok) throw new Error("Lỗi mạng");
  return res.json() as Promise<User>;
}

// 2. Chạy song song bảo toàn kiểu với Promise.all
const [user, posts] = await Promise.all([fetchUser(1), fetchPosts(1)]);

// 3. Bắt lỗi chuẩn mực (TypeScript 4.0+ catch error có kiểu 'unknown')
try {
  await fetchUser(999);
} catch (error: unknown) {
  if (error instanceof Error) {
    console.error(error.message);
  } else {
    console.error("Lỗi không xác định:", error);
  }
}
```

---

## 15. Ứng Dụng Thực Tế (Node.js, React, JSDoc, Decorators)

### 15.1. React với TypeScript
```tsx
type ButtonProps = {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
};

export const Button = ({ label, onClick, children }: ButtonProps) => {
  const [count, setCount] = React.useState<number>(0);
  const inputRef = React.useRef<HTMLInputElement>(null);

  return <button onClick={onClick}>{label} ({count})</button>;
};
```

### 15.2. Node.js & Mở rộng kiểu (Declaration Merging)
```typescript
// Mở rộng kiểu Request của Express để lưu user đã đăng nhập
declare global {
  namespace Express {
    interface Request {
      user?: { id: number; role: string };
    }
  }
}
```

### 15.3. JSDoc Type-checking (Dành cho file `.js` thuần)
```javascript
// @ts-check
/**
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function sum(a, b) {
  return a + b;
}
```

### 15.4. Decorators
```typescript
// Bật "experimentalDecorators": true trong tsconfig.json
function Log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const origin = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(`Gọi hàm ${propertyKey}`);
    return origin.apply(this, args);
  };
}
```

---

## 16. 10 Nguyên Tắc Vàng (Best Practices)

1. 🛡️ **Luôn bật `"strict": true`** ngay từ đầu dự án trong `tsconfig.json`.
2. 🚫 **Nói không với `any`**: Sử dụng `unknown` nếu chưa rõ kiểu, kèm Type Guard để kiểm tra.
3. 🧠 **Để TS tự suy luận kiểu** cho các biến đơn giản; chỉ khai báo tường minh cho **tham số hàm** và **Public API**.
4. 📦 **`interface` cho Đối tượng/Class, `type` cho Union/Tuple/Primitive**.
5. ⚡ **Dùng `import type`** khi chỉ lấy kiểu dữ liệu để tối ưu kích thước bundle JavaScript.
6. 🔒 **Luôn dùng `?.` và `??`** thay vì `||` khi xử lý các giá trị có khả năng bị `null` hoặc `undefined`.
7. 🚀 **Dùng `Promise.all`** cho các tác vụ bất đồng bộ độc lập để chạy song song.
8. 🎯 **Dùng `as const`** để cố định các hằng số hoặc cấu hình nhằm lấy được kiểu literal chặt chẽ nhất.
9. 📂 **Đặt tên file theo chuẩn `kebab-case`** kèm hậu tố vai trò rõ ràng: `user.service.ts`, `user.model.ts`.
10. 🔄 **Chuyển đổi từ JS sang TS từng bước một (*Gradual Migration*)**: Dùng `"allowJs": true` để đổi từng file mà không làm sập dự án.
