import React from 'react';
import Banner from '../../Components/Banner/Banner';
import FAQ from '../../Components/FAQ/FAQ';
import Testimonial from '../../Components/Testimonial/Testimonial';
import MealsByCategory from '../../Components/MealsByCategory/MealsByCategory';

const Home = () => {
    return (
        <div>
            <Banner></Banner>

            <MealsByCategory></MealsByCategory>
            {/* Extra section - 1 */}
            <FAQ></FAQ>
            <Testimonial></Testimonial>
        </div>
    );
};

export default Home;