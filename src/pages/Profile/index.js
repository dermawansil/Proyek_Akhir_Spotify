const Profile = ({ fetchUserData, user }) => {
    return (
        <div className="profile">
            <button className="selectButton" onClick={fetchUserData}>get Users Data</button>
            {user.user_id !== undefined && <p>Logged in as: {user.displayName}</p>}
        </div>
    )
}

export default Profile;