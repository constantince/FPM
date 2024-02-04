import Nav from '../../comps/nav'

export default async function Layout({ children }) {
    return (
        <div className="h-full">
            <Nav />
            {children}
        </div>
    )
}
