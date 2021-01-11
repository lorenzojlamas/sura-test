import { expect } from "chai";
import { reset } from "ts-mockito";

import { Call } from "./Call";
import { Operator } from "./CallCenterEmployer";
import sinon = require("sinon");

describe("Call class", () => {
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
  describe("Constructor", () => {
    it("Can be instance", () => {
      // When
      const sut = new Call();
      // Then
      expect(sut).to.be.instanceOf(Call);
      expect(sut.getStartTimne()).to.be.deep.equal(date);
      expect(sut.isEnded()).to.be.equal(false);
    });

    it("Given a Call and pass a 15 second when call isEnded then return true", () => {
      // Given
      const sut = new Call();
      // When
      clock.tick(15000);
      // Then
      expect(sut.getStartTimne()).to.be.deep.equal(date);
      expect(sut.isEnded()).to.be.equal(true);
    });
  });

  describe("asingEmployer method", () => {
    it("Given a call and a CallcenterEmployer when call the method then this employer is asigned to the call", () => {
      // Given
      const sut = new Call();
      const operator = new Operator();
      // When
      sut.asingEmployer(operator);
      // Then
      expect(sut.getEmployer()).to.be.instanceOf(Operator);
      expect(sut.getEmployer()).to.be.equal(operator);
    });
  });
});
