import React, { FC, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { Article } from "../../domain/models/Article";
import { Order } from "../../domain/models/Order";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";

type MultipleSelectChipProps = {
    articles?: Article[];
    formik: any;
    initialValues: Order;
};

function isJson(str: string) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

export const MultipleSelectChip: FC<MultipleSelectChipProps> = ({
    articles,
    formik,
    initialValues,
}) => {
    const { t } = useTranslation();
    const [personName, setPersonName] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedItems, setSelectedItems] = useState<Article[]>([]);
    const handleChange = (event: SelectChangeEvent<string[]>) => {
        const {
            target: { value },
        } = event;
        if (Array.isArray(value)) {
            value.forEach((element: string) => {
                if (isJson(element)) {
                    setSelectedItems([...selectedItems, JSON.parse(element)]);
                }
            });
            const names = value.map((el: string) =>
                isJson(el) ? JSON.parse(el).name : el,
            );
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            setPersonName(typeof names === "string" ? names.split(",") : names);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    useEffect(() => {
        if (initialValues.list && initialValues.list.length) {
            const data = [
                ...personName,
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                initialValues.list.map((el) => el.name),
            ];
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            setSelectedItems(initialValues.list);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            setPersonName(...data);
        }
    }, [initialValues]);

    useEffect(() => {
        console.log("lanzado");
        const totalPriceWithoutTaxes = selectedItems.reduce(
            (accumulator: number, currentValue: Article) =>
                accumulator + Number(currentValue.priceWithoutTaxes),
            0,
        );
        const totalPriceWithTaxes = selectedItems.reduce(
            (accumulator: number, currentValue: Article) =>
                accumulator +
                (Number(currentValue.priceWithoutTaxes) +
                    (Number(currentValue.priceWithoutTaxes) / 100) *
                        Number(currentValue.taxes)),
            0,
        );
        formik.setFieldValue("totalPriceWithoutTaxes", totalPriceWithoutTaxes);
        formik.setFieldValue("totalPriceWithTaxes", totalPriceWithTaxes);
        formik.setFieldValue("list", selectedItems);
    }, [selectedItems, open]);

    return (
        <div>
            <Button
                sx={{ marginBottom: 2, width: "100%" }}
                variant="outlined"
                onClick={handleOpen}
            >
                {t("addArticle")}
            </Button>
            <FormControl sx={{ width: "100%" }}>
                <Select
                    multiple
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={personName}
                    onChange={handleChange}
                    disabled
                    IconComponent={() => null}
                    renderValue={(selected) => (
                        <Box
                            sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                        >
                            {selected.map((value, index) => (
                                <Chip
                                    key={value}
                                    label={value}
                                    onDelete={() => {
                                        const a = personName;
                                        a.splice(index, 1);
                                        setPersonName(a);

                                        const d = selectedItems;
                                        d.splice(index, 1);
                                        setSelectedItems(d);

                                        handleOpen();
                                    }}
                                />
                            ))}
                        </Box>
                    )}
                >
                    {articles &&
                        articles.length &&
                        articles.map((article) => (
                            <MenuItem
                                key={article.id}
                                value={JSON.stringify(article)}
                            >
                                {article.name}
                            </MenuItem>
                        ))}
                </Select>
            </FormControl>
        </div>
    );
};
