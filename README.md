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
import { FileEntity } from '@konnco/file-entity';

const HomePage = () => {
  const [file, setFile] = useState<FileEntity | File | null>(null);
  
  useEffect(() => {
    fetch("/file-info")
      .then((res) => res.json())
      .then((data) => {
        // Convert server response to FileEntity
        setFile(new FileEntity(data))
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
  value: File | FileEntity | null;
};

const FileUpload: FC<FileUploadProps> = (props) => {  
  return (
    <div>
      <input type="file" onChange={(e) => props.onChange(e.target.files?.[0] || null)} />
        
      // When value is a File instance, display its name
      {props.value instanceof File && <p>{props.value.name}</p>}
      
      // Use FileEntity.is to check if value is a FileEntity instance, then display its name
      {FileEntity.is(props.value) && <p>{props.value.name}</p>}
    </div>
  );
};
```
