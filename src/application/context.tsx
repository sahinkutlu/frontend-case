import { createContext } from "react";

type AppContextProps = object;

const AppContext = createContext<AppContextProps>({});

export type { AppContextProps };
export default AppContext;
