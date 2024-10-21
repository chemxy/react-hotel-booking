export function NavBar() {

    return <>
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
        <div
            className="flex rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
            <input id="username" name="username" type="text" placeholder="janesmith" autoComplete="username"
                   className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 focus:rounded-lg placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            />
        </div>

    </>
}