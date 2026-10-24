import React, { useEffect, useState } from 'react'

function Products() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then(res => res.json())
      .then(data => setProducts(data.products))
  }, [])

  console.log(products)

  return (
    <div className="container my-4">
      <h2 className="mb-4">Products</h2>

      <div className="row">
        {products.map(product => {
          return (
            <div className="col-12 col-sm-6 col-lg-4 col-xl-3 mb-4" key={product.id}>
              <div className="card h-100">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="text-muted small mb-2">{product.category}</p>
                  <p className="card-text">{product.description}</p>
                  <p className="fw-bold fs-5 mt-auto mb-0">{product.price} €</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Products