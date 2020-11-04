import {
  useRef,
  useContext,
  createContext,
  ReactChild,
  ReactChildren,
  useEffect,
} from "react";
import createAppLink from "cchd-applink";

const Context = createContext(null);

type AppLinkProviderConfig = {
  apiKey: string;
  origin: string;
  ready: boolean;
};

export function useAppLink() {
  return useContext(Context);
}

export function AppLinkProvider({
  config,
  children,
}: {
  config: AppLinkProviderConfig;
  children: ReactChild | ReactChildren;
}) {
  const _app = useRef(null);

  useEffect(() => {
    _app.current = createAppLink({
      apiKey: config.apiKey,
      // FIXME: This ":3000" port shouldn't be needed in prod.
      origin: `${config.origin}:3000`,
    });
  }, []);

  return (
    <Context.Provider value={config.origin ? _app.current : null}>
      {children}
    </Context.Provider>
  );
}
