import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import bannerImg1 from '../../assets/banner1.jpg';
import bannerImg2 from '../../assets/banner2.jpg';
import bannerImg3 from '../../assets/banner3.jpg';

const Banner = () => {
    return (
        <div className="relative w-full overflow-hidden">
            {/* Carousel */}
            <Carousel
                autoPlay
                interval={3000}
                infiniteLoop
                showThumbs={false}
                showStatus={false}
                stopOnHover={false}
            >
                {[bannerImg1, bannerImg2, bannerImg3].map((img, idx) => (
                    <div key={idx} className="h-[500px] md:h-[600px]">
                        <img
                            src={img}
                            alt={`Banner ${idx + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}
            </Carousel>

            {/* Overlay Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
                {/* Heading, Description & Search */}
                <div className="max-w-2xl w-full mb-8 bg-black/40 p-6 rounded">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white">
                        Welcome to DIU Students Hall
                    </h1>
                    <p className="text-lg md:text-xl mb-6 text-white">
                        Find the perfect stay on campus with all facilities
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 w-full">
                        <input
                            type="text"
                            placeholder="Enter your room preference"
                            className="flex-1 px-4 py-3 rounded-md text-black outline-none w-full sm:w-auto"
                        />
                        <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-md font-semibold">
                            Search
                        </button>
                    </div>
                </div>

                {/* Feature Box */}
                <div className="absolute bottom-1 left-5 bg-blue-800/95 text-white p-6 rounded-lg shadow-lg max-w-md w-full md:w-auto">
                    <h2 className="text-xl font-bold mb-4">Hostel facilities</h2>
                    <ul className="space-y-2 text-left">
                        {[
                            "Safe & Secure",
                            "Cost-Effective Living Option",
                            "Fully Furnished Rooms",
                            "Broadband & Wifi",
                            "Housekeeping",
                            "In Campus",
                            "Medical Facility",
                        ].map((item, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                                <span className="inline-block w-5 h-5 bg-white text-blue-800 font-bold rounded-full flex items-center justify-center">✓</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </div>
    );
};

export default Banner;
