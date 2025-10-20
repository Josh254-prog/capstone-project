export default function Header({ user, onSignOut }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-3xl font-extrabold">My To‑Do List</h2>
        <p className="text-sm text-gray-500">Organize tasks — simple, fast & synced</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-sm text-gray-600 mr-2">{user.email}</div>
        <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold">
          {(user.email || '?')[0].toUpperCase()}
        </div>
        <button onClick={onSignOut} className="ml-3 px-3 py-1 rounded-md border">Sign out</button>
      </div>
    </div>
  );
}