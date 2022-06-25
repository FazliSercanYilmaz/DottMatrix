export class Exception extends Error {
  constructor(
    public readonly code: number,
    public readonly message: string,
    public readonly detail: string = null
  ) {
    super(message);
    this.code = code;
  }
}
