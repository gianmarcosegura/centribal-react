import React, { FC, useEffect } from "react";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import { articleService } from "../../domain/services/Article.service";
import { v4 as uuidv4 } from "uuid";
import { Article } from "../../domain/models/Article";
import { useTranslation } from "react-i18next";

type ArticlesFormProps = {
    open: boolean;
    setOpen: (arg: boolean) => void;
    handleUpdate: () => void;
    initialValues?: Article;
};

const initialValuesData = {
    id: "",
    name: "",
    description: "",
    priceWithoutTaxes: "",
    taxes: "",
};

const formFields = ["name", "description", "priceWithoutTaxes", "taxes"];

export const ArticlesForm: FC<ArticlesFormProps> = ({
    open,
    setOpen,
    handleUpdate,
    initialValues = initialValuesData,
}) => {
    const { t } = useTranslation();
    const formik = useFormik({
        initialValues: initialValues,
        // validationSchema: validationSchema,
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                if (!initialValues.id) {
                    await articleService.postArticle({
                        ...formValue,
                        id: uuidv4(),
                    });
                } else {
                    await articleService.putArticle(
                        initialValues.id,
                        formValue,
                    );
                }
                handleUpdate();
            } catch (err) {
                console.log(err);
            }
        },
    });

    useEffect(() => {
        formik.setValues(initialValues);
    }, [initialValues]);

    return (
        <Dialog open={open}>
            <DialogTitle>{t("article")}</DialogTitle>
            <DialogContent>
                {formFields.map((field: string) => (
                    <TextField
                        key={field}
                        id={field}
                        name={field}
                        label={t(field)}
                        margin="dense"
                        type="text"
                        fullWidth
                        variant="standard"
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        value={formik.values[field]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                ))}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)}>{t("cancel")}</Button>
                <Button
                    onClick={() => {
                        formik.handleSubmit();
                        setOpen(false);
                    }}
                >
                    {t("save")}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
