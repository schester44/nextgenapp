import React from "react";
import { useAppLink } from "./Context";
import { Loading as AppLinkLoading } from "cchd-applink";

const Loading = () => {
  const app = useAppLink();

  React.useEffect(() => {
    const loader = AppLinkLoading.create(app);

    loader.dispatch(AppLinkLoading.Action.Start);

    return () => {
      loader.dispatch(AppLinkLoading.Action.Stop);
    };
  }, []);

  return null;
};

export default Loading;
