import React from "react";
import {
  TitleBar as AppLinkTitleBar,
  Button as AppLinkButton,
} from "cchd-applink";
import { useAppLink } from "./Context";
import { omit } from "lodash";

const TitleBar = ({
  title,
  primaryAction,
  secondaryActions,
}: {
  title: string;
  primaryAction?: any;
  secondaryActions?: any[];
}) => {
  const app = useAppLink();

  // FIXME:
  // Need to implement a useEffect that updates when the buttons REALLY change.. <TitleBar primaryAction={{ label: "Save" }} /> would be a new button every time we re-render <TitleBar />. Putting the action behind a useMemo seems annoying.

  const _primaryAction = React.useRef(primaryAction);
  const _secondaryActions = React.useRef(secondaryActions);

  React.useEffect(() => {
    if (!app) return;

    // If there are `onAction methods then we need to subscribe to the clicks.`

    let subscriptions: any[] = [];
    const secondaryBtns: any[] = [];

    let buttons = { primary: undefined, secondary: secondaryBtns };

    if (_primaryAction.current) {
      const primaryBtn = AppLinkButton.create(
        app,
        omit(_primaryAction.current, ["onAction"])
      );

      buttons.primary = primaryBtn.get();

      if (typeof _primaryAction.current.onAction === "function") {
        subscriptions.push(
          primaryBtn.subscribe(_primaryAction.current.onAction)
        );
      }
    }

    if (Array.isArray(_secondaryActions.current)) {
      buttons.secondary = _secondaryActions.current.map((options) => {
        const btn = AppLinkButton.create(app, omit(options, ["onAction"]));

        if (typeof options.onAction === "function") {
          subscriptions.push(btn.subscribe(options.onAction));
        }

        return btn.get();
      });
    }

    const titleBar = AppLinkTitleBar.create(app, { title, buttons });

    return () => {
      subscriptions.forEach((unsub) => unsub());
    };
  }, [title, primaryAction, secondaryActions, app]);

  return null;
};

export default TitleBar;
