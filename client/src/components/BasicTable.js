import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
        // width: "auto",
        overflowX: "scroll",
    },
    actionButtons: {
        cursor: "pointer",
    },
});
/**
 *
 * @param {*} props
 * 1. columns(Array) An array with the table columns,
 * 2. dbColumns(Array) Array with the database columns coming from the API (keys of each row object)
 * 3. records(Array) The data resulted from the API response
 * 3. handleActionBtns(Function) A callback function to handle the modal state (the action buttons trigger a modal on click)
 * @returns Component
 */
const BasicTable = (props) => {
    const classes = useStyles();
    const { columns, dbColumns, records, handleActionBtns } = props;

    return (
        <>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column}>{column}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {records.map((record) => (
                            <TableRow key={record._id} data-id={record._id}>
                                {dbColumns.map((col) => (
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        key={col}
                                    >
                                        {col !== "createdAt"
                                            ? record[col]
                                            : record[col].substr(0, 10)}
                                    </TableCell>
                                ))}
                                {columns.indexOf("Actions") > -1 ? (
                                    <TableCell component="th" scope="row">
                                        <Button
                                            onClick={handleActionBtns}
                                            data-type="edit"
                                            data-id={record._id}
                                        >
                                            <EditIcon /> Edit
                                        </Button>
                                        <Button
                                            onClick={handleActionBtns}
                                            data-type="delete"
                                            data-id={record._id}
                                        >
                                            <DeleteIcon /> Delete
                                        </Button>
                                    </TableCell>
                                ) : null}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default BasicTable;
