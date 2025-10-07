import React from 'react';
import { Link } from 'react-router';
import HostelLogo from '../../assets/Hotel_logo.png';

const HostelHubLogo = () => {
    return (
        <Link to='/'>
            <div className='flex items-center gap-2'>
                <img className="h-12 w-12 object-contain" src={HostelLogo} alt="HostelHub Logo" />
                <p className="text-3xl font-bold">HostelHub</p>
            </div>
        </Link>
    );
};

export default HostelHubLogo;
