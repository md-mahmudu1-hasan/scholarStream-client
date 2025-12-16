import React from "react";
import Banner from "./Banner";
import Topscallership from "./Topscallership";
import FAQ from "./SuccessFAQ";
import Testimonials from "./ContactTestimonials";
import useAuth from "../../Hooks/useAuth";
import Loader from "../Loader/Loader";

const Home = () => {
  const {loading} = useAuth();

  if(loading){
    return <Loader></Loader>
  }
  return (
    <div className="bg-gray-200 mt-17">
      <Banner></Banner>
      <Topscallership></Topscallership>
      <Testimonials></Testimonials>
      <FAQ></FAQ>
    </div>
  );
};

export default Home;
