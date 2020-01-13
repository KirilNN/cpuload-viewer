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
    color: theme.palette.secondary.main
  },
  list: {
    listStyle: "none",
    color: theme.palette.info.main
  },
  info: {
    color: theme.palette.text.primary
  }
}));

const HighLoadComponent = ({ highLoads }) => {
  const classes = useStyles();

  const listItems = highLoads
    .sort((a, b) => {
      return b.start.getTime() - a.start.getTime();
    })
    .map(number => (
      <li
        key={number.start.toString()}
        className={number.end ? classes.info : ""}
      >
        {formatDate(number.start)} -{" "}
        {number.end ? formatDate(number.end) : "ongoing"}
      </li>
    ));

  return (
    <div>
      <h1 className={classes.header}>
        {" "}
        High loads: {listItems.length} time(s)
      </h1>
      <Paper>
        <ul className={classes.list}> {listItems}</ul>
      </Paper>
    </div>
  );
};

HighLoadComponent.propTypes = {
  highLoads: PropTypes.arrayOf(
    PropTypes.shape({
      start: PropTypes.instanceOf(Date),
      end: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
    })
  )
};

export default HighLoadComponent;
