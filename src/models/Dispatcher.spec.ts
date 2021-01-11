import { expect } from "chai";
import { Call } from "./Call";
import { Dispatcher } from "./Dispatcher";
import {
  CallCenterEmployer,
  Director,
  Operator,
  Supervisor,
} from "./CallCenterEmployer";
import { reset } from "ts-mockito";
import sinon = require("sinon");

describe("Dispatcher class", () => {
  it("Can be instance", () => {
    // Given
    const operators: Operator[] = [];
    const supervisors: Supervisor[] = [];
    const directors: Director[] = [];
    // When
    const sut = new Dispatcher(operators, supervisors, directors);
    // Then
    expect(sut).to.be.instanceOf(Dispatcher);
  });

  let clock: sinon.SinonFakeTimers;
  const date = new Date("2020-07-01T00:00:00.000Z");

  beforeEach(() => {
    clock = sinon.useFakeTimers({ now: date });
  });

  afterEach(() => {
    clock.restore();
    sinon.restore();
    reset();
  });
  describe("dispatchCall method", () => {
    it("Given a call and no employee can attend, then when the method is called, then an error is triggered", () => {
      // Given
      const call = new Call();
      const operators: Operator[] = [];
      const supervisors: Supervisor[] = [];
      const directors: Director[] = [];
      const sut = new Dispatcher(operators, supervisors, directors);
      // When
      // Then
      expect(() => sut.dispatchCall(call)).to.be.throw(
        Dispatcher.NO_EMPLOYEES_AVILABLE
      );
    });
    it("Given a call and can only a Operator can attend, then when the method is called, the call its asigned to this Director", () => {
      // Given
      const call = new Call();
      const operators: Operator[] = [new Operator()];
      const supervisors: Supervisor[] = [];
      const directors: Director[] = [new Director()];
      const sut = new Dispatcher(operators, supervisors, directors);
      // When
      const callCenterEmployer = sut.dispatchCall(call);
      // Then
      expect(callCenterEmployer).to.be.instanceOf(CallCenterEmployer);
      expect(callCenterEmployer).to.be.instanceOf(Operator);
      expect(callCenterEmployer.isOnCall()).to.be.equal(true);
      expect(callCenterEmployer.getCall()).to.be.equal(call);
    });
    it("Given a call and can only a Director can attend, then when the method is called, the call its asigned to this Director", () => {
      // Given
      const call = new Call();
      const operators: Operator[] = [];
      const supervisors: Supervisor[] = [new Supervisor()];
      const directors: Director[] = [];
      const sut = new Dispatcher(operators, supervisors, directors);
      // When
      const callCenterEmployer = sut.dispatchCall(call);
      // Then
      expect(callCenterEmployer).to.be.instanceOf(CallCenterEmployer);
      expect(callCenterEmployer).to.be.instanceOf(Supervisor);
      expect(callCenterEmployer.isOnCall()).to.be.equal(true);
      expect(callCenterEmployer.getCall()).to.be.equal(call);
    });
    it("Given a call and can only a Director can attend, then when the method is called, the call its asigned to this Director", () => {
      // Given
      const call = new Call();
      const operators: Operator[] = [];
      const supervisors: Supervisor[] = [];
      const directors: Director[] = [new Director()];
      const sut = new Dispatcher(operators, supervisors, directors);
      // When
      const callCenterEmployer = sut.dispatchCall(call);
      // Then
      expect(callCenterEmployer).to.be.instanceOf(CallCenterEmployer);
      expect(callCenterEmployer.isOnCall()).to.be.equal(true);
      expect(callCenterEmployer.getCall()).to.be.equal(call);
    });

    it("Resolve 10 calls", () => {
      // Given
      const calls: Call[] = [
        new Call(),
        new Call(),
        new Call(),
        new Call(),
        new Call(),
        new Call(),
        new Call(),
        new Call(),
        new Call(),
        new Call(),
      ];
      const call11 = new Call();
      const operators: Operator[] = [
        new Operator(),
        new Operator(),
        new Operator(),
        new Operator(),
        new Operator(),
        new Operator(),
      ];
      const supervisors: Supervisor[] = [
        new Supervisor(),
        new Supervisor(),
        new Supervisor(),
      ];
      const directors: Director[] = [new Director()];
      const sut = new Dispatcher(operators, supervisors, directors);
      // When
      calls.forEach((call) => {
        sut.dispatchCall(call);
      });
      // Then

      expect(calls[0].getEmployer()).to.be.instanceOf(Operator);
      expect(calls[9].getEmployer()).to.be.instanceOf(Director);
      expect(() => sut.dispatchCall(call11)).to.be.throw(
        Dispatcher.NO_EMPLOYEES_AVILABLE
      );
      clock.tick(15000);
      sut.dispatchCall(call11);
      expect(call11.getEmployer()).to.be.instanceOf(CallCenterEmployer);
    });
  });
});
