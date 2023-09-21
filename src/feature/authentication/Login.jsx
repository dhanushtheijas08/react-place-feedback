import React, { useEffect, useState } from "react";
import Input from "../../components/Input";
import { useNavigate } from "react-router";
import { useAuthentication } from "../../contexts/Authentication";

export default function Login() {
  const [userData, setUserData] = useState({
    userName: "",
    password: "",
  });
  const navigate = useNavigate();
  const {
    login,
    state: { isAuthenticated, isCorrectUser, userData: allUserData },
  } = useAuthentication();
  // console.log(allUserData);
  const handleInputChange = function (input) {
    const { name, value } = input.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleFormSubmit = function (form) {
    form.preventDefault();
    login(userData.userName, userData.password);
  };
  useEffect(() => {
    if (isAuthenticated) navigate("/map/location");
  }, [isAuthenticated, navigate]);
  return (
    <div className="flex justify-center py-32">
      <form
        className="max-w-6xl text-text-primary-color"
        onSubmit={handleFormSubmit}
      >
        <h2 className="text-center text-5xl md:text-7xl font-bold text-text-primary-color mb-8 ">
          Login
        </h2>
        {isCorrectUser === "no" && (
          <p className="text-red-400 text-xl mb-3">Invalid User</p>
        )}
        <div className="flex flex-col gap-5 w-72 md:w-80">
          <Input
            placeholder="User Name"
            type="text"
            onChange={handleInputChange}
            name="userName"
            value={userData.name}
            isError={isCorrectUser === "no" ? true : false}
            errorPlaceholder="Incorrect User Name"
          />
          <Input
            placeholder="Password"
            type="password"
            onChange={handleInputChange}
            name="password"
            value={userData.password}
            isError={isCorrectUser === "no" ? true : false}
            errorPlaceholder="Incorrect Password"
          />
        </div>
        {/* <p className="font-[550] opacity-80 text-right my-4 cursor-pointer">
          Forgot Password ?
        </p> */}
        <button className="text-white mt-8 bg-primay-color rounded text-2xl w-full py-1">
          Login
        </button>
        <p className="font-[550] opacity-80 text-center mt-8">
          New To WebName?
          <span
            className="ml-1.5 font-semibold text-primay-color  cursor-pointer"
            onClick={() => navigate("/join-now")}
          >
            Join Now
          </span>
        </p>
      </form>
    </div>
  );
}
