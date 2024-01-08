import React, { useState } from "react";
import { ArticlesTable } from "./../../infrastructure/components/ArticlesTable";
import { Button } from "@mui/material";
import { ArticlesForm } from "./../../application/components/ArticlesForm";
import { Article } from "../../domain/models/Article";
import { useTranslation } from "react-i18next";

export const Articles = () => {
    const { t } = useTranslation();
    const [open, setOpen] = useState<boolean>(false);
    const [itemToEdit, setItemToEdit] = useState<Article | undefined>(
        undefined,
    );
    const [update, setUpdate] = useState<boolean>(false);

    const handleUpdate = () => setUpdate(!update);

    const handleClickOpen = () => {
        setOpen(true);
    };

    return (
        <>
            <ArticlesTable
                setItemToEdit={setItemToEdit}
                setOpen={setOpen}
                update={update}
            />
            <Button
                variant="outlined"
                style={{ marginTop: 20 }}
                onClick={() => {
                    setItemToEdit(undefined);
                    handleClickOpen();
                }}
            >
                {t("createArticle")}
            </Button>

            <ArticlesForm
                open={open}
                setOpen={setOpen}
                handleUpdate={handleUpdate}
                initialValues={itemToEdit}
            />
        </>
    );
};
