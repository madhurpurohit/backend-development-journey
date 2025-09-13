const validator = require("validator");

function validate(data) {
  const mandatoryField = ["firstName", "age", "email", "password"];
  // const isAllowed = Object.keys(data).every(task => mandatoryField.includes(task));
  const isAllowed = mandatoryField.every((task) =>
    Object.keys(data).includes(task)
  );

  if (!isAllowed) {
    throw new Error("Missing some required information");
  }

  const emailValid = validator.isEmail(data.email);
  if (!emailValid) {
    throw new Error("Invalid Email");
  }

  const passwordValid = validator.isStrongPassword(data.password);
  if (!passwordValid) {
    throw new Error("Password is not strong enough");
  }

  if (data.firstName.length <= 2 || data.firstName.length > 20) {
    throw new Error("Your First Name is either big or too short.");
  }
}

module.exports = validate;
