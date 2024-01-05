import Nav from "../../comps/nav";

export default async function Layout({ children }) {
    return <div className="pt-20">
    <Nav />
    {children}
    </div>
}