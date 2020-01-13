const updateHighLoads = (highLoads, end) => {
  return highLoads.map(e => {
    if (!e.end) {
      e.end = end;
    }
    return e;
  });
};

const updateData = (state, action) => {
  let { isUnderHighLoad, highLoads, recovers, cpuLoad } = state.dashboard;
  const data = cpuLoad.slice(0);
  const { value } = action.data;

  const lastPeriodDataRange = data.slice(-11); // last 11 data points 10 sec each are needed for 2 min interval

  if (value >= 1) {
    if (lastPeriodDataRange.every(e => e.value >= 1) && !isUnderHighLoad) {
      isUnderHighLoad = true;
      highLoads.push({ start: new Date(action.data.date) });
    }
  } else {
    if (lastPeriodDataRange.every(e => e.value < 1) && isUnderHighLoad) {
      isUnderHighLoad = false;
      const end = new Date(action.data.date);
      highLoads = updateHighLoads(highLoads, end);
      recovers.push({ time: end });
    }
  }

  data.shift(); //remove last data point as its no longer needed

  data.push({
    value,
    time: new Date(action.data.date)
  });

  return {
    dashboard: {
      cpuLoad: data,
      isUnderHighLoad,
      highLoads,
      recovers
    }
  };
};

const generateInitialLoadData = () =>
  new Array(60).fill({}).map((item, index) => ({
    time: new Date(new Date().getTime() - (60 - index) * 2000),
    value: 0
  }));

export { updateData, generateInitialLoadData };
