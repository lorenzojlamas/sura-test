import { expect } from "chai";

import { Operator } from "./CallCenterEmployer";
import { reset } from "ts-mockito";
import { Call } from "./Call";
import sinon = require("sinon");

describe("Operator class", () => {
  it("Can be instance", () => {
    // When
    const sut = new Operator();
    // Then
    expect(sut).to.be.instanceOf(Operator);
  });

  let clock: sinon.SinonFakeTimers;

  beforeEach(() => {
    clock = sinon.useFakeTimers({ now: new Date("2020-07-01T00:00:00.000Z") });
  });

  afterEach(() => {
    clock.restore();
    sinon.restore();
    reset();
  });
  describe("isOnCall method", () => {
    it("Given a new instance the operator is not onCall", () => {
      // Given
      const sut = new Operator();
      // When
      const isOnCall = sut.isOnCall();
      // Then
      expect(isOnCall).to.be.equal(false);
    });

    it("Given an operator that has a call assigned when the method is called then it returns true", () => {
      // Given
      const sut = new Operator();
      const call = new Call();
      // When
      call.asingEmployer(sut);
      const isOnCall = sut.isOnCall();
      // Then
      expect(isOnCall).to.be.equal(true);
    });
    it("Given an operator that has a call assigned and pass 15 seconds when the method is called then it returns true", () => {
      // Given
      const sut = new Operator();
      const call = new Call();
      // When
      call.asingEmployer(sut);
      let isOnCall = sut.isOnCall();
      // Then
      expect(isOnCall).to.be.equal(true);
      clock.tick(15000);
      isOnCall = sut.isOnCall();
      expect(isOnCall).to.be.equal(false);
    });
  });
});
