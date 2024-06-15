import { Link, Spinner, button as buttonStyles } from "@nextui-org/react";

import { GithubIcon } from "@/components/icons";
import DefaultLayout from "@/layouts/default";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { checkAuthStatus, logout } from "@/utils/auth";
import { useRouter } from "next/router";

export default function Logout() {
  const [loading, setLoading] = useState(true);
  const { push } = useRouter();

  useEffect(() => {
    logout();
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <DefaultLayout>
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
          <div className="flex gap-3">
            <Spinner label="Loading..." color="warning" />
          </div>
        </section>
      </DefaultLayout>
    )

  } else {
    push('/login');
  }
}
