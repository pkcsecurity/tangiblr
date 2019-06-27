import React, {useState} from 'react';
import './App.css';
import Slider, {Range} from 'rc-slider';
import 'rc-slider/assets/index.css';

const Nav = () => {
  return (
    <div className="nav">
      <div className="nav__name">Tangiblr</div>
    </div>
  );
};

const Footer = () => {
  return (
    <div className="footer">
      <h1>Footer</h1>
    </div>
  );
};

const Body = () => {
  const [customers, setCustomers] = useState(0);

  return (
    <div className="body">
      <div className="hero">
        <div className="hero__lead">We send mail that makes money.</div>
        <div className="hero__description">
          Tangiblr integrates with your Shopify store so you convert more
          customers for more sales.
        </div>
        <a href="#">
          <div className="hero__c2a">Get Started</div>
        </a>
      </div>
      <div className="sliders">
        <h1>How much can I earn with Tangiblr?</h1>
        <h2>Customers per Month</h2>
        <div className="sliders__container">
          <Slider
            min={1}
            max={100000}
            className="slider"
            onChange={x => setCustomers(x)}
          />
          <h3>{customers}</h3>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div className="app">
      <Nav />
      <Body />
      <Footer />
    </div>
  );
};

export default App;
