import type { FileEntityParams } from "./index.types";

class FileEntity {
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
}

export default FileEntity;
