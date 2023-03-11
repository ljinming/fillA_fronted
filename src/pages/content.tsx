/** @format */

import { createContext } from "react";

/** @format */
export const MyContext = createContext({
  account: "",
  setAccount: (type: string) => {},
});
