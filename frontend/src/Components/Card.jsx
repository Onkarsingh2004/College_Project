import React from 'react'
import {Link} from 'react-router'

function Card({product}) {
  const imageurl="http://localhost:3000/public/"

  return (
    <div>
<div className="card text-center mt-3">
<Link to={"/item/"+product._id} className="text-dark text-decoration-none">
<img src={imageurl+product.image} className="card-img-top" alt="..." height={280}/>
<div className="card-body">
<p className="card-title" style={{minHeight:50}}>{product.title}</p>
<p className="card-text"> Price : <i className="bi bi-currency-rupee"></i> {product.sale_price}  
<del className='text-muted'> <i className="bi bi-currency-rupee"></i>{product.mrp}</del> </p>
</div>
</Link>
</div>
</div>
  )
}

export default Card
