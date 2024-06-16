import { Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import DefaultLayout from "@/layouts/default";
import { logout } from "@/utils/auth";

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
            <Spinner color="warning" label="Loading..." />
          </div>
        </section>
      </DefaultLayout>
    );
  } else {
    push("/login");
  }
}
