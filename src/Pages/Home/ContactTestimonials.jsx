import React from "react";

const ContactTestimonials = () => {
  const testimonials = [
    {
      name: "John Doe",
      role: "MSc in AI",
      message:
        "This platform helped me get my scholarship easily. Highly recommended!",
    },
    {
      name: "Jane Smith",
      role: "MBA",
      message:
        "Thanks to the guidance provided here, I secured a scholarship in a top business school.",
    },
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-6">Contact Us</h3>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <textarea
                placeholder="Message"
                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                rows="4"
              ></textarea>
              <button
                type="submit"
                className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Testimonials */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-4">Testimonials</h3>
            {testimonials.map((testi, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg"
              >
                <p className="text-gray-700 mb-2">"{testi.message}"</p>
                <h4 className="font-semibold">{testi.name}</h4>
                <span className="text-sm text-gray-500">{testi.role}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactTestimonials;
