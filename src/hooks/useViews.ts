import { useState } from "react";

export const useViews = (
  views: string[],
  defaultView?: string
): [string, (e: React.MouseEvent) => void] => {
  const [view, _setView] = useState<string>(defaultView || views[0]);

  const setView = (e: React.MouseEvent) => {
    const nextView = e.currentTarget.getAttribute("data-view");
    if (!nextView) console.error(`${e.type} is missing a data-view attribute`);
    else {
      if (!views.includes(nextView)) {
        throw new Error(`View '${nextView}' is not a valid view for this component`);
      } else {
        _setView(nextView);
      }
    }
  };

  return [view, setView];
};
