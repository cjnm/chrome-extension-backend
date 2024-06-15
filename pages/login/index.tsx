import { Link, Spinner, button as buttonStyles } from "@nextui-org/react";

import { GithubIcon } from "@/components/icons";
import DefaultLayout from "@/layouts/default";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const searchParams = useSearchParams();

  const jwt: string | null = searchParams.get('jwt') || null;
  let localUser: string | null = typeof window !== "undefined" ? localStorage.getItem('chrome-extension-user') : null;

  useEffect(() => {
    if(jwt) {
      
    }

    if(localUser) {
      const { jwt } = JSON.parse(localUser);
    }
  }, [jwt, localUser]);

  if (loading) {

    return (
      <DefaultLayout>
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
          <div className="flex gap-3">
            {loading ? <Spinner label="Loading..." color="warning" />
              : 'haitt'}
          </div>
        </section>
      </DefaultLayout>
    )

  } else if (!loading && !loggedIn) {
    return (
      <DefaultLayout>
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
          <div className="flex gap-3">
            <Link
              isExternal
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

  }
}
