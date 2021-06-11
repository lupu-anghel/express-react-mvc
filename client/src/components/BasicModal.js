import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        // border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(4, 4, 3),
        position: "relative",
        width: "50%",
    },
    modalBtns: {
        padding: theme.spacing(1, 3),
        marginTop: theme.spacing(3),
    },
    cancelContainer: {
        display: "flex",
        justifyContent: "flex-end",
    },

    closeIcon: {
        position: "absolute",
        right: theme.spacing(4),
        top: theme.spacing(2),
        cursor: "pointer",
    },
}));

/**
 *   Modal Component with auto-generated form based on the props sent.
 *  <p>
 *   @params props(object) containing:
 *   1. openModal(boolean) Current state of the modal (opened/closed)
 *   2. updateOpenModal(function) Function to update the state of the modal, receives boolean as param
 *   3. title(string) String for the modal title,
 *   @returns Component
 */
const BasicModal = (props) => {
    const classes = useStyles();

    //get the props passed in the modal
    const { openModal, updateOpenModal, title } = props;

    const handleClose = () => {
        updateOpenModal(false);
    };

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openModal}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openModal}>
                    <div className={classes.paper}>
                        <CloseIcon
                            className={classes.closeIcon}
                            onClick={handleClose}
                        />
                        <h2 id="transition-modal-title">
                            {title ? title : "Basic Modal"}
                        </h2>
                        {props.children}
                    </div>
                </Fade>
            </Modal>
        </div>
    );
};
export default BasicModal;
