import React from "react";
import { Link } from "react-router-dom";
import FooterLogo from "../assets/footer.png"

function Footer () {
  return (
    <footer className="w-full h-16 max-w-md flex justify-center">
      <Link to='/'>
        <img src={FooterLogo} className="h-full" />
      </Link>
    </footer>
  )
}

export default Footer;