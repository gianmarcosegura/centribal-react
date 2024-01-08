import React, { Suspense, useState } from "react";
import { Home } from "./pages/Home";
import "./App.css";
import { MenuAppBar } from "./application/components/MenuAppBar";
import LocaleContext from "./LocaleContext";
import i18n from "./i18n";
import { SelectChangeEvent } from "@mui/material/Select";

function Loading() {
    return <>Loading...</>;
}

function App() {
    const [locale, setLocale] = useState<string>(i18n.language);
    i18n.on("languageChanged", () => setLocale(i18n.language));
    console.log("locale", locale);
    const handleChange = (event: SelectChangeEvent<string>) => {
        i18n.changeLanguage(event.target.value);
    };

    return (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <LocaleContext.Provider value={{ locale, setLocale }}>
            <Suspense fallback={<Loading />}>
                <MenuAppBar locale={locale} handleChange={handleChange} />
                <Home />
            </Suspense>
        </LocaleContext.Provider>
    );
}

export default App;
