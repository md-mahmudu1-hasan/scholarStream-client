import { useState, useRef } from "react";
import Container from "../../Shared/Container";
import { Darkbg } from "../../Shared/Darkbg";

const FAQ = () => {
  const faqs = [
    {
      question: "What scholarships are available?",
      answer:
        "We offer merit-based, need-based, and special program scholarships to support students in various fields of study.",
    },
    {
      question: "How can I apply for a scholarship?",
      answer:
        "You can apply through our online portal by filling out the application form and submitting the required documents.",
    },
    {
      question: "What is the eligibility criteria?",
      answer:
        "Eligibility varies per scholarship program, but generally it includes academic performance, financial need, and extracurricular involvement.",
    },
    {
      question: "When will I know if I am selected?",
      answer:
        "Successful applicants are notified via email within 4-6 weeks after the application deadline.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);
  const contentRefs = useRef([]);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Darkbg>
      <Container>
        <div className="py-10">
        <h2 className="text-3xl font-bold text-center py-6  mb-8 text-black dark:text-white">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border rounded-lg overflow-hidden shadow-md dark:border-gray-700 dark:shadow-black/20"
            >
              <button
                className="w-full text-left p-4 flex justify-between items-center bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-medium dark:text-white">{faq.question}</span>
                <span className="text-xl dark:text-white">{openIndex === index ? "-" : "+"}</span>
              </button>
              <div
                ref={(el) => (contentRefs.current[index] = el)}
                className="transition-all duration-500 ease-in-out overflow-hidden"
                style={{
                  maxHeight:
                    openIndex === index
                      ? `${contentRefs.current[index]?.scrollHeight}px`
                      : "0px",
                }}
              >
                <div className="p-4 bg-white dark:bg-[#0b0b0b] dark:text-gray-100 border-t border-gray-200 dark:border-gray-700">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </Container>
    </Darkbg>
  );
};

export default FAQ;
