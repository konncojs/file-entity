export type FileEntityParams = {
  /**
   * @description Name of file
   */
  name: string;

  /**
   * @description Size in types
   */
  size?: number;

  /**
   * @description The resource location, it can be Blob or URL path
   */
  uri?: string;

  /**
   * @description The mime type of the file
   * @example "image/png"
   * @example "video/mp4"
   */
  type: string;
};
