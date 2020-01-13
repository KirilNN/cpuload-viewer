import React from "react";
import { render } from "@testing-library/react";
import { generateInitialLoadData, updateData } from "../loadHelper";

const generateState = () => {
  return {
    dashboard: {
      cpuLoad: generateInitialLoadData(),
      highLoads: [],
      recovers: [],
      isUnderHighLoad: false
    }
  };
};

const setHighLoad = () => {
  let currentState = generateState();

  for (let i = 0; i < 12; i++) {
    currentState = updateData(currentState, {
      data: { value: 1.01, date: new Date() }
    });
  }

  return currentState;
};

describe("Load Helper", () => {
  it("generate initial data", () => {
    const data = generateInitialLoadData().slice(0);
    const allZeroValues = data.every(s => s.value === 0);

    expect(data.length).toEqual(60);
    expect(allZeroValues).toBe(true);
  });

  it("adding new data point persists only 60 records", () => {
    const now = new Date();
    const currentState = generateState();
    const { dashboard } = updateData(currentState, {
      data: { value: 20, date: now }
    });

    expect(dashboard.cpuLoad.length).toEqual(60);
    expect(dashboard.cpuLoad[59].time.getTime()).toEqual(now.getTime());
  });

  it("isUnderHighLoad flag is set when under high load", () => {
    let currentState = setHighLoad();
    expect(currentState.dashboard.isUnderHighLoad).toBe(true);
  });

  it("isUnderHighLoad flag is not set if high load is under 2mins", () => {
    let currentState = generateState();

    for (let i = 0; i < 11; i++) {
      currentState = updateData(currentState, {
        data: { value: 1.01, date: new Date() }
      });
    }

    expect(currentState.dashboard.isUnderHighLoad).toBe(false);
  });

  it("isUnderHighLoad flag is not set if values are under 1", () => {
    let currentState = generateState();

    for (let i = 0; i < 12; i++) {
      currentState = updateData(currentState, {
        data: { value: 0.99, date: new Date() }
      });
    }

    expect(currentState.dashboard.isUnderHighLoad).toBe(false);
  });

  it("isUnderHighLoad flag is reset after high load is passed", () => {
    let currentState = setHighLoad();

    expect(currentState.dashboard.isUnderHighLoad).toBe(true);

    for (let i = 0; i < 12; i++) {
      currentState = updateData(currentState, {
        data: { value: 0.5, date: new Date() }
      });
    }

    expect(currentState.dashboard.isUnderHighLoad).toBe(false);
  });

  it("isUnderHighLoad flag is not reset if less than 2 mins are passed", () => {
    let currentState = setHighLoad();

    expect(currentState.dashboard.isUnderHighLoad).toBe(true);

    for (let i = 0; i < 11; i++) {
      currentState = updateData(currentState, {
        data: { value: 0.5, date: new Date() }
      });
    }

    currentState = updateData(currentState, {
      data: { value: 1.5, date: new Date() }
    });

    expect(currentState.dashboard.isUnderHighLoad).toBe(true);
  });

  it("highload log is updated when event appears", () => {
    let currentState = setHighLoad();

    expect(currentState.dashboard.isUnderHighLoad).toBe(true);
    expect(currentState.dashboard.highLoads.length).toEqual(1);
    expect(currentState.dashboard.highLoads[0].end).toBe(undefined);
  });

  it("highload log is updated when high load has passed", () => {
    let currentState = setHighLoad();

    for (let i = 0; i < 12; i++) {
      currentState = updateData(currentState, {
        data: { value: 0.5, date: new Date() }
      });
    }

    expect(currentState.dashboard.highLoads[0].end).not.toBe(undefined);
  });

  it("recovery log is updated when high load has passed with correct time", () => {
    let currentState = setHighLoad();
    const now = new Date();

    for (let i = 0; i < 12; i++) {
      currentState = updateData(currentState, {
        data: { value: 0.5, date: now }
      });
    }

    expect(currentState.dashboard.recovers.length).toBe(1);
    expect(currentState.dashboard.recovers[0].time.getTime()).toEqual(
      now.getTime()
    );
  });

  it("recovery and highload logs share same time after recovery", () => {
    let currentState = setHighLoad();

    for (let i = 0; i < 12; i++) {
      currentState = updateData(currentState, {
        data: { value: 0.5, date: new Date() }
      });
    }

    expect(currentState.dashboard.recovers.length).toBe(1);
    expect(currentState.dashboard.recovers[0].time.getTime()).toEqual(
      currentState.dashboard.highLoads[0].end.getTime()
    );
  });
});
