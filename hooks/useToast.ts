import { useCallback } from "react";
import { useAppLink } from "components/AppLink/Context";
import { Toast } from "cchd-applink";

export function useToast() {
  const app = useAppLink();

  return useCallback(
    (options) => {
      Toast.create(app, options).dispatch(Toast.Action.Show);
    },
    [app]
  );
}
