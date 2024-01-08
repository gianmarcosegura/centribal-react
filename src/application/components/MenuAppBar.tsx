import React, { FC } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import LanguageIcon from "@mui/icons-material/Language";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

type MenuAppBarProps = {
    locale: string;
    handleChange: (event: SelectChangeEvent<string>) => void;
};

export const MenuAppBar: FC<MenuAppBarProps> = ({ locale, handleChange }) => (
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Gianmarco
                </Typography>
                <Select
                    value={locale || "es-Es"}
                    onChange={handleChange}
                    IconComponent={LanguageIcon}
                >
                    <MenuItem value={"es-Es"}>Es</MenuItem>
                    <MenuItem value={"en-En"}>En</MenuItem>
                </Select>
            </Toolbar>
        </AppBar>
    </Box>
);
