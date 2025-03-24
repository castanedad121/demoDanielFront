const getCurrentTransactionTime = () => {
  const timestamp = Date.now() * 1000;
  return timestamp.toString();
};
export default getCurrentTransactionTime;
