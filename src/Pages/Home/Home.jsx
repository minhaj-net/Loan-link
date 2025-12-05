import React from 'react';
import HeroBanner from '../../Components/Hero/Hero';
import AvailableLoans from '../../Components/AvailableLoans/AvailableLoans';
import HowItWorks from '../../Components/HowItWorks/HowItWorks';

const Home = () => {
  return (
    <div>
     <HeroBanner></HeroBanner>
     <AvailableLoans></AvailableLoans>
     <HowItWorks></HowItWorks>
    </div>
  );
};

export default Home;