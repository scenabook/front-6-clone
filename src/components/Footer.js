import { Facebook, Instagram, Twitter, Linkedin } from 'react-bootstrap-icons';
import { Link } from "react-router-dom";

function Footer() {

    return (
        <div className="footer">
            <div className="container">
                <p>
                    <a href="https://facebook.com" target="_blank" rel="noreferrer"><Facebook size={40} /></a>
                    <a href="https://instagram.com" target="_blank" rel="noreferrer"><Instagram size={40} /></a>
                    <a href="https://twitter.com" target="_blank" rel="noreferrer"><Twitter size={40} /></a>
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer"><Linkedin size={40} /></a>
                </p>

                <p className="text-center">
                    Copyright ©2020 All rights reserved
                </p>

                <div className="text-center mt-2">
                    <Link to="/politika-privatnosti" className="me-3">Politika privatnosti</Link>
                    <Link to="/politika-kolacica">Politika kolačića</Link>
                </div>
            </div>
        </div>
    );
}

export default Footer;