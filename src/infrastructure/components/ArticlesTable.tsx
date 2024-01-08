import React, { FC, useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Article } from "../../domain/models/Article";
import { articleService } from "../../domain/services/Article.service";
import EditIcon from "@mui/icons-material/Edit";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";

type ArticlesTableProps = {
    setItemToEdit: (arg: Article) => void;
    setOpen: (arg: boolean) => void;
    update: boolean;
};

export const ArticlesTable: FC<ArticlesTableProps> = ({
    setItemToEdit,
    setOpen,
    update,
}) => {
    const { t } = useTranslation();
    const [articles, setArticles] = useState<Article[]>([]);

    useEffect(() => {
        articleService.getArticles().then((data) => setArticles(data));
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
                        <TableCell>{t("name")}</TableCell>
                        <TableCell align="right">{t("reference")}</TableCell>
                        <TableCell align="right">
                            {t("priceWithoutTaxes")}
                        </TableCell>
                        <TableCell align="right">{t("actions")}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {articles && articles.length ? (
                        articles.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.id}</TableCell>
                                <TableCell align="right">
                                    {row.priceWithoutTaxes} €
                                </TableCell>
                                <TableCell align="right">
                                    <EditIcon
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                            setItemToEdit(row);
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
