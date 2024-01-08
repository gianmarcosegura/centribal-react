import React, { FC, useState, useEffect } from "react";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { Order } from "../../domain/models/Order";
import { orderService } from "../../domain/services/Order.service";
import { MultipleSelectChip } from "../../infrastructure/components/MultipleSelectChip";
import { articleService } from "../../domain/services/Article.service";
import { Article } from "../../domain/models/Article";
import { useTranslation } from "react-i18next";

type OrdersFormProps = {
    open: boolean;
    setOpen: (arg: boolean) => void;
    handleUpdate: () => void;
    initialValues?: Order;
};

const initialValuesData: Order = {
    id: "",
    list: undefined,
    totalPriceWithoutTaxes: "",
    totalPriceWithTaxes: "",
};

const formFields = ["totalPriceWithoutTaxes", "totalPriceWithTaxes"];

export const OrdersForm: FC<OrdersFormProps> = ({
    open,
    setOpen,
    handleUpdate,
    initialValues = initialValuesData,
}) => {
    const { t } = useTranslation();
    const [articles, setArticles] = useState<Article[] | undefined>(undefined);

    const formik = useFormik({
        initialValues: initialValues,
        // validationSchema: validationSchema,
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                if (!initialValues.id) {
                    await orderService.postOrder({
                        ...formValue,
                        id: uuidv4(),
                    });
                } else {
                    await orderService.putOrder(initialValues.id, formValue);
                }
                handleUpdate();
            } catch (err) {
                console.log(err);
            }
        },
    });

    useEffect(() => {
        articleService.getArticles().then((data) => setArticles(data));
    }, []);

    return (
        <Dialog open={open}>
            <DialogTitle>{t("order")}</DialogTitle>
            <DialogContent>
                <MultipleSelectChip
                    articles={articles}
                    formik={formik}
                    initialValues={initialValues}
                />
                {formFields.map((field: string) => (
                    <TextField
                        key={field}
                        id={field}
                        name={field}
                        label={t(field)}
                        margin="dense"
                        type="text"
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
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
