import * as React from "react";
import { connect } from "react-redux";
import { getCpuLoad } from "../actions/actions";
import { withPolling } from "./common/withPolling";
import Chart from "./charts/LineChart";
import HighLoadComponent from "./HighLoadComponent";
import RecoverComponent from "./RecoverComponent";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  paper: {
    paddingLeft: theme.spacing(2),
    marginRight: theme.spacing(1),
    height: "100%",
    color: theme.palette.primary.main
  },
  load: {
    fontSize: "100px"
  },
  root: {
    margin: theme.spacing(2)
  }
}));

const DashboardComponent = props => {
  const currentLoad = props.dashboard.cpuLoad.slice(-1).pop();
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid container justify="center">
        <Grid container justify="center">
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Grid
                container
                direction="column"
                justify="space-evenly"
                alignItems="stretch"
              >
                <Grid item xs={6}>
                  <h1>Current load</h1>
                  <p className={classes.load}>
                    {Math.round(currentLoad.value * 100) / 100}
                  </p>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper>
              <Chart data={props.dashboard.cpuLoad} />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <HighLoadComponent highLoads={props.dashboard.highLoads} />
      </Grid>

      <Grid item xs={6}>
        <RecoverComponent recovers={props.dashboard.recovers} />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => ({
  dashboard: state.data.dashboard
});

const mapDispatchToProps = {};

DashboardComponent.propTypes = {
  dashboard: PropTypes.shape({
    cpuLoad: PropTypes.arrayOf(
      PropTypes.shape({
        time: PropTypes.instanceOf(Date),
        value: PropTypes.number
      })
    ),
    highLoads: PropTypes.arrayOf(
      PropTypes.shape({
        start: PropTypes.instanceOf(Date),
        end: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
      })
    ),
    recovers: PropTypes.arrayOf(
      PropTypes.shape({
        time: PropTypes.instanceOf(Date)
      })
    ),
    isUnderHighLoad: PropTypes.bool
  })
};

export default withPolling(getCpuLoad)(
  connect(mapStateToProps, mapDispatchToProps)(DashboardComponent)
);
