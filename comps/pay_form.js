const PayForm = ({ action, method = "post", children, inputs }) => {
  return (
    <form action={action} target="_self" method={method}>
      {inputs.map((item) => (
        <input
          key={item.value}
          name={item.name}
          readOnly
          value={item.value}
          className="hidden"
        />
      ))}
      {children}
    </form>
  );
};
export default PayForm;
