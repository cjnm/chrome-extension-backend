import { Snippet, Spinner } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { sessionExist } from "@/utils/auth";
import DefaultLayout from "@/layouts/default";

export default function DocsPage() {
  const [loading, setLoading] = useState(true);
  const [hasSession, setHasSession] = useState(true);
  const [token, setToken] = useState("");

  const { push } = useRouter();

  useEffect(() => {
    setHasSession(sessionExist());
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading && hasSession) {
      const localUser: string | null =
        typeof window !== "undefined"
          ? localStorage.getItem("chrome-extension-user")
          : null;

      if (localUser) {
        const { jwt } = JSON.parse(localUser);
        const token = {
          url: process.env.NEXT_PUBLIC_APP_URI,
          jwt,
        };
        const encoded_token = btoa(JSON.stringify(token));

        setToken(encoded_token);
      }
    }
  }, [hasSession, loading]);

  if (loading) {
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="flex gap-3">
          <Spinner color="warning" label="Loading..." />
        </div>
      </section>
    </DefaultLayout>;
  }
  if (hasSession && !loading) {
    return (
      <DefaultLayout>
        <section className="flex flex-col gap-4">
          <div className="inline-block">
            <p className="max-w-lg text-2xl font-semibold leading-normal text-gray-900 dark:text-white">
              Chrome Extension Token
            </p>
            <p className="text-blue-600/75 dark:text-blue-500/75">
              Copy the key displayed below and paste it within the Chrome
              Extension to link it with the dashboard.
            </p>
          </div>
          <Snippet hideSymbol className="max-w-xl" codeString={token} size="md">
            {token ? `${token.substring(0, 20)}**************` : ""}
          </Snippet>
        </section>
      </DefaultLayout>
    );
  } else if (!loading && !hasSession) {
    push("/login");
  }
}
