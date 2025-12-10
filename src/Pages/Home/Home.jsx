import React from "react";
import useAuth from "../../Hooks/useAuth";
import Banner from "./Banner";

const Home = () => {
  const { user } = useAuth();
  console.log(user);

  return <div className="bg-gray-200 mt-17">
    <Banner></Banner>
  </div>;
};

export default Home;
