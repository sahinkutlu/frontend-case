import React, { useMemo } from "react";

import AppContext from "./context";

const AppProvider: React.FC<{ children?: React.ReactNode }> = ({
  children = "",
}) => {
  // const [state, setState] = useState();
  const memo = useMemo(() => ({}), []);
  return <AppContext.Provider value={memo}>{children}</AppContext.Provider>;
};

export default AppProvider;
