import Link from "next/link";
import TitleBar from "components/AppLink/TitleBar";
import Loading from "components/AppLink/Loading";
import { useState } from "react";
import { useAppLink } from "components/AppLink/Context";

export default function Index() {
  const [loading, setLoading] = useState(false);

  const app = useAppLink();

  return (
    <div>
      <TitleBar
        title="Hello. This title bar belongs to CCHD but was generated by the app."
        primaryAction={{
          label: "This Button was created in the app but is rendered in CCHD",
        }}
      />

      <h1>NextGen App</h1>

      {loading && <Loading />}

      <div>
        <button onClick={() => setLoading(true)}>Start Async Action</button>

        <button
          onClick={() => {
            setLoading(false);

            app.dispatch({
              type: "APP::TOAST::SHOW",
              payload: {
                id: "12345",

                // TODO: Change to 'appearance'
                toastType: "success",
                appearance: "success",
                message: "Async Action Completed!",
                duration: 2500,
              },
            });
          }}
        >
          Stop Async Action
        </button>
      </div>

      <Link href="/sources">Sources</Link>
    </div>
  );
}
