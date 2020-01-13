import * as React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const formatDate = d => {
  return (
    d.getDate() +
    "/" +
    (d.getMonth() + 1) +
    "/" +
    d.getFullYear() +
    "-" +
    d.getHours() +
    ":" +
    d.getMinutes() +
    ":" +
    d.getSeconds()
  );
};

const useStyles = makeStyles(theme => ({
  header: {
    color: theme.palette.success.main
  },
  list: {
    listStyle: "none"
  }
}));

const RecoverComponent = ({ recovers }) => {
  const classes = useStyles();
  const recoverItems = recovers.map(recover => (
    <li key={recover.time.toString()}>{formatDate(recover.time)}</li>
  ));
  return (
    <div>
      <h1 className={classes.header}> Recoveries: {recovers.length} time(s)</h1>
      <Paper>
        <ul className={classes.list}> {recoverItems}</ul>
      </Paper>
    </div>
  );
};

RecoverComponent.propTypes = {
  recovers: PropTypes.arrayOf(
    PropTypes.shape({
      time: PropTypes.instanceOf(Date)
    })
  )
};

export default RecoverComponent;
