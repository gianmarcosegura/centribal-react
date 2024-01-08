import { createContext } from "react";

const defaultValue = {
    locale: "es-Es",
    setLocale: (arg: string) => null,
};

export default createContext(defaultValue);
