import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { user_id, userDisplayName, imgSrc} from "../../data/redux/userSlice";



const Profile = () => {
    const accessToken = useSelector((state) => state.accessToken.value);
    const UserDisplayName = useSelector((state) => state.user.value.displayName);
    const setimgSrc = useSelector((state) => state.user.value.imgSrc);
    const dispatch = useDispatch();

     useEffect(() => {
        accessToken !== undefined && (
            fetchUserData(accessToken).then(res => {
                dispatch(user_id(res.id));
                dispatch(setUserDisplayName(res.display_name));
                dispatch(imgSrc(res.images[0].url));
            }));
    }, [accessToken, dispatch]);

    return (
        <div className="profile">
            <img className="img profile" src={setimgSrc} alt={userDisplayName} />
            <p>{UserDisplayName}</p>
        </div>
    )
}

export default Profile;