import Nav from "../../comps/nav";

export default async function Layout({ children }) {
    return <>
    <Nav />
    {children}
    </>
}