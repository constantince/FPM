export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
      <div className="absolute w-full bg-slate-700 bg-opacity-10 top-0 left-0 flex items-center justify-center min-h-screen">
        <div
          style={{ borderTopColor: "transparent" }}
          className="w-8 h-8 border-4 border-blue-200 rounded-full animate-spin"
        />
        <p className="ml-2">loading...</p>
      </div>
    );
  }
  