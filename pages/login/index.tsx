import { Link, Spinner, button as buttonStyles } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { GithubIcon } from "@/components/icons";
import DefaultLayout from "@/layouts/default";
import { checkAuthStatus } from "@/utils/auth";

export default function Login() {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const searchParams = useSearchParams();
  const { push } = useRouter();

  const jwt: string | null = searchParams.get("jwt") || null;
  let localUser: string | null =
    typeof window !== "undefined"
      ? localStorage.getItem("chrome-extension-user")
      : null;

  useEffect(() => {
    if (jwt) {
      checkAuthStatus(jwt).then((response) => {
        setLoading(false);
        setLoggedIn(response);
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "chrome-extension-user",
            JSON.stringify({ jwt }),
          );
        }
      });
    } else if (localUser) {
      const { jwt } = JSON.parse(localUser);

      checkAuthStatus(jwt).then((response) => {
        setLoading(false);
        setLoggedIn(response);
      });
    } else {
      setLoading(false);
      setLoggedIn(false);
    }
  }, [jwt, localUser]);

  if (loading) {
    return (
      <DefaultLayout>
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
          <div className="flex gap-3">
            <Spinner color="warning" label="Loading..." />
          </div>
        </section>
      </DefaultLayout>
    );
  } else if (!loading && !loggedIn) {
    return (
      <DefaultLayout>
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
          <div className="flex gap-3 mt-36">
            <Link
              className={buttonStyles({ variant: "bordered", radius: "full" })}
              href={`${process.env.NEXT_PUBLIC_APP_URI}/api/auth/github`}
            >
              <GithubIcon size={20} />
              Login with GitHub
            </Link>
          </div>
        </section>
      </DefaultLayout>
    );
  } else {
    push("/");
  }
}
