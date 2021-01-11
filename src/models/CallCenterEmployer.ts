import { Call } from "./Call";

export class CallCenterEmployer {
  private call?: Call;

  /**
   * Returns if the employer its is onCall.
   *
   * @returns {boolean}
   */
  public isOnCall(): boolean {
    return this.call != null;
  }

  /**
   * isAvailable
   *
   * @returns {boolean}
   */
  public isAvailable(): boolean {
    return !this.isOnCall();
  }

  /**
   * asingToCall
   *
   * @param call
   */
  public asingCall(call: Call) {
    this.call = call;
  }

  /**
   * removeCall
   */
  public removeCall() {
    this.call = undefined;
  }

  /**
   * getCall
   */
  public getCall(): Call | undefined {
    return this.call;
  }
}

export class Operator extends CallCenterEmployer {
  constructor() {
    super();
  }
}

export class Supervisor extends CallCenterEmployer {
  constructor() {
    super();
  }
}

export class Director extends CallCenterEmployer {
  constructor() {
    super();
  }
}
