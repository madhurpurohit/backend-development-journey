const bcrypt = require("bcrypt");

async function passwordHashing() {
  const password = "DevFlux6797@";

  //* Method1: In this it will automatically add salt in our password.
  //! Syntax:- const vName = await bcrypt.hash(password, rounds); // Here rounds means 2^rounds time run the algorithm of bcrypt.hash to strong the hashCode.
  //   const hashCode = await bcrypt.hash(password, 10);

  //* Method2:- Which we prefer. In this we generate salt first & than password hashCode. In rounds we mostly prefer between 10 to 12.
  //! Slat Syntax:- const vName1 = await bcrypt.genSalt(rounds);
  const salt = await bcrypt.genSalt(10);

  //! Hash Syntax:- const vName2 = await bcrypt.hash(password, vName1);
  const hashCode = await bcrypt.hash(password, salt);

  console.log("Hash-Code:- ", hashCode);

  //* Hwo to compare the password & hashCode.
  //! Syntax:- const vName3 = await bcrypt.compare(password, vName2);
  const isUser = await bcrypt.compare(password, hashCode);

  console.log(`Is it original user ${isUser}`);
}

passwordHashing();

//? $2b$10$O6613BvBQp3RKdRqGusgxOni5HLcyvgYAtt1yK0FiVuJcukDlJzQ.
//! $bcryptVersion$rounds$salt(21 Characters)hashCode(31 Character Password ka).
