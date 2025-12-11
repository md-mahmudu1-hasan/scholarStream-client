import Container from "../../Shared/Container";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Aisha Rahman",
      role: "Computer Science Student",
      message:
        "Thanks to the scholarship program, I could focus fully on my studies without worrying about financial constraints. Highly recommended!",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Rafiq Hasan",
      role: "Engineering Student",
      message:
        "The scholarship gave me the confidence and support I needed to pursue my dreams. The process was smooth and transparent.",
      image: "https://randomuser.me/api/portraits/men/46.jpg",
    },
    {
      name: "Nadia Akter",
      role: "Business Student",
      message:
        "I am grateful for the opportunity to be part of this scholarship program. It has truly changed my academic journey.",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
    },
  ];

  return (
    <Container>
      <h2 className="text-3xl font-bold text-center mb-10">What Our Scholars Say</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="flex items-center mb-4">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-14 h-14 rounded-full object-cover mr-4"
              />
              <div>
                <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                <p className="text-gray-500 text-sm">{testimonial.role}</p>
              </div>
            </div>
            <p className="text-gray-700">{testimonial.message}</p>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Testimonials;
