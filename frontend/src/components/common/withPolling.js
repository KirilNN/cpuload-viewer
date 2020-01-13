import * as React from "react";
import { connect } from "react-redux";

const PollComponent = ({ Component, duration, pollingAction }) => {
  const dataPolling = React.useRef();

  React.useEffect(() => {
    pollingAction();
    dataPolling.current = setInterval(() => {
      pollingAction();
    }, duration);

    return () => {
      clearInterval(dataPolling.current);
    };
  });

  return <Component />;
};

export const withPolling = (pollingAction, duration = 10000) => Component => {
  const mapStateToProps = () => ({
    Component,
    duration
  });

  const mapDispatchToProps = { pollingAction };

  return connect(mapStateToProps, mapDispatchToProps)(PollComponent);
};
