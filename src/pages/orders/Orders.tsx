import React, { useState } from "react";
import { Button } from "@mui/material";
import { OrdersTable } from "../../infrastructure/components/OrdersTable";
import { OrdersForm } from "../../application/components/OrdersForm";
import { Order } from "../../domain/models/Order";
import { useTranslation } from "react-i18next";

export const Orders = () => {
    const { t } = useTranslation();

    const [open, setOpen] = useState<boolean>(false);
    const [orderToEdit, setOrderToEdit] = useState<Order | undefined>(
        undefined,
    );
    const [update, setUpdate] = useState<boolean>(false);

    const handleUpdate = () => setUpdate(!update);
    const handleClickOpen = () => setOpen(true);

    return (
        <>
            <OrdersTable
                setOrderToEdit={setOrderToEdit}
                setOpen={setOpen}
                update={update}
            />
            <Button
                variant="outlined"
                style={{ marginTop: 20 }}
                onClick={() => {
                    setOrderToEdit(undefined);
                    handleClickOpen();
                }}
            >
                {t("createOrder")}
            </Button>

            <OrdersForm
                open={open}
                setOpen={setOpen}
                handleUpdate={handleUpdate}
                initialValues={orderToEdit}
            />
        </>
    );
};
