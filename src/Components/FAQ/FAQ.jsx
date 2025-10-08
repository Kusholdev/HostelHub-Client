import React, { useState } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { question: "What is the room capacity?", answer: "Each room can accommodate up to 3 students comfortably." },
    { question: "Is the medical facility available on the campus?", answer: "Yes, 24/7 medical assistance is available on campus." },
    { question: "Is the Wi-Fi facility available in the hall?", answer: "Yes, high-speed Wi-Fi is available in all halls." },
    { question: "Can students book a seat from home?", answer: "Yes, you can book accommodation through the online portal." },
    { question: "Who is eligible to apply for student accommodation?", answer: "All enrolled students are eligible to apply for on-campus housing." },
    { question: "When can I apply for accommodation?", answer: "Applications open at the beginning of each academic semester." },
  ];

  return (
    <section className="max-w-5xl mx-auto px-4 py-16" data-aos="fade-up" data-aos-delay="200"
    >
      <h2 className="text-center text-3xl font-extrabold mb-12">FAQ</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border-b pb-4 cursor-pointer"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <div className="flex justify-between items-center">
              <p className="text-xl text-gray-800">{faq.question}</p>
              <span
                className={`transform transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </div>

            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                openIndex === index ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-gray-600 text-md">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
