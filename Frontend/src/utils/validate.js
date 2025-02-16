export const checkValidateData = (email, password) => {
  const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    email
  );
  const isPasswordValid =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/.test(
      password
    );

  // const isNameValid = /^[a-zA-Z ]+$/.test(name);

  if (!isEmailValid && !isPasswordValid) {
    return "Email ID and Password are not valid";
  }

  if (!isEmailValid) return "Email ID is not valid";

  if (!isPasswordValid) return "Password is not valid. (eg: Netflix@25)";

  // if (!isNameValid) return "Please insert a valid name";

  return null;
};
