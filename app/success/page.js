const Success = () => {
  return (
    <div className="flex min-h-screen items-center flex-col justify-center bg-gray-100">
      <a
        className="text-black rounded-l-md my-10 py-2 hover:text-blue px-3"
        href="/profile"
      >
        <div className="flex flex-row align-middle">
          <svg
            className="w-5 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          <p className="ml-2">前往个人中心</p>
        </div>
      </a>
      <div className="rounded-lg bg-gray-50 px-16 py-14">
        <div className="flex justify-center">
          <div className="rounded-full bg-green-200 p-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500 p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-8 w-8 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </div>
          </div>
        </div>
        <h3 className="my-4 text-center text-3xl font-semibold text-gray-700">
          操作成功!
        </h3>
        <p>程序正在处理，请耐心等待一段时间。 </p>
      </div>
    </div>
  );
};

export default Success;
