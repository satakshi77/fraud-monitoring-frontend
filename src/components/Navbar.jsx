export default function Navbar() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <nav
      className="
      bg-white
      rounded-2xl
      px-8
      py-5
      mb-8
      shadow-sm
      flex
      justify-between
      items-center
      "
    >
      <h1
        className="
        text-2xl
        font-bold
        text-slate-800
        "
      >
        Dashboard
      </h1>

      <button
        onClick={logout}
        className="
        bg-red-500
        text-white
        px-5
        py-2
        rounded-xl
        hover:bg-red-600
        transition
        duration-300
        "
      >
        Logout
      </button>
    </nav>
  );
}