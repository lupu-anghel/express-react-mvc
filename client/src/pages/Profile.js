import React, { useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import AppLayout from "../components/AppLayout";
import Footer from "../components/Footer";

const Profile = () => {
    const { user } = useContext(UserContext);
    console.log(user);

    useEffect(() => {
        document.title = "Profile";
    }, []);

    return (
        <AppLayout>
            Profile
            <Footer />
        </AppLayout>
    );
};

export default Profile;
