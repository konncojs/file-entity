import type { FileEntityParams } from "./index.types";

const fileEntityBrand = Symbol("isFileEntity");

/**
 * @description A lightweight model for file metadata. Useful for UI components that need to display file information. Use FileEntity.is(value) to type guard.
 * @example new FileEntity({ name: "image.png", size: 1024, uri: "https://example.com/image.png", type: "image/png" })
 */
class FileEntity {
  /**
   * @description A unique identifier for the file entity. Please use `FileEntity.is(value)` to type guard.
   */
  readonly [fileEntityBrand] = true;

  name: string;
  size: number | undefined;
  uri: string | undefined;
  type: string;

  constructor(params: FileEntityParams) {
    this.name = params.name;
    this.size = params.size;
    this.uri = params.uri;
    this.type = params.type;
  }

  /**
   * @description Type guard for FileEntity.
   */
  static is(value: unknown): value is FileEntity {
    return (
      typeof value === "object" &&
      value !== null &&
      fileEntityBrand in value &&
      (value as Record<typeof fileEntityBrand, unknown>)[fileEntityBrand] ===
        true &&
      typeof (value as FileEntity).name === "string"
    );
  }
}

export default FileEntity;
