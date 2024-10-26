import { CustomError } from './custom-error'

export class DatabaseConnectionError extends CustomError {
  statusCode = 500
  reason = 'Error connecting to the Database'

  constructor() {
    super('Error connecting to the Database')
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
  }

  serializeErrors() {
    return [{ message: this.reason }]
  }
}
