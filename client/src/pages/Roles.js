import React, { useEffect, useState, useContext } from "react";
import AppLayout from "../components/AppLayout";
import BasicTable from "../components/BasicTable";
import Footer from "../components/Footer";
import { UserContext } from "../context/UserContext";
import BasicModal from "../components/BasicModal";
import CustomForm from "../components/CustomForm";
import {
    getRoles,
    getRole,
    createRole,
    updateRole,
    removeRole,
} from "../api/roles";
import CustomAlert from "../components/CustomAlert";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    deleteText: {
        margin: theme.spacing(3, 0),
    },
}));

const Roles = () => {
    const classes = useStyles();
    /*
     * Roles State
     */
    const [roles, setRoles] = useState(null);
    const updateSetRoles = (data) => {
        setRoles(data);
    };

    /*
     * Props for the BasicTable component
     */
    const columns = ["ID", "Name", "Created At", "Actions"];
    const dbColumns = ["_id", "name", "createdAt"];

    /*
     * Managing user context
     * update the user context in case the API retrieves a 401
     * so the routes can redirect towards login page
     */
    const { setLoadingContext, setUserContext } = useContext(UserContext);

    /*
     * Fetching data for the Roles table
     */
    useEffect(() => {
        document.title = "Roles";

        getRoles({ setLoadingContext, setUserContext, updateSetRoles });
    }, [setUserContext, setLoadingContext, setRoles]);

    /*
     * Modal state
     */
    const [openModal, setOpenModal] = useState(false);
    //passed down to TransitionModal component to be able to update the state
    const updateOpenModal = (state) => {
        setOpenModal(state);
    };

    /*
     * Alert state
     */
    const [alertData, setAlertData] = useState({
        isOpen: false,
        type: "success",
        title: "",
        message: "",
    });
    const updateSetAlert = (state) => {
        setAlertData(state);
    };

    /*
     * Action type state (edit / delete / add)
     */
    const [action, setAction] = useState(null);

    /*
     * Form fields & form loading state
     */
    const [formFields, setFormFields] = useState({});
    const [formLoading, setFormLoading] = useState(true);

    /*
     * Handle click on add new button
     */
    const handleCreate = () => {
        setAction("add");
        setOpenModal(true);
        setFormFields({
            name: {
                value: "",
                required: true,
                label: "Role name",
                type: "text",
            },
        });
        setFormLoading(false);
    };
    /*
     * Callback to handle form submit for create new
     */
    const onSubmitAddCallback = (data) => {
        const roleData = {
            name: data["name"]["value"],
        };
        createRole({
            roleData,
            updateOpenModal,
            setLoadingContext,
            setUserContext,
            getRoles,
            updateSetRoles,
            updateSetAlert,
        });
    };

    /*
     * State handler for actions to be passed down as props
     * into the BasicTable component, for the edit / delete buttons
     */
    const handleActionBtns = (event) => {
        //get the type of action button clicked (edit | delete)
        const type = event.currentTarget.getAttribute("data-type");
        const id = event.currentTarget.getAttribute("data-id");
        if (type === "edit") {
            setAction("edit");
            setFormFields({
                id: {
                    value: "",
                    required: false,
                    label: "",
                    type: "hidden",
                },
                name: {
                    value: "",
                    required: true,
                    label: "Role name",
                    type: "text",
                },
            });
        }
        if (type === "delete") {
            setAction("delete");
        }
        setRoleID(id);
        setOpenModal(true);
    };

    /*
     * Role id state for delete / edit handling
     */
    const [roleID, setRoleID] = useState(null);

    /*
     * Fetch data for edit a role
     * GET role data for UPDATE form
     */
    useEffect(() => {
        if (action === "edit") {
            getRole({
                setUserContext,
                setLoadingContext,
                roleID,
                setFormLoading,
                setFormFields,
            });
        }
    }, [action, roleID, setUserContext, setLoadingContext, roles]);

    /*
     * Submit callback, passed as a prop for CustomForm component
     * (for UPDATE action) to be called upon submitting the form
     * gets the data from the form and makes a fetch request
     */
    const onSubmitEditCallback = (data) => {
        const roleData = {
            name: data["name"]["value"],
        };
        const id = data["id"]["value"];

        updateRole({
            id,
            roleData,
            getRoles,
            updateOpenModal,
            setLoadingContext,
            setUserContext,
            updateSetRoles,
            updateSetAlert,
        });
    };

    /*
     *   Delete action handler
     */
    const handleDelete = () => {
        removeRole({
            roleID,
            getRoles,
            updateOpenModal,
            setLoadingContext,
            setUserContext,
            updateSetRoles,
            updateSetAlert,
        });
    };

    return (
        <AppLayout>
            <h1>
                Roles{" "}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCreate}
                >
                    <AddIcon /> Add
                </Button>
            </h1>

            {roles ? (
                <>
                    <CustomAlert
                        openAlert={alertData.isOpen}
                        type={alertData.type}
                        title={alertData.title}
                        message={alertData.message}
                        updateSetAlert={updateSetAlert}
                    />

                    <BasicModal
                        title={
                            action === "edit"
                                ? "Edit role"
                                : action === "delete"
                                ? "Delete role"
                                : action === "add"
                                ? "Add role"
                                : "Basic Modal"
                        }
                        openModal={openModal}
                        updateOpenModal={updateOpenModal}
                    >
                        {action === "add" ? (
                            <CustomForm
                                formFields={formFields}
                                button={{ text: "Create", color: "primary" }}
                                onSubmitCallback={onSubmitAddCallback}
                                loading={formLoading}
                            />
                        ) : action === "edit" ? (
                            <CustomForm
                                formFields={formFields}
                                button={{ text: "Update", color: "primary" }}
                                onSubmitCallback={onSubmitEditCallback}
                                loading={formLoading}
                            />
                        ) : action === "delete" ? (
                            <div>
                                <Typography className={classes.deleteText}>
                                    You are about to delete this role. The
                                    action is irreversible. If you are surre you
                                    want to proceed, click the Delete button
                                    bellow.
                                </Typography>

                                <Button
                                    type="button"
                                    variant="contained"
                                    color="secondary"
                                    onClick={handleDelete}
                                >
                                    Delete
                                </Button>
                            </div>
                        ) : (
                            ""
                        )}
                    </BasicModal>

                    <BasicTable
                        columns={columns}
                        dbColumns={dbColumns}
                        records={roles}
                        handleActionBtns={handleActionBtns}
                    />
                </>
            ) : (
                <>Loading...</>
            )}
            <Footer />
        </AppLayout>
    );
};

export default Roles;
