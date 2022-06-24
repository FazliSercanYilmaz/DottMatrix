export class Exception extends Error {
  constructor(public readonly code: number, public readonly message: string) {
    super(message);
    this.code = code;
  }
}
