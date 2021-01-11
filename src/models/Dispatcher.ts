import {
  CallCenterEmployer,
  Director,
  Operator,
  Supervisor,
} from "./CallCenterEmployer";
import { Call } from "./Call";

export class Dispatcher {
  public static NO_EMPLOYEES_AVILABLE =
    "There are no employees available to take the call";

  private operators: Operator[];

  private supervisors: Supervisor[];

  private directors: Director[];

  /**
   * Construct a instance of Dispatcher
   *
   * @param {Operator[]} operators
   * @param {Supervisor[]} supervisors
   * @param {Director[]} directors
   */
  constructor(
    operators: Operator[],
    supervisors: Supervisor[],
    directors: Director[]
  ) {
    this.operators = operators;
    this.supervisors = supervisors;
    this.directors = directors;
  }

  /**
   * Given a Call asing a employer to this call and return this
   *
   * @param {Call} call
   * @returns {CallCenterEmployer}
   */
  public dispatchCall(call: Call): CallCenterEmployer {
    const findedEmployer: CallCenterEmployer | undefined = this.findEmployer();
    if (findedEmployer == null) {
      throw new Error(Dispatcher.NO_EMPLOYEES_AVILABLE);
    } else {
      call.asingEmployer(findedEmployer);
      return findedEmployer;
    }
  }

  /**
   * Find a employer with define priority
   *
   * @returns {CallCenterEmployer | undefined}
   */
  private findEmployer(): CallCenterEmployer | undefined {
    let findedEmployer: CallCenterEmployer | undefined;

    findedEmployer = this.operators.find((operator) => operator.isAvailable());
    if (findedEmployer == null) {
      findedEmployer = this.supervisors.find((supervisor) =>
        supervisor.isAvailable()
      );
    }
    if (findedEmployer == null) {
      findedEmployer = this.directors.find((director) =>
        director.isAvailable()
      );
    }

    return findedEmployer;
  }
}
