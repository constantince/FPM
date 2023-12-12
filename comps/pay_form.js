const PayForm = ({ action, method = "post", children, name, value }) => {
  return (
    <form action={action} target="_self" method={method}>
      <input name={name} readOnly value={value} className="hidden" />
      {children}
    </form>
  );
};
export default PayForm;
