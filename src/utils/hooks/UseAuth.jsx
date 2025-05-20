import React, { useContext } from "react";
import { authContext } from "../../contextProvider/AuthProvider";

const UseAuth = () => {
  const value = useContext(authContext);
  return value;
};

export default UseAuth;
