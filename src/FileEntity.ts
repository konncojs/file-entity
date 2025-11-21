class FileEntity {
	constructor(
		/**
		 * @description Name of file
		 */
		public name: string,
		/**
		 * @description Size in types
		 */
		public size: number,
		/**
		 * @description The resource location, it can be Blob or URL path
		 */
		public uri: string,
		/**
		 * @description The mime type of the file
		 * @example "image/png"
		 * @example "video/mp4"
		 */
		public type: string,
	) {}
}

export default FileEntity;
