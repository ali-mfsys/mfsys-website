import { describe, expect, it } from "vitest";
import { solutions, products } from "../lib/site-data";

describe("MFSYS site data", () => {
  it("uses unique canonical solution URLs", () => {
    const urls = solutions.map(([, , url]) => url);
    expect(new Set(urls).size).toBe(urls.length);
    expect(urls.every((url) => /^\/solutions\/[a-z0-9-]+$/.test(url))).toBe(true);
  });

  it("uses unique canonical product URLs", () => {
    const urls = products.map(([, , url]) => url);
    expect(new Set(urls).size).toBe(urls.length);
    expect(urls.every((url) => /^\/products\/[a-z0-9-]+$/.test(url))).toBe(true);
  });
});