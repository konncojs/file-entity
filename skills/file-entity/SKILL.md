---
name: file-entity
description: >
  Provides a type-safe FileEntity factory for representing file metadata in TypeScript/JavaScript projects.
  Use when working with UI components that handle file uploads, display file information, or need to
  bridge browser File API objects with server-side file representations (e.g., API responses).
  Relevant when the user mentions FileEntity, file metadata, file upload components, or working with
  the @konnco/file-entity package.
license: MIT
---

# file-entity

A lightweight TypeScript library providing a `FileEntity` factory to model file metadata. It bridges the browser's native `File` API with server-side file data (e.g., API responses), enabling UI components to handle both sources uniformly and type-safely.

## Installation

```bash
# NPM
npm install @konnco/file-entity

# PNPM
pnpm add @konnco/file-entity

# Yarn
yarn add @konnco/file-entity
```

## API Reference

### `FileEntity` factory

```typescript
import FileEntity from "@konnco/file-entity";
import type {
  FileEntity as FileEntityType,
  FileEntityParams,
} from "@konnco/file-entity";
```

`FileEntity` is a factory object (not a class). Use `FileEntity.create(...)` to create values and `FileEntity.is(...)` to type-guard them. The `FileEntity` type describes the created object shape.

#### `FileEntity.create(params)`

```typescript
FileEntity.create(params: FileEntityParams): FileEntity
```

**`FileEntityParams`:**

| Property | Type     | Required | Description                          |
| -------- | -------- | -------- | ------------------------------------ |
| `name`   | `string` | Yes      | The file name (e.g., `"image.png"`)  |
| `type`   | `string` | Yes      | MIME type (e.g., `"image/png"`)      |
| `size`   | `number` | No       | File size in bytes                   |
| `uri`    | `string` | No       | File location (Blob URL or path URL) |

#### Created object properties

| Property | Type                  | Description        |
| -------- | --------------------- | ------------------ |
| `name`   | `string`              | File name          |
| `type`   | `string`              | MIME type          |
| `size`   | `number \| undefined` | File size in bytes |
| `uri`    | `string \| undefined` | File URI/URL       |

#### `FileEntity.is(value)`

```typescript
FileEntity.is(value: unknown): value is FileEntity
```

Type guard that returns `true` if `value` is a branded `FileEntity`. Uses global symbol branding (`Symbol.for("file-entity")`) for reliable cross-module identification — works even when multiple bundled copies of the library exist.

## Usage Patterns

### Creating a FileEntity from an API response

```typescript
import FileEntity from "@konnco/file-entity";

const response = await fetch("/api/file-info");
const data = await response.json();

const fileEntity = FileEntity.create({
  name: data.name,
  type: data.mimeType,
  size: data.size,
  uri: data.url,
});
```

### Using with a React file upload component

```typescript
import FileEntity from '@konnco/file-entity';
import type { FileEntity as FileEntityType } from '@konnco/file-entity';
import { useState, useEffect } from 'react';

const HomePage = () => {
  const [file, setFile] = useState<FileEntityType | File | null>(null);

  useEffect(() => {
    fetch('/file-info')
      .then((res) => res.json())
      .then((data) => setFile(FileEntity.create(data)));
  }, []);

  return <FileUpload onChange={setFile} value={file} />;
};

type FileUploadProps = {
  onChange: (file: File | null) => void;
  value: File | FileEntityType | null;
};

const FileUpload: FC<FileUploadProps> = (props) => {
  return (
    <div>
      <input type="file" onChange={(e) => props.onChange(e.target.files?.[0] || null)} />

      {/* Native browser File from <input> */}
      {props.value instanceof File && <p>{props.value.name}</p>}

      {/* FileEntity from server/API */}
      {FileEntity.is(props.value) && <p>{props.value.name}</p>}
    </div>
  );
};
```

### Type narrowing with `FileEntity.is`

```typescript
import FileEntity from "@konnco/file-entity";
import type { FileEntity as FileEntityType } from "@konnco/file-entity";

function handleFile(value: File | FileEntityType | null) {
  if (value instanceof File) {
    // Browser-selected file
    console.log("Local file:", value.name, value.size);
  } else if (FileEntity.is(value)) {
    // Server-provided file metadata
    console.log("Remote file:", value.name, value.uri);
  }
}
```

## Key Design Notes

- **Factory, not class**: create values with `FileEntity.create(...)`. There is no constructor and `instanceof FileEntity` is not supported.
- **Symbol branding**: `FileEntity.is()` uses `Symbol.for("file-entity")` and checks that the brand value equals the shared symbol. Always prefer `FileEntity.is()` over structural checks.
- **Dual module output**: Publishes both ESM (`.mjs`) and CJS (`.cjs`) with TypeScript declarations.
- **Minimal surface**: Only models metadata — no file reading, uploading, or I/O logic.

## Common Edge Cases

- `FileEntity.is(null)` → `false`
- `FileEntity.is({})` → `false` (plain object, even with matching shape)
- `FileEntity.is(FileEntity.create(...))` → `true`
- Objects branded with the wrong value (e.g. `[Symbol.for("file-entity")]: true`) → `false`
- `size` and `uri` are optional; always guard before using them.
