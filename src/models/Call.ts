import * as express from "express";
import { CallCenterEmployer } from "./CallCenterEmployer";

export class Call {
  public static UNASSIGNED_EMPLOYEE = "Unassigned employee";

  private employer?: CallCenterEmployer;

  private startTime: Date;

  private endTime?: Date;

  constructor(req?: express.Request) {
    this.startTime = new Date();
    // TODO: El evento de cierre debería hacerse de manera externa a la llamada.
    const min = 5000;
    const max = 10000;
    const timeToEnd = Math.floor(Math.random() * (max - min)) + min;
    setTimeout(() => {
      this.endTime = new Date();
      this.employer?.removeCall();
    }, timeToEnd);
  }

  /**
   * Given a employer asing this to the call
   *
   * @param {CallCenterEmployer} employer
   * @returns {Call}
   */
  public asingEmployer(employer: CallCenterEmployer): Call {
    employer.asingCall(this);
    this.employer = employer;
    return this;
  }

  /**
   * Return if this call is ended
   *
   * @returns {boolean}
   */
  public isEnded(): boolean {
    return this.endTime != null;
  }

  /**
   * Return the time start of this Call
   *
   * @returns {Date}
   */
  public getStartTimne(): Date {
    return this.startTime;
  }

  /**
   * Returns the asingned employer
   *
   * @returns {CallCenterEmployer | undefined}
   */
  public getEmployer(): CallCenterEmployer | undefined {
    return this.employer;
  }
}
