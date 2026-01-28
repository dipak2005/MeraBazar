import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-4 pb-2 mt-5 ">
      <div className="container">
        <div className="row">
          {/* ABOUT */}
          <div className="col-6 col-md-2 mb-3">
            <h6 className="text-uppercase fw-bold mb-3">About</h6>
            <ul className="list-unstyled small">
              <li>
                <a href="#" className="text-white text-decoration-none">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-decoration-none">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-decoration-none">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-decoration-none">
                  Merabazar Stories
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-decoration-none">
                  Press
                </a>
              </li>
            </ul>
          </div>

          {/* HELP */}
          <div className="col-6 col-md-2 mb-3">
            <h6 className="text-uppercase fw-bold mb-3">Help</h6>
            <ul className="list-unstyled small">
              <li>
                <a href="#" className="text-white text-decoration-none">
                  Payments
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-decoration-none">
                  Shipping
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-decoration-none">
                  Cancellation
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-decoration-none">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-decoration-none">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* CONSUMER POLICY */}
          <div className="col-6 col-md-2 mb-3">
            <h6 className="text-uppercase fw-bold mb-3">Policy</h6>
            <ul className="list-unstyled small">
              <li>
                <a href="#" className="text-white text-decoration-none">
                  Return Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-decoration-none">
                  Terms of Use
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-decoration-none">
                  Security
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-decoration-none">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-decoration-none">
                  Sitemap
                </a>
              </li>
            </ul>
          </div>

          {/* SOCIAL */}
          <div className="col-6 col-md-2 mb-3">
            <h6 className="text-uppercase fw-bold mb-3">Social</h6>
            <ul className="list-unstyled small">
              <li>
                <a href="#" className="text-white text-decoration-none">
                  <Facebook /> Facebook
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-decoration-none">
                  <Twitter /> Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-decoration-none">
                  <Youtube /> YouTube
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-decoration-none">
                  <Instagram /> Instagram
                </a>
              </li>
            </ul>
          </div>

          {/* MAIL US */}
          <div className="col-12 col-md-4 mb-3">
            <h6 className=" fw-bold mb-3">Mail Us: merabazar.ecommerce@gmail.com</h6>
            <p className="small mb-1">
              MeraBazar Internet Private Limited,
              <br />
             3rd Floor, Shree Complex,
              <br />
              Ring Road Extension, Satellite Area,
              <br />
              Ahmedabad, 380015,
              <br />
              Gujarat, India
            </p>
          </div>
        </div>

        {/* Bottom copyright or payment info */}
        <hr className="border-light " />
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center small mb-3">
          <div className="mb-2 mb-md-0">
            © {new Date().getFullYear()} Mera Bazar | All rights reserved
          </div>
          <div>
            <img
              src="/images/payment.svg"
              style={{ maxHeight: "30px" }}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
