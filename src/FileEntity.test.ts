import { describe, expect, it } from "vitest";
import FileEntity from "./FileEntity";

describe("FileEntity", () => {
  describe("FileEntity.create", () => {
    it("should assign all provided params", () => {
      const entity = FileEntity.create({
        name: "image.png",
        size: 1024,
        uri: "https://example.com/image.png",
        type: "image/png",
      });

      expect(entity.name).toBe("image.png");
      expect(entity.size).toBe(1024);
      expect(entity.uri).toBe("https://example.com/image.png");
      expect(entity.type).toBe("image/png");
    });

    it("should allow size and uri to be undefined", () => {
      const entity = FileEntity.create({
        name: "file.txt",
        type: "text/plain",
      });
      expect(entity.size).toBeUndefined();
      expect(entity.uri).toBeUndefined();
    });
  });

  describe("FileEntity.is", () => {
    it("should return true for a valid FileEntity", () => {
      const entity = FileEntity.create({
        name: "doc.pdf",
        type: "application/pdf",
      });
      expect(FileEntity.is(entity)).toBe(true);
    });

    it("should return true for a FileEntity with all fields", () => {
      const entity = FileEntity.create({
        name: "image.png",
        size: 1024,
        uri: "https://example.com/image.png",
        type: "image/png",
      });
      expect(FileEntity.is(entity)).toBe(true);
    });

    it("should return false for a plain object with matching shape", () => {
      const obj = { name: "file.txt", type: "text/plain" };
      expect(FileEntity.is(obj)).toBe(false);
    });

    it("should return false for null", () => {
      expect(FileEntity.is(null)).toBe(false);
    });

    it("should return false for undefined", () => {
      expect(FileEntity.is(undefined)).toBe(false);
    });

    it("should return false for a primitive", () => {
      expect(FileEntity.is("string")).toBe(false);
      expect(FileEntity.is(42)).toBe(false);
      expect(FileEntity.is(true)).toBe(false);
    });

    it("should return false for an empty object", () => {
      expect(FileEntity.is({})).toBe(false);
    });

    it("should return false when branded with a different symbol value", () => {
      const symbol = Symbol.for("file-entity");
      const entity = {
        [symbol]: true,
        name: "file.txt",
        type: "text/plain",
      };
      expect(FileEntity.is(entity)).toBe(false);
    });

    it("should return true when branded with the shared symbol value", () => {
      const symbol = Symbol.for("file-entity");
      const entity = {
        [symbol]: symbol,
        name: "file.txt",
        type: "text/plain",
      };
      expect(FileEntity.is(entity)).toBe(true);
    });
  });
});
