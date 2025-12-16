import React from "react";
import { motion } from "framer-motion";
import Banner from "./Banner";
import Topscallership from "./Topscallership";
import FAQ from "./SuccessFAQ";
import Testimonials from "./ContactTestimonials";
import useAuth from "../../Hooks/useAuth";
import Loader from "../Loader/Loader";

const Home = () => {
  const { loading } = useAuth();

  if (loading) {
    return <Loader />;
  }
  const sectionVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className="bg-gray-200 mt-18">
      <Banner />
<title>Home</title>
      <motion.div
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="mt-12"
      >
        <Topscallership />
      </motion.div>

      <motion.div
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="mt-12"
      >
        <Testimonials />
      </motion.div>

      <motion.div
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="mt-12 mb-12"
      >
        <FAQ />
      </motion.div>
    </div>
  );
};

export default Home;
