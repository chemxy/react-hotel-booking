export function NavBar() {

    return <div>
        <nav className="flex sm:justify-center space-x-4">
            {[
                ['Home', '/dashboard'],
                ['search', '/team'],
                ['blog', '/projects'],
                ['about us', '/reports'],
            ].map(([title, url]) => (
                <a href={url}
                   className="capitalize rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900">{title}</a>
            ))}
        </nav>
    </div>
}