import React from 'react'
import { Link } from 'react-router-dom'
import "./index.css"

function HomePage() {
  return (
    <div className="homepage">
      <div className="hero-banner">
        <h1>Welcome to ShopLift</h1>
        <p>Your one-stop shop for the best products at unbeatable prices!</p>
        <Link to="/products" className="btn btn-primary">Shop Now</Link>
      </div>
      <div className="features">
        <h2>Why Shop with Us?</h2>
        <div className="feature">
          <h3>Wide Selection</h3>
          <p>Explore a vast range of products across various categories.</p>
        </div>
        <div className="feature">
          <h3>Best Prices</h3>
          <p>We offer competitive prices on all our products.</p>
        </div>
        <div className="feature">
          <h3>Fast Shipping</h3>
          <p>Enjoy quick and reliable shipping on every order.</p>
        </div>
      </div>
      <div className="promotions">
        <h2>Current Promotions</h2>
        <div className="promotion">
          <h3>Summer Sale</h3>
          <p>Get up to 50% off on selected items!</p>
        </div>
        <div className="promotion">
          <h3>Buy One Get One Free</h3>
          <p>On all accessories. Limited time offer.</p>
        </div>
      </div>
    </div>
  )
}

export default HomePage
