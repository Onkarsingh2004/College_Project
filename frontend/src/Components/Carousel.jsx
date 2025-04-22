import React from 'react'
import Image1 from  './../assets/img (1).jpg'
import Image2 from  './../assets/img (3).jpg'
import Image3 from  './../assets/img (4).jpg'

function Carousel() {
  return (
    <>
    
    <div className="row">
            <div className="col-md-7">
                <div id="carouselExampleRide" className="carousel slide" data-bs-ride="true">
                    <div className="carousel-inner">
                      <div className="carousel-item active">
                        <img src={Image1} className="d-block w-100" alt="..." style={{'height':'100vh'}}/>
                      </div>
                      <div className="carousel-item">
                        <img src={Image2} className="d-block w-100" alt="..." style={{'height':'100vh'}}/>
                      </div>
                      <div className="carousel-item">
                        <img src={Image3} className="d-block w-100" alt="..." style={{'height':'100vh'}}/>
                      </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="prev">
                      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="next">
                      <span className="carousel-control-next-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>
            </div>
            <div className="col-md-5">
                <div className="b1"></div>
                <div className="b2"></div>
            </div>
        </div>

    
    </>
  )
}

export default Carousel
