"use client";
import { useRouter } from "next/navigation";
const Modal = ({ title, context, allow, deny, show, ok }) => {
  const router = useRouter();
  return (
    <div>
      <div className="flex items-center justify-center" />
      <div id="confirmation" className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center h-screen pt-4 px-4 pb-20 text-center">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-500 opacity-75" />
          </div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" />
          ​
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <h3 className="text-xl leading-6 font-medium text-gray-900">
                {title}
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">{context}</p>
              </div>
            </div>
            <div className="bg-white px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              {allow && (
                <button
                  onClick={allow}
                  id="allow"
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Allow
                </button>
              )}
              {deny && (
                <button
                  onClick={deny}
                  id="deny"
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Deny
                </button>
              )}

              {ok && (
                <button
                  onClick={ok}
                  id="deny"
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  OK
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
