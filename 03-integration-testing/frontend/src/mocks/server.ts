import { setupServer } from "msw/node";
import { handlers } from "./handlers";

// Configure a request mocking server with our handlers
export const server = setupServer(...handlers);
