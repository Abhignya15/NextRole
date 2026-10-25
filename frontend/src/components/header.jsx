function Header() {
return(
<header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8">
          <p className="text-sm text-slate-500">Your next move starts here</p>

          <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
            My Profile
          </button>
        </header>
)

}

export default Header