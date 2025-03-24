const generateOrder = () => {
  const currentTimeUnix = Math.floor(Date.now()) * 1000;
  return {
    transactionId: currentTimeUnix.toString().slice(0, 14),
    orderNumber: currentTimeUnix.toString().slice(0, 10),
  };
};

export default generateOrder;
