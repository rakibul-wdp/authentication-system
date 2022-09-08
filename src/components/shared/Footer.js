import React from 'react';

const Footer = () => {
  const date = new Date().getFullYear();
  return (
    <footer className='footer footer-center p-4 bg-secondary text-base-100 absolute bottom-0'>
      <div>
        <p>Copyright © {date} - All right reserved by GUVI Industries Ltd</p>
      </div>
    </footer>
  );
};

export default Footer;
