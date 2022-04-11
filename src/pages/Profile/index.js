import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { user_id, userDisplayName, imgSrc} from "../../data/redux/userSlice";
import axios from "axios";

const Profile = () => {
    const accessToken = useSelector((state) => state.accessToken.value);
    const UserDisplayName = useSelector((state) => state.user.value.displayName);
    const setimgSrc = useSelector((state) => state.user.value.imgSrc);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUserData = async () => {
            const data = await axios 
                .get(
                    `https://api.spotify.com/v1/me?access_token=${accessToken}`
                )
                .catch((error) => error)
            console.log(data);
            console.log("username : ", data.data.display_name);
            dispatch(user_id(data.data.id));
            dispatch(userDisplayName(data.data.display_name));
            dispatch(imgSrc(data.data.images[0].url));
        }
        accessToken !== undefined && (fetchUserData()); 
    }, [accessToken, dispatch]);

    return (
        <div className="profile">
            <img className="img profile" src={setimgSrc} alt={userDisplayName} />
            <p>{UserDisplayName}</p>
        </div>
    )
}

export default Profile;