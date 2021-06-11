import { API_ROUTE } from "../globals";

/**
 *
 * @param {*} props{Object}
 * 1. setUserContext {Function} - Callback to update the user context in case of 401 status code
 * 2. setLoadingContext {Function} - Callback to update the loading state for user context
 * 3. updateSetRoles {Function} - Callback to update the state of roles used in roles table
 * @returns {*}
 */
export const getRoles = (props) => {
    const { setUserContext, setLoadingContext, updateSetRoles } = props;
    fetch(API_ROUTE + "/roles", {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
    })
        .then(async (response) => {
            const data = await response.json();

            if (response.status === 401) {
                setUserContext(null);
                setLoadingContext(false);
            } else {
                updateSetRoles(data.data);
            }
        })
        .catch((error) => {
            console.log(error);
        });
};

/**
 *
 * @param {*} props{Object}
 * 1. setUserContext {Function} - Callback to update the user context in case of 401 status code
 * 2. setLoadingContext {Function} - Callback to update the loading state for user context
 * 3. roleID {String} - Id of the role that is retrieved
 * 4. setFormLoading {Function} - Callback to update state for loading form
 * 5. setFormFields {Function} - Callback to update the state for form fields with the retrieved data
 * @returns{*}
 */
export const getRole = (props) => {
    const {
        setUserContext,
        setLoadingContext,
        roleID,
        setFormLoading,
        setFormFields,
    } = props;
    fetch(API_ROUTE + "/roles/" + roleID, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
    })
        .then(async (response) => {
            const data = await response.json();
            if (response.status === 401) {
                setUserContext(null);
                setLoadingContext(false);
            }
            setFormLoading(false);
            setFormFields({
                id: {
                    value: data[0]._id,
                    required: true,
                    type: "hidden",
                },
                name: {
                    value: data[0].name,
                    required: true,
                    label: "Role name",
                    type: "text",
                },
            });
        })
        .catch((error) => {
            setFormLoading(false);
            console.log(error);
        });
};

/**
 *
 * @param {*}  props{Object}
 * 1. roleData {Object} - the data for the role
 * 2. updateOpenModal {Function} - Callback to update state for the modal
 * 3. getRoles {Function} - Function to retrieve all roles
 * 4. setLoadingContext {Function} - Callback to update the loading state for user context
 * 5. setUserContext {function} - Callback to update the user state for user context
 * 6. updateSetRoles {Function} - Callback to update the state for roles on success of PUT request
 * 7. updateSetAlert {Function} - Callback to update state for the alert
 * @returns {*}
 */
export const createRole = (props) => {
    const {
        roleData,
        updateOpenModal,
        setLoadingContext,
        setUserContext,
        getRoles,
        updateSetRoles,
        updateSetAlert,
    } = props;

    fetch(API_ROUTE + "/roles", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(roleData),
    })
        .then(async (response) => {
            const res = await response.json();
            if (response.status === 201) {
                updateSetAlert({
                    isOpen: true,
                    type: "success",
                    title: "Success!",
                    message: "Role successfully created",
                });

                getRoles({
                    setLoadingContext,
                    setUserContext,
                    updateSetRoles,
                });

                updateOpenModal(false);
            } else if (response.status === 401) {
                setUserContext(null);
                setLoadingContext(false);
            } else if (response.status === 409) {
                updateSetAlert({
                    isOpen: true,
                    type: "error",
                    title: "Error!",
                    message:
                        "Conflict. A role with the same name already exists",
                });
            } else {
                updateSetAlert({
                    isOpen: true,
                    type: "error",
                    title: "Error!",
                    message:
                        "An error occured. If you are a developer, please check the console",
                });
                updateOpenModal(false);
                console.log(res);
            }
        })
        .catch((error) => {
            updateSetAlert({
                isOpen: true,
                type: "error",
                title: "Error!",
                message:
                    "An error occured. If you are a developer, please check the console",
            });
            console.error(error);
            updateOpenModal(false);
        });
};

