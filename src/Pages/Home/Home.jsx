import React from "react";
import useAuth from "../../Hooks/useAuth";
import Banner from "./Banner";
import Topscallership from "./Topscallership";
import ContactTestimonials from "./ContactTestimonials";
import SuccessFAQ from "./SuccessFAQ";

const Home = () => {
  const { user } = useAuth();

  return <div className="bg-gray-200 mt-17">
    <Banner></Banner>
    <Topscallership></Topscallership>
    <ContactTestimonials></ContactTestimonials>
    <SuccessFAQ></SuccessFAQ>
  </div>;
};

export default Home;
