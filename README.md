# @konnco/file-entity

A lightweight model for file metadata. Useful for UI components that need to display file information.

## Installation

```bash
# NPM
npm install @konnco/file-entity

# Yarn
yarn add @konnco/file-entity

# PNPM
pnpm add @konnco/file-entity
```

## Usage

```ts
import FileEntity from '@konnco/file-entity';
import type { FileEntity as FileEntityType } from '@konnco/file-entity';

const HomePage = () => {
  const [file, setFile] = useState<FileEntityType | File | null>(null);

  useEffect(() => {
    fetch("/file-info")
      .then((res) => res.json())
      .then((data) => {
        // Convert server response to FileEntity
        setFile(FileEntity.create(data));
      });
  }, []);

  return (
    <div>
      <FileUpload onChange={setFile} value={file} />
    </div>
  );
};

type FileUploadProps = {
  onChange: (file: File | null) => void;
  // Accepts File, FileEntity, or null. `File` comes from the browser's File API, while `FileEntity` from API.
  value: File | FileEntityType | null;
};

const FileUpload: FC<FileUploadProps> = (props) => {
  return (
    <div>
      <input type="file" onChange={(e) => props.onChange(e.target.files?.[0] || null)} />

      {/* When value is a File instance, display its name */}
      {props.value instanceof File && <p>{props.value.name}</p>}

      {/* Use FileEntity.is to check if value is a FileEntity, then display its name */}
      {FileEntity.is(props.value) && <p>{props.value.name}</p>}
    </div>
  );
};
```

## API

### `FileEntity.create(params)`

Creates a branded file metadata object.

```ts
const entity = FileEntity.create({
  name: "image.png",
  type: "image/png",
  size: 1024,
  uri: "https://example.com/image.png",
});
```

| Property | Type     | Required | Description                          |
| -------- | -------- | -------- | ------------------------------------ |
| `name`   | `string` | Yes      | The file name (e.g., `"image.png"`)  |
| `type`   | `string` | Yes      | MIME type (e.g., `"image/png"`)      |
| `size`   | `number` | No       | File size in bytes                   |
| `uri`    | `string` | No       | File location (Blob URL or path URL) |

### `FileEntity.is(value)`

Type guard that returns `true` if `value` is a `FileEntity`. Uses global symbol branding (`Symbol.for("file-entity")`) for reliable cross-module identification.

```ts
if (FileEntity.is(value)) {
  console.log(value.name, value.uri);
}
```
