import { auth, signOut } from "@/auth";

export async function Header() {
  const session = await auth();
  const today = new Date();
  const dateStr = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;

  return (
    <header className="flex items-center justify-between">
      <div>
        <h1 className="font-serif text-2xl text-text">NOMISUGI</h1>
        <p className="text-sm text-text3">{dateStr}</p>
      </div>
      {session?.user && (
        <div className="flex items-center gap-3">
          {session.user.image && (
            <img
              src={session.user.image}
              alt=""
              className="w-8 h-8 rounded-full"
            />
          )}
          <span className="text-sm text-text2">{session.user.name}</span>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/login" });
            }}
          >
            <button
              type="submit"
              className="text-sm text-text3 hover:text-text transition"
            >
              ログアウト
            </button>
          </form>
        </div>
      )}
    </header>
  );
}
