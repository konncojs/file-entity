import type { FileEntityParams } from "./index.types";

const __symbol = Symbol.for("file-entity");

/**
 * @description A lightweight model for file metadata. Useful for UI components that need to display file information. Use FileEntity.is(value) to type guard.
 * @example FileEntity.create({ name: "image.png", size: 1024, uri: "https://example.com/image.png", type: "image/png" })
 */
interface FileEntity {
  [__symbol]: typeof __symbol;
  name: string;
  size: number | undefined;
  uri: string | undefined;
  type: string;
}

const FileEntity = {
  create(params: FileEntityParams): FileEntity {
    return {
      [__symbol]: __symbol,
      name: params.name,
      size: params.size,
      uri: params.uri,
      type: params.type,
    };
  },
  is(value: unknown): value is FileEntity {
    return (
      typeof value === "object" &&
      value !== null &&
      __symbol in value &&
      (value as Record<typeof __symbol, unknown>)[__symbol] === __symbol
    );
  },
};

export type { FileEntity };
export default FileEntity;
