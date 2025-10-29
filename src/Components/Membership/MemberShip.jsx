import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
const MemberShip = () => {

  const { user } = useAuth();
  const navigate = useNavigate();
  const email = user?.email;



  const plans = [
    { name: 'Silver', price: '$9.99/month', features: ['Basic Access', 'Email Support', 'premium Meal Access'], color: 'border-gray-400' },
    { name: 'Gold', price: '$19.99/month', features: ['All Silver Features', 'Priority Support', 'premium Meal Access'], color: 'border-yellow-500' },
    { name: 'Platinum', price: '$29.99/month', features: ['All Gold Features', 'premium Meal Access', 'Exclusive Deals'], color: 'border-blue-500' },
  ];
  const handlePlan = (planName, planPrice) => {
    if (!user) {
    
      navigate('/login');
      return;
    }

    const cleanPrice = planPrice.replace('$', '').replace('/month', '');
    navigate(`/dashboard/payment/${email}/${planName}/${cleanPrice}`);
  }
  return (
    <div className="py-12 bg-gray-100 min-h-screen flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-10 text-gray-800">Upgrade Your Membership</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`border-2 ${plan.color} rounded-2xl shadow-md bg-white p-6 text-center hover:scale-105 transition-transform duration-300`}
          >
            <h3 className="text-2xl font-semibold mb-3">{plan.name}</h3>
            <p className="text-xl font-bold text-gray-700 mb-4">{plan.price}</p>

            <ul className="mb-6 space-y-2 text-gray-600">
              {plan.features.map((feature, i) => (
                <li key={i}>✅ {feature}</li>
              ))}
            </ul>


            <button
              onClick={() => handlePlan(plan.name, plan.price)}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Upgrade Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemberShip;
