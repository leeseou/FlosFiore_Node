const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const userDao = require("./userDao");

// Provider: Read 비즈니스 로직 처리

exports.emailCheck = async function (email) {
  const connection = await pool.getConnection(async (conn) => conn);
  const emailCheckResult = await userDao.selectUserEmail(connection, email);
  connection.release();

  return emailCheckResult;
};

exports.passwordCheck = async function (email) {
  const connection = await pool.getConnection(async (conn) => conn);
  const passwordCheckResult = await userDao.selectUserPassword(
    connection,
    email
  );
  connection.release();
  return passwordCheckResult[0];
};

exports.accountCheck = async function (email) {
  const connection = await pool.getConnection(async (conn) => conn);
  const userAccountResult = await userDao.selectUserAccount(connection, email);
  connection.release();

  return userAccountResult;
};

exports.CheckEmailDuplicate = async function (email) {
  const connection = await pool.getConnection(async (conn) => conn);

  const EDuplicateResult = await userDao.checkEmailDuplicate(connection, email);
  connection.release();

  return EDuplicateResult[0].t;
}

exports.GetUserName = async function(email) {
  const connection = await pool.getConnection(async (conn) => conn);

  const userName = await userDao.GetName(connection, email);
  connection.release();

  return userName;
}
