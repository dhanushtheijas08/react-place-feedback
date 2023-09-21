import styles from "./User.module.css";
import { useAuthentication } from "../contexts/Authentication";
import { useNavigate } from "react-router-dom";

function User() {
  const {
    logout,
    state: { currentUser },
  } = useAuthentication();
  const navigate = useNavigate();
  function handleClick() {
    logout();
    navigate("/");
  }
  return (
    <div className={`absolute top-5 right-5 ${styles.user}`}>
      {/* <img src={user.avatar} className="rounded-full h-9" alt={user.name} /> */}
      <span className="text-base capitalize">
        Welcome, {currentUser.userName}
      </span>
      <button
        onClick={handleClick}
        className="text-base bg-slate-800 px-4 py-2 rounded-md cursor-pointer  "
      >
        Logout
      </button>
    </div>
  );
}

export default User;
