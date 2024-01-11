export interface ProcessEnv {
  [key: string]: string | undefined;
}

export class ResponseError extends Error {
  public status?: number;

  public code?: number;

  public constructor(status: number, message: string, code?: number, e?: Error) {
    super();

    this.status = status;
    this.code = code;
    this.message = message;
    this.stack = e?.stack;
    this.name = this.constructor.name;

    Object.setPrototypeOf(this, ResponseError.prototype);
  }
}
