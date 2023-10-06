import React, { useEffect, useState } from "react";
import Input from "../../components/Input";
import { useAuthentication } from "../../contexts/Authentication";
import { postUserData } from "../../hooks/postUserData";
import { useNavigate } from "react-router";
export default function JoinNow() {
  const [isDuplicate, setIsDuplicate] = useState(false);
  const navigate = useNavigate();
  const {
    state: { userData: allUserData, isAuthenticated },
    createUser,
  } = useAuthentication();
  useEffect(() => {
    if (isAuthenticated) navigate("/map/location");
  }, [isAuthenticated, navigate]);
  const [userData, setUserData] = useState({
    userName: "",
    password: "",
    confirmPassword: "",
  });
  const [showError, setShowError] = useState({
    isError: false,
    placeholder: "Password dose't match",
  });
  const handleInputChange = function (input) {
    const { name, value } = input.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleFormSubmit = function (form) {
    form.preventDefault();
    if (userData.confirmPassword !== userData.password) {
      setShowError((prev) => ({ ...prev, isError: true }));
      setUserData((prev) => ({ ...prev, password: "", confirmPassword: "" }));
      throw new Error("Confirm Password does not match with Password");
    }
    setShowError((prev) => ({ ...prev, isError: false }));
    handleCreateNewUser();
  };
  const handleCreateNewUser = async function () {
    if (!(userData && allUserData)) return;
    if (!isDuplicateUser(userData, allUserData)) {
      setIsDuplicate(false);
      const res = await postUserData({
        userName: userData.userName,
        password: userData.password,
      });
      createUser(res);
    }
    setIsDuplicate(true);
  };
  return (
    <div className="flex justify-center py-32">
      <form
        className="max-w-6xl text-text-primary-color"
        onSubmit={handleFormSubmit}
      >
        <h2 className="text-center text-5xl md:text-7xl font-bold text-text-primary-color mb-10 ">
          Join Now
        </h2>

        {isDuplicate && <p className="text-red-400  mb-3">Duplicate User</p>}
        <div className="flex flex-col gap-5 w-72 md:w-80">
          <Input
            placeholder="User Name"
            type="text"
            onChange={handleInputChange}
            name="userName"
            value={userData.name}
          />
          <Input
            placeholder="Password"
            type="password"
            onChange={handleInputChange}
            name="password"
            value={userData.password}
            isError={showError.isError}
            errorPlaceholder={showError.placeholder}
          />
          <Input
            placeholder="Confirm Password"
            type="password"
            onChange={handleInputChange}
            name="confirmPassword"
            value={userData.confirmPassword}
            isError={showError.isError}
            errorPlaceholder={showError.placeholder}
          />
        </div>
        <div className="my-4">
          <input
            type="checkbox"
            name="checkbox"
            className="accent-primay-color"
            id="checkbox"
          />
          <label
            htmlFor="checkbox"
            className="cursor-pointer ml-2 text-text-primary-color"
          >
            Accept Terms of Sample Web
          </label>
        </div>

        <button className="text-white bg-primay-color rounded text-2xl w-full py-1">
          Join Now
        </button>
      </form>
    </div>
  );
}
function isDuplicateUser(singleUser, allUser) {
  for (const user of allUser) {
    if (user.userName === singleUser.userName) return true;
  }

  return false;
}