/**
 *
 * @param {*}  props{Object}
 * 1. id {String} - the id of the role to be updated
 * 2. roleData {Object} - the data for the role
 * 3. getRoles {Function} - Function to retrieve all roles
 * 4. updateOpenModal {Function} - Callback to update state for the modal
 * 5. setLoadingContext {Function} - Callback to update the loading state for user context
 * 6. setUserContext {function} - Callback to update the user state for user context
 * 7. updateSetRoles {Function} - Callback to update the state for roles on success of PUT request
 * 8. updateSetAlert {Function} - Callback to update state for the alert
 * @returns {*}
 */
export const updateRole = (props) => {
    const {
        id,
        roleData,
        getRoles,
        updateOpenModal,
        setLoadingContext,
        setUserContext,
        updateSetRoles,
        updateSetAlert,
    } = props;

    fetch(API_ROUTE + "/roles/" + id, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(roleData),
    })
        .then(async (response) => {
            const res = await response.json();
            if (response.status === 200) {
                updateSetAlert({
                    isOpen: true,
                    type: "success",
                    title: "Success!",
                    message: "Role successfully updated",
                });

                getRoles({ setLoadingContext, setUserContext, updateSetRoles });

                updateOpenModal(false);
            } else if (response.status === 401) {
                setUserContext(null);
                setLoadingContext(false);
            } else if (response.status === 409) {
                updateSetAlert({
                    isOpen: true,
                    type: "error",
                    title: "Error!",
                    message:
                        "Conflict. A role with the same name already exists",
                });
            } else {
                updateSetAlert({
                    isOpen: true,
                    type: "error",
                    title: "Error",
                    message:
                        "An error occured. If you are a developer, please check the console",
                });
                updateOpenModal(false);
                console.log(res);
            }
        })
        .catch((error) => {
            updateSetAlert({
                isOpen: true,
                type: "error",
                title: "Error!",
                message:
                    "An error occured. If you are a developer, please check the console",
            });
            console.error(error);
            updateOpenModal(false);
        });
};

/**
 *
 * @param {*}  props{Object}
 * 1. roleID {String} - the id of the role to be deleted
 * 2. getRoles {Function} - Function to retrieve all roles
 * 3. updateOpenModal {Function} - Callback to update state for the modal
 * 4. setLoadingContext {Function} - Callback to update the loading state for user context
 * 5. setUserContext {function} - Callback to update the user state for user context
 * 6. updateSetRoles {Function} - Callback to update the state for roles on success of DELETE request
 * 7. updateSetAlert {Function} - Callback to update state for the alert
 * @returns {*}
 */
export const removeRole = (props) => {
    const {
        roleID,
        getRoles,
        updateOpenModal,
        setLoadingContext,
        setUserContext,
        updateSetRoles,
        updateSetAlert,
    } = props;
    fetch(API_ROUTE + "/roles/" + roleID, {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
    })
        .then(async (response) => {
            const res = await response.json();
            if (response.status === 200) {
                updateSetAlert({
                    isOpen: true,
                    type: "success",
                    title: "Success!",
                    message: "Role successfully deleted",
                });

                getRoles({ setLoadingContext, setUserContext, updateSetRoles });

                updateOpenModal(false);
            } else if (response.status === 401) {
                setUserContext(null);
                setLoadingContext(false);
            } else {
                updateSetAlert({
                    isOpen: true,
                    type: "error",
                    title: "Error",
                    message:
                        "An error occured. If you are a developer, please check the console",
                });
                updateOpenModal(false);
                console.log(res);
            }
        })
        .catch((error) => {
            updateSetAlert({
                isOpen: true,
                type: "error",
                title: "Error!",
                message:
                    "An error occured. If you are a developer, please check the console",
            });
            console.error(error);
            updateOpenModal(false);
        });
};
