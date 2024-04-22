export class WorkDoneError {
  logRef: string | undefined // Reference to the log for the error
  message: string | undefined // Error message
}

export class WorkDone<T> {
  data?: T // Data returned by the operation
  error?: WorkDoneError // Error object, if any
  isOk: boolean // Indicates if the operation was successful
  successMessage?: string // Success message, if any
  warningMessage?: string // Warning message, if any

  private constructor (isOk: boolean) {
    this.isOk = isOk
  }

  public static buildError<T> (message: string, logRef?: string): WorkDone<T> {
    const wd = new WorkDone<T>(false)
    wd.error = { message, logRef }
    return wd
  }

  public static buildOk<T> (data: T, successMessage?: string, warningMessage?: string): WorkDone<T> {
    const wd = new WorkDone<T>(true)
    wd.data = data
    wd.successMessage = successMessage
    wd.warningMessage = warningMessage
    return wd
  }

  //  converion de types entre WorkDone et WorkDoneError et vice-versa

  public static toError<T> (from: WorkDone<any>): WorkDone<T> {
    const wd = new WorkDone<T>(false)
    wd.error = from.error
    return wd
  }

  public static toOkNotOk (from: WorkDone<any>): WorkDone<boolean> {
    const wd = new WorkDone<boolean>(from.isOk)
    wd.error = from.error
    return wd
  }
}
