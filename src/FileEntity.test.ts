import { describe, expect, it } from "vitest";
import FileEntity from "./FileEntity";

describe("FileEntity", () => {
  describe("constructor", () => {
    it("should assign all provided params", () => {
      const entity = new FileEntity({
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

    it("should set isFileEntity to true", () => {
      const entity = new FileEntity({ name: "file.txt", type: "text/plain" });
      expect(entity.isFileEntity).toBe(true);
    });

    it("should allow size and uri to be undefined", () => {
      const entity = new FileEntity({ name: "file.txt", type: "text/plain" });
      expect(entity.size).toBeUndefined();
      expect(entity.uri).toBeUndefined();
    });
  });

  describe("FileEntity.is", () => {
    it("should return true for a valid FileEntity instance", () => {
      const entity = new FileEntity({
        name: "doc.pdf",
        type: "application/pdf",
      });
      expect(FileEntity.is(entity)).toBe(true);
    });

    it("should return true for a plain object that satisfies the shape", () => {
      const obj = { isFileEntity: true, name: "file.txt" };
      expect(FileEntity.is(obj)).toBe(true);
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

    it("should return false when isFileEntity is missing", () => {
      expect(FileEntity.is({ name: "file.txt" })).toBe(false);
    });

    it("should return false when isFileEntity is not true", () => {
      expect(FileEntity.is({ isFileEntity: false, name: "file.txt" })).toBe(
        false,
      );
    });

    it("should return false when name is not a string", () => {
      expect(FileEntity.is({ isFileEntity: true, name: 123 })).toBe(false);
    });

    it("should return false for an empty object", () => {
      expect(FileEntity.is({})).toBe(false);
    });
  });
});
