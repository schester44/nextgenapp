import Link from "next/link";
import TitleBar from "components/AppLink/TitleBar";
import { useEffect } from "react";
import { useAppLink } from "components/AppLink/Context";
import { Toast } from "cchd-applink";

export default function Sources() {
  const app = useAppLink();

  useEffect(() => {
    if (!app) return;

    Toast.create(app, {
      appearance: "info",
      message: "my notification created by the app",
      duration: 2500,
    }).dispatch(Toast.Action.Show);

    setTimeout(() => {
      Toast.create(app, {
        appearance: "error",
        message: "THIS IS WAY TOO COOL!",
        title: "Error!",
      }).dispatch(Toast.Action.Show);
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
