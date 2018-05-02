const validate = values => {
  const errors = {};
  if (!values.playerName) {
    errors.playerName = "Required";
  }
  if (!values.playerGender) {
    errors.playerGender = "Required";
  }
  if (!values.playerHcp) {
    errors.playerHcp = "Required";
  }
  return errors;
};
export default validate;
