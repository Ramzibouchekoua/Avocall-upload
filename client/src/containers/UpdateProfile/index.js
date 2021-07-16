import React,{useContext} from "react";
import UpdateProfileWrapper from "./UpdateProfile";
import UserContext from "../../context/userContext"
import UpdateProfileProWrapper from "./UpdateProfilePro";
const UpdateProfile = (props) => {
  const {userData}=useContext(UserContext)
  return props.isPro ? (
    <UpdateProfileProWrapper {...props} />
  ) : (
    <UpdateProfileWrapper {...props} user={userData.user} />
  );
};

export default UpdateProfile;
