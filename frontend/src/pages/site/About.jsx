import React from 'react'
import Banner from '../../Components/Banner'
import Image1 from  './../../assets/about.png'
import Image2 from  './../../assets/img (1).png'
import { Link } from 'react-router'
function About() {
  return (
    <>
<Banner title="About Us" pname="About"/>
<main className="container">
    <div className="row justify-content-between">
        <div className="col-md-4 m-5 py-5 lh-lg text-justify">
            <p>At JwelleryShop, we believe that jewelry is more than just adornment; it's a reflection of your unique personality and a timeless expression of love and cherished moments. </p>
            <p>Explore our range of contemporary designs, from minimalist pendants and delicate earrings to bold statement pieces that make a lasting impression.</p>
            <p>At JwelleryShop, we believe in creating a seamless and enjoyable online shopping experience. Our user-friendly website and dedicated customer support team are here to assist you every step of the</p>

            <Link to="/contact"><button className="btn  bg-light text-decoration-none">Contact Us</button></Link>  
        </div>
        <div className="col-md-6 m-5 py-5">
            <img src={Image1} alt="" className="w-100"/>
        </div>
    </div>

    <div className="row justify-content-between">
        <div className="col-md-6 py-5">
            <img src={Image2} alt="" className="w-100"/>
        </div>
        <div className="col-md-5 py-5 lh-lg text-justify">
            <p>We curate a collection of thoughtfully designed jewelry that celebrates individuality and self-expression. Our pieces are crafted with meticulous attention to detail, using high-quality materials and ethical sourcing practices.</p>

            <h5>What does the name GLAMSPHERE mean?</h5>
            <p>The name "GLAMSPHERE" seems to be a combination of:

                "GLAM" – Short for "glamour," which is associated with elegance, style, and attractiveness.
                "SPHERE" – Suggesting a world, domain, or community.
                Together, "GLAMSPHERE" could imply a stylish or glamorous space, community, or environment, possibly related to fashion, beauty, luxury, or even a sophisticated social platform.
                
                Are you thinking of using this name for something specific?</p>

        </div>

    </div>
</main>



    </>
  )
}

export default About
