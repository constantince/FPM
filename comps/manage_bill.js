const ManageBill = ({customerId, children}) => {
    return (
        <form method="POST" action={BILLING_PORTAL_REDIRECT_ENDPOINT}>
          <input type={'hidden'} name={'customerId'} value={customerId} />
     
          <Button color={'secondary'} className={className}>
            {children}
          </Button>
        </form>
}
export default ManageBill;