import React, { useState } from "react";
import { motion } from "framer-motion";

const testimonials = [
    { text: "HostelHub made it so easy to find and book my hostel room. Everything was done online within minutes!", name: "Ahsan Rahman", role: "CSE Student, BRAC University" },
    { text: "I love how smooth the booking process is. I could select my preferred room and pay instantly.", name: "Nusrat Jahan", role: "EEE Student, BUET" },
    { text: "The dashboard is super clean and easy to use. Managing hostel details has never been simpler.", name: "Tanvir Ahmed", role: "Business Student, NSU" },
    { text: "HostelHub’s real-time updates helped me track my application status without calling the admin.", name: "Samira Khan", role: "Architecture Student, DU" },
    { text: "Thanks to HostelHub, I didn’t have to visit the hostel office physically. Total digital convenience!", name: "Rafiul Hasan", role: "Software Engineering Student, AIUB" },
    { text: "I could easily compare room facilities and choose the one that fit my budget best. Great platform!", name: "Farzana Akter", role: "Medical Student, DMC" },
    { text: "The interface is so simple — even for new users. HostelHub saved me hours of manual work.", name: "Jahidul Islam", role: "Civil Engineering Student, RUET" },
    { text: "Booking and payment through HostelHub is super secure and fast. Highly recommend!", name: "Mithila Chowdhury", role: "Law Student, IUB" },
    { text: "HostelHub connected me with the perfect room right near my campus. Very satisfied!", name: "Rakib Hasan", role: "Mechanical Engineering Student, KUET" },
    { text: "No more long queues at the hostel office — HostelHub makes everything digital and efficient.", name: "Tanzina Sultana", role: "Pharmacy Student, ULAB" }
];

const Testimonial = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const nextSlide = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
    const prevSlide = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

    const getPosition = (index) => {
        if (index === activeIndex) return "center";
        if (index === (activeIndex - 1 + testimonials.length) % testimonials.length) return "left";
        if (index === (activeIndex + 1) % testimonials.length) return "right";
        return "hidden";
    };

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4 sm:p-6 rounded-2xl"
            data-aos="fade-up"
            data-aos-delay="200"
        >
            <div className="relative w-full max-w-5xl">
                <div className="flex flex-col sm:flex-row justify-center items-center sm:space-x-6 space-y-6 sm:space-y-0">
                    {testimonials.map((testimonial, index) => {
                        const position = getPosition(index);
                        if (position === "hidden") return null;

                        return (
                            <motion.div
                                key={index}
                                className="w-full sm:w-80 h-auto sm:h-64 bg-white rounded-2xl shadow-xl p-6 transition-all duration-500 text-center"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{
                                    opacity: position === "center" ? 1 : 0.6,
                                    scale: position === "center" ? 1 : 0.9,
                                    filter: position === "center" ? "blur(0px)" : "blur(2px)"
                                }}
                                transition={{ duration: 0.5 }}
                            >
                                <svg
                                    className="w-8 h-8 text-blue-500 mb-4 mx-auto"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                </svg>
                                <p className="text-gray-700 mb-4 text-sm sm:text-base">{testimonial.text}</p>
                                <h3 className="text-base sm:text-lg font-semibold text-gray-800">{testimonial.name}</h3>
                                <p className="text-xs sm:text-sm text-gray-500">{testimonial.role}</p>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Navigation */}
                <div className="flex justify-between mt-6">
                    <button onClick={prevSlide} className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300">◀</button>
                    <button onClick={nextSlide} className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300">▶</button>
                </div>

                {/* Pagination Dots */}
                <div className="flex justify-center mt-4 space-x-2">
                    {testimonials.map((_, index) => (
                        <div
                            key={index}
                            className={`w-3 h-3 rounded-full ${index === activeIndex ? "bg-blue-500" : "bg-gray-300"}`}
                        />
                    ))}
                </div>
            </div>
        </div>

    );
};

export default Testimonial;
