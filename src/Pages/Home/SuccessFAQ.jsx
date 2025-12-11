import { useState, useRef, useEffect } from "react";
import Container from "../../Shared/Container";

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
    <Container>
      <h2 className="text-3xl font-bold text-center mb-8 py-10">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border rounded-lg overflow-hidden shadow-md"
          >
            <button
              className="w-full text-left p-4 bg-gray-100 hover:bg-gray-200 flex justify-between items-center"
              onClick={() => toggleFAQ(index)}
            >
              <span className="font-medium">{faq.question}</span>
              <span className="text-xl">{openIndex === index ? "-" : "+"}</span>
            </button>
            <div
              ref={(el) => (contentRefs.current[index] = el)}
              className={`transition-all duration-500 ease-in-out overflow-hidden`}
              style={{
                maxHeight:
                  openIndex === index
                    ? `${contentRefs.current[index]?.scrollHeight}px`
                    : "0px",
              }}
            >
              <div className="p-4 bg-white border-t">{faq.answer}</div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default FAQ;
