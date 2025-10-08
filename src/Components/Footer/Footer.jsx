import React from 'react';
import HostelHubLogo from '../HostelHubLogo/HostelHubLogo';

const Footer = () => {
    return (
        <footer className="footer sm:footer-horizontal bg-black text-white p-10"  data-aos="fade-up" data-aos-delay="200"
        >
            <aside>     
                    <HostelHubLogo></HostelHubLogo>
                
                <p>      
                    Providing service since 2018
                </p>
            </aside>
            <nav>
                <h6 className="footer-title">Services</h6>
                <a className="link link-hover">Branding</a>
                <a className="link link-hover">Design</a>
                <a className="link link-hover">Marketing</a>
                <a className="link link-hover">Advertisement</a>
            </nav>
            <nav>
                <h6 className="footer-title">Company</h6>
                <a className="link link-hover">About us</a>
                <a className="link link-hover">Contact</a>
                <a className="link link-hover">Jobs</a>
                <a className="link link-hover">Press kit</a>
            </nav>
            <nav>
                <h6 className="footer-title">Legal</h6>
                <a className="link link-hover">Terms of use</a>
                <a className="link link-hover">Privacy policy</a>
                <a className="link link-hover">Cookie policy</a>
            </nav>
        </footer>
    );
};

export default Footer;