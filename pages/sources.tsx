import Link from "next/link";
import TitleBar from "components/AppLink/TitleBar";
import { useEffect } from "react";
import { useToast } from "../hooks/useToast";

export default function Sources() {
  const showToast = useToast();

  useEffect(() => {
    showToast({ message: "my app notification" });

    setTimeout(() => {
      showToast({ message: "WOAH, COOL ERROR!", appearance: "error" });
    }, 1500);
  }, [showToast]);

  return (
    <div>
      <TitleBar title="FROM THE APP" />

      <h1>Sources</h1>

      <Link href="/">home</Link>
    </div>
  );
}
