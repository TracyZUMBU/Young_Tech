import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container--footer">
        <div className="about">
          <div className="logo logo--footer">TechWork</div>
          <p className="about__presentation">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam,
            facere sint. Sunt, quos? Repellat explicabo.
          </p>
          <ul className="media-list">
            <li className="fb"></li>
            <li className="twitter"></li>
            <li className="linkedin"></li>
            <li className="pinterest"></li>
          </ul>
        </div>
        <div className="quick-links">
          <h6 className="title">Quick links</h6>
          <ul>
            <li href="">Post New job</li>
            <li href="">jobs List</li>
            <li hretf="">Employer List</li>
            <li href=""></li>
          </ul>
        </div>
        <div className="tranding-jobs">
          <h6 className="title">Tranding Jobs</h6>
          <ul>
            <li href="">Designer</li>
            <li href="">UI & UX Expert</li>
            <li href="">Developer</li>
            <li href="">IOS developer</li>
            <li href="">Business Developer</li>
          </ul>
        </div>
        <div className="newsletter">
          <h6 className="title">Newsletter</h6>
          <p>
            Subscribe to Lawson to get all latest Job, Resume, Company Listing &
            Blog post to stay update.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
