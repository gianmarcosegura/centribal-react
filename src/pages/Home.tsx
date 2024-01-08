import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Articles } from "./articles/Articles";
import { Orders } from "./orders/Orders";
import { useTranslation } from "react-i18next";

export const Home = () => {
    const { t } = useTranslation();
    const DEFAULT_TAB = "1";
    const [value, setValue] = React.useState<string>(DEFAULT_TAB);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                margin: "auto",
                marginTop: 3,
                width: "90%",
                typography: "body1",
            }}
        >
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList onChange={handleChange}>
                        <Tab label={t("article_plural")} value="1" />
                        <Tab label={t("order_plural")} value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <Articles />
                </TabPanel>
                <TabPanel value="2">
                    <Orders />
                </TabPanel>
            </TabContext>
        </Box>
    );
};
