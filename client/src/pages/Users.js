import React, { useEffect, useState, useContext } from "react";
import AppLayout from "../components/AppLayout";
import Footer from "../components/Footer";
import BasicTable from "../components/BasicTable";
import { API_ROUTE } from "../globals";
import { UserContext } from "../context/UserContext";

const Users = () => {
    const [users, setUsers] = useState(null);
    const columns = ["ID", "First Name", "Last Name", "Email", "Created At"];
    const dbColumns = ["_id", "firstName", "lastName", "email", "createdAt"];

    //get context to be changed in case the API retrieves a 401
    const { setLoadingContext, setUserContext } = useContext(UserContext);

    useEffect(() => {
        document.title = "Users";

        fetch(API_ROUTE + "/users", {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        })
            .then(async (response) => {
                const data = await response.json();

                //update context in case of 401 response
                if (response.status === 401) {
                    setUserContext(null);
                    setLoadingContext(false);
                } else {
                    setUsers(data.data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, [setUserContext, setLoadingContext]);

    return (
        <AppLayout>
            <h1>Users</h1>

            {users ? (
                <BasicTable
                    columns={columns}
                    dbColumns={dbColumns}
                    records={users}
                />
            ) : (
                <>Loading...</>
            )}
            <Footer />
        </AppLayout>
    );
};

export default Users;
