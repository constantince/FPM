// const param = new URL(window.location.href).searchParams.get("success");

export default function Layout({ success, failure, children }) {
  return <>{children === "true" ? success : failure}</>;
}
