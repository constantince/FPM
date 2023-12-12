/*
Your webhook endpoint redirects your customer to the success_url
 after you acknowledge that you received the event.
  If your endpoint is down or the event isn’t acknowledged properly,
   your handler redirects the customer to the success_url 10 seconds after a successful payment.
*/

const Success = () => {
  return (
    <div className="bg-gray-100 h-screen">
      <div className="bg-white p-6  md:mx-auto">
        <svg
          viewBox="0 0 24 24"
          className="text-green-600 w-16 h-16 mx-auto my-6"
        >
          <path
            fill="currentColor"
            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
          ></path>
        </svg>
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
            Payment Done!
          </h3>
          <p className="text-gray-600 my-2">
            Thank you for completing your secure online payment.
          </p>
          <p> Have a great day!</p>
          <div className="py-10 text-center">
            <a
              href="#"
              className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
            >
              GO Dashboard
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const Failure = () => {
  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-indigo-600">Opps~</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Payment Failed
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Sorry, it seems we encountered some errors during the payment process.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="/"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Go Home
          </a>
          <a href="/pricing" className="text-sm font-semibold text-gray-900">
            Back to plans <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </main>
  );
};

const PaymentResult = ({ searchParams }) => {
  console.log(searchParams);
  let successfull = searchParams.success === "true" ? true : false;
  return successfull ? <Success /> : <Failure />;
};

export default PaymentResult;
