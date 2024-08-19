const generateOrderId = () => {
  const date = new Date();
  const orderID =
    "#" +
    date.getDate() +
    date.getMonth() +
    date.getFullYear() +
    date.getHours() +
    date.getMinutes();
  return orderID;
};

export default generateOrderId;
