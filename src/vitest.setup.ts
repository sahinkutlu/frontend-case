import { afterAll, afterEach, beforeAll } from "vitest";

import "vitest-dom/extend-expect";

import server from "../mocks/server";

import "./index.css";

// Establish API mocking before all tests.

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
