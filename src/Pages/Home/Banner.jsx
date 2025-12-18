import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const scholarships = [
  {
    universityImage: "https://clickpetroleoegas.com.br/wp-content/uploads/2025/03/Harvard.png",
    scholarshipName: "Harvard University Full Scholarship",
    worldRank: 2,
    location: "Cambridge, USA",
  },
  {
    universityImage: "https://www.edupass.org/wp-content/uploads/2020/09/eduPASS-1200_800.png.webp",
    scholarshipName: "Oxford University Rhodes Scholarship",
    worldRank: 5,
    location: "Oxford, UK",
  },
  {
    universityImage: "https://i.ndtvimg.com/i/2018-02/scholarship_650x400_41518165885.jpg?im=Resize=(1230,900)",
    scholarshipName: "Stanford Knight-Hennessy Scholars",
    worldRank: 3,
    location: "Stanford, USA",
  }
];

const Banner = () => {
  return (
    <div className="w-full">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        interval={3000}
        transitionTime={300}
      >
        {scholarships.map((scholar, index) => (
          <div key={index} className="relative">
            <img
              src={scholar.universityImage}
              className="h-[300px] md:h-[400px] w-full object-cover rounded-lg shadow-lg"
            />
            <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center px-4 text-center">
              <h2 className="text-white text-xl md:text-3xl font-bold drop-shadow-lg">
                {scholar.scholarshipName}
              </h2>
              <p className="text-gray-200 text-sm md:text-base mt-2">
                Rank: {scholar.worldRank} | Location: {scholar.location}
              </p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
