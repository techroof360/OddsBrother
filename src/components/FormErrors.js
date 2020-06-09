import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  formErrors: {
    color: "red"
  }
}));

const FormErrors = ({ formErrors }) => {
  const classes = useStyles();
  return (
    <div className={classes.formErrors}>
      {Object.keys(formErrors).map((fieldName, i) => {
        if (formErrors[fieldName].length > 0) {
          return (
            <p key={i}>
              {fieldName} {formErrors[fieldName]}
            </p>
          );
        } else {
          return "";
        }
      })}
    </div>
  );
};

export default FormErrors;
