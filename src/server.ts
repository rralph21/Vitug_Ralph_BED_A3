// export function greet(name: string): string {
//     const message = "Hello, " + name; // Place breakpoint here for debugging
//     console.log(message);
//     return message;
// }

// export function add(a: number, b: number): number {
//     const result = a + b; // Place breakpoint here for debugging
//     return result;
// }

// // Run the function when executed directly
// if (require.main === module) {
//     greet("World");
//     add(5, 3);
// }

import app from "./app";
import { Server } from "http";

const PORT: string | number = process.env.PORT || 3000;

const server: Server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export { server };