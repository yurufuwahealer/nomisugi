import { signIn } from "@/auth";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { AuthError } from "next-auth";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const session = await auth();
  if (session) redirect("/");

  const { error } = await searchParams;

  async function credentialsLogin(formData: FormData) {
    "use server";
    try {
      await signIn("credentials", {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        redirectTo: "/",
      });
    } catch (error) {
      if (error instanceof AuthError) {
        return redirect("/login?error=CredentialsSignin");
      }
      throw error;
    }
  }

  async function googleLogin() {
    "use server";
    await signIn("google", { redirectTo: "/" });
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm flex flex-col gap-6">
        <div className="text-center">
          <h1 className="font-serif text-3xl text-text">NOMISUGI</h1>
          <p className="text-sm text-text3 mt-1">ログインしてください</p>
        </div>

        {error && (
          <p className="text-sm text-red-500 text-center">
            メールアドレスまたはパスワードが正しくありません
          </p>
        )}

        {/* Email/Password Form */}
        <form action={credentialsLogin} className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="block text-sm text-text2 mb-1">
              メールアドレス
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-text placeholder:text-text3 focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="dev@example.com"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm text-text2 mb-1"
            >
              パスワード
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-text placeholder:text-text3 focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-xl bg-accent py-3 text-white font-bold hover:opacity-90 transition"
          >
            ログイン
          </button>
        </form>

        {/* Google Login */}
        <form action={googleLogin}>
          <button
            type="submit"
            className="w-full rounded-xl border border-border bg-surface py-3 text-text font-bold hover:bg-gray-50 transition flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Googleでログイン
          </button>
        </form>
      </div>
    </div>
  );
}
