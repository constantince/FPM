"use client";
const Expired = async () => {
  return (
    <div>
      <h1
        onClick={() => {
          fetch("/api/session_logout").then((res) => {
            window.location.href = "/signin";
          });
        }}
      >
        Expired
      </h1>
    </div>
  );
};
export default Expired;
