const Expired = async () => {
  return (
    <div>
      <div className="text-center min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
        <a
          href="/api/session_logout"
          className="text-amber-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
        >
          <i className="fas fa-heart" /> Login In
        </a>
        <div className="w-full md:w-7/12 pt-5 px-4 mb-8 mx-auto text-center">
          <div className="text-sm text-gray-700 py-1">
            Your Login Status is invaild, please login in again.
          </div>
        </div>
      </div>
    </div>
  );
};
export default Expired;
