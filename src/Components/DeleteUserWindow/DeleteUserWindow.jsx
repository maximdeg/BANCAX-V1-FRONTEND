import React from "react";
import "./DeleteUserWindow.css";

const DeleteUserWindow = ({ handleDeleteUser }) => {
    return (
        <div className="window delete-user-window">
            <h1>Delete account</h1>
            <button className="btn btn-delete-user" onClick={handleDeleteUser}>
                Delete my account
            </button>
        </div>
    );
};

export default DeleteUserWindow;

/*confirmAlert({
                title: 'DELETE CHANNEL',
                message: `Are you sure you want to delete the channel "${channel_name}"?`,
                buttons: [
                    {
                        label: 'Cancel',
                    },
                    {
                        label: 'Confirm',
                        onClick: () => {
                            setNewChannel((prevState) => channels);
                            deleteChannel(id_workspace, channel_id);
                            navigate('/workspace/' + id_workspace + '/' + workspace.channels[0].id);
                        },
                    },
                ],
            }); */
