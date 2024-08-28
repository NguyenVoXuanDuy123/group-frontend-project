/**
 * Error with status code and message
 */
class RouteError extends Error {
  public errorCode: number;

  public constructor(errorCode: number, message: string) {
    super(message);
    this.errorCode = errorCode;
  }
}

// **** Export default **** //

export default RouteError;
