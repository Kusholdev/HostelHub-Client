import React from 'react';
import Banner from '../../Components/Banner/Banner';
import FAQ from '../../Components/FAQ/FAQ';
import Testimonial from '../../Components/Testimonial/Testimonial';

const Home = () => {
    return (
        <div>
            <Banner></Banner>

            {/* Extra section - 1 */}
            <FAQ></FAQ>
            <Testimonial></Testimonial>
        </div>
    );
};

export default Home;