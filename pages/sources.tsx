import Link from "next/link";
import TitleBar from "components/AppLink/TitleBar";
import { useEffect } from "react";
import { useAppLink } from "components/AppLink/Context";

export default function Sources() {
  const app = useAppLink();

  useEffect(() => {
    if (!app) return;

    app.dispatch({
      type: "APP::TOAST::SHOW",
      payload: {
        id: "1233",

        // TODO: Change to 'appearance'
        toastType: "info",
        appearance: "info",
        message: "my notification created by the app",
        duration: 2500,
      },
    });

    setTimeout(() => {
      app.dispatch({
        type: "APP::TOAST::SHOW",
        payload: {
          id: "1233",

          // TODO: Change to 'appearance'
          toastType: "error",
          appearance: "error",
          title: 'Error!',
          message: "THIS IS WAY TOO COOL!",
          duration: 2500,
        },
      });
    }, 1500);
  }, [app]);

  return (
    <div>
      <TitleBar title="FROM THE APP" />

      <h1>Sources</h1>

      <Link href="/">home</Link>
    </div>
  );
}
