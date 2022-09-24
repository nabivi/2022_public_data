import React from "react";
import FooterLogo from "../assets/footer.png"

function Footer () {
  return (
    <footer className="w-full h-16 max-w-md flex justify-center">
      <img src={FooterLogo} className="h-full" />
    </footer>
  )
}

export default Footer;