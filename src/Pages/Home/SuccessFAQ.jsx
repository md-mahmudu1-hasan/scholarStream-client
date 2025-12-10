import React, { useState } from "react";

const SuccessFAQ = () => {
  const faqs = [
    {
      question: "How can I apply for a scholarship?",
      answer:
        "You can apply through our platform by filling out the online application form and submitting the required documents.",
    },
    {
      question: "Are there any eligibility criteria?",
      answer:
        "Yes, each scholarship has its own eligibility criteria. Please check the details before applying.",
    },
    {
      question: "Is there any application fee?",
      answer:
        "Most scholarships are free to apply. Some may have nominal fees.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Success Stories / FAQ
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Success Story</h3>
            <p className="text-gray-600 mb-4">
              Meet Sarah, who received a full scholarship for her Masters in
              Computer Science. With our platform, she applied easily and got
              accepted in a top-ranked university.
            </p>
            <p className="text-gray-600">
              Our platform has helped hundreds of students like Sarah to achieve
              their dreams abroad.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">
              Frequently Asked Questions
            </h3>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full text-left p-4 bg-blue-600 text-white font-semibold flex justify-between items-center"
                  >
                    {faq.question}
                    <span>{openIndex === index ? "-" : "+"}</span>
                  </button>
                  {openIndex === index && (
                    <div className="p-4 bg-gray-50 text-gray-700">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessFAQ;
