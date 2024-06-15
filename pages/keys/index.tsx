import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { sessionExist } from "@/utils/auth";
import { Spinner } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DocsPage() {
  const [loading, setLoading] = useState(true);
  const [hasSession, setHasSession] = useState(true);

  const { push } = useRouter();

  useEffect(() => {
    setHasSession(sessionExist())
    setLoading(false);
  }, []);

  if(loading) {
    <DefaultLayout>
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
          <div className="flex gap-3">
            <Spinner label="Loading..." color="warning" />
          </div>
        </section>
      </DefaultLayout>
  } if(hasSession && !loading) {
    return (
      <DefaultLayout>
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
          <div className="inline-block max-w-lg text-center justify-center">
            <h1 className={title()}>Docs</h1>
          </div>
        </section>
      </DefaultLayout>
    );
  } else if(!loading && !hasSession) {
    push('/login');
  }
}
