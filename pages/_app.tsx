import { AppProps } from "next/app";
import { AppLinkProvider } from "components/AppLink/Context";
import { useRouter } from "next/router";
import { useRef } from "react";

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const account = useRef<string | undefined>();

  if (router.query.account) {
    account.current = router.query.account as string;
  }
 
  const config = {
    apiKey: process.env.NEXT_PUBLIC_APP_API_KEY,
    origin: account.current,
  };

  return (
    //@ts-ignore
    <AppLinkProvider config={config}>
      <Component {...pageProps} />;
    </AppLinkProvider>
  );
}

export default App;
