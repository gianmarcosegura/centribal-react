import React, { FC, useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Order } from "../../domain/models/Order";
import { orderService } from "../../domain/services/Order.service";
import { t } from "i18next";

type OrdersTableProps = {
    setOrderToEdit: (args: Order | undefined) => void;
    setOpen: (arg: boolean) => void;
    update: boolean;
};

export const OrdersTable: FC<OrdersTableProps> = ({
    setOrderToEdit,
    setOpen,
    update,
}) => {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        orderService.getOrders().then((data) => setOrders(data));
    }, [update]);

    return (
        <TableContainer component={Paper}>
            <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
            >
                <TableHead>
                    <TableRow>
                        <TableCell>{t("reference")}</TableCell>
                        <TableCell align="right">
                            {t("priceWithTaxes")}
                        </TableCell>
                        <TableCell align="right">
                            {t("priceWithoutTaxes")}
                        </TableCell>
                        <TableCell align="right">{t("actions")}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders && orders.length ? (
                        orders.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="right">
                                    {row.totalPriceWithTaxes} €
                                </TableCell>
                                <TableCell align="right">
                                    {row.totalPriceWithoutTaxes} €
                                </TableCell>
                                <TableCell align="right">
                                    <EditIcon
                                        sx={{ cursor: "pointer" }}
                                        onClick={() => {
                                            setOrderToEdit(row);
                                            setOpen(true);
                                        }}
                                    />
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <Box sx={{ display: "flex", margin: 4 }}>
                            <CircularProgress />
                        </Box>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
