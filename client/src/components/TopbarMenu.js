import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import MenuList from "@material-ui/core/MenuList";
import Popper from "@material-ui/core/Popper";
import Grow from "@material-ui/core/Grow";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import useLogout from "../hooks/useLogout";

const useStyles = makeStyles((theme) => ({
    account: {
        display: "flex",
        alignItems: "center",
        color: "#fff",
        "& > svg": {
            display: "inline-block",
            marginLeft: theme.spacing(1),
        },
    },
    company: {
        padding: theme.spacing(0, 1),
    },
    textRight: {
        textAlign: "right",
    },
    menuList: {
        minWidth: theme.spacing(25),
    },
    menuLink: {
        textDecoration: "none",
        color: "inherit",
    },
    menuIcon: {
        marginRight: theme.spacing(1),
        color: theme.palette.blue,
    },
}));

const TopbarMenu = (props) => {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const { user } = props;

    const classes = useStyles();
    const { handleLogout } = useLogout();

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };
    const handleListKeyDown = (event) => {
        if (event.key === "Tab") {
            event.preventDefault();
            setOpen(false);
        }
    };
    // return focus to the button when we transitioned from !open -> open
    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);

    return (
        <>
            <Grid container>
                <Grid item lg={9} xs={6}></Grid>
                <Grid item lg={3} xs={6} className={classes.textRight}>
                    <Button
                        ref={anchorRef}
                        aria-controls={open ? "menu-list-grow" : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                    >
                        <Typography
                            component="h6"
                            color="textSecondary"
                            className={classes.account}
                        >
                            {user.user.name} <AccountBoxIcon />
                        </Typography>
                    </Button>
                </Grid>
            </Grid>
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === "bottom"
                                    ? "center top"
                                    : "center bottom",
                        }}
                    >
                        <Paper className={classes.menuList}>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    autoFocusItem={open}
                                    id="menu-list-grow"
                                    onKeyDown={handleListKeyDown}
                                >
                                    <Link
                                        to="/profile"
                                        className={classes.menuLink}
                                    >
                                        <MenuItem onClick={handleClose}>
                                            <AccountCircleIcon
                                                className={classes.menuIcon}
                                            />
                                            Profile
                                        </MenuItem>
                                    </Link>

                                    <MenuItem onClick={handleLogout}>
                                        <ExitToAppIcon
                                            className={classes.menuIcon}
                                        />
                                        Logout
                                    </MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    );
};

export default TopbarMenu;
