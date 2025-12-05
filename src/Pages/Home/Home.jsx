import React from 'react';
import HeroBanner from '../../Components/Hero/Hero';
import AvailableLoans from '../../Components/AvailableLoans/AvailableLoans';
import HowItWorks from '../../Components/HowItWorks/HowItWorks';
import CustomerFeedback from '../../Components/CustomerFeedback/CustomerFeedback';
import LoanCalculatorAndFAQ from '../../Components/LoanCalculator/LoanCalculator';

const Home = () => {
  return (
    <div>
     <HeroBanner></HeroBanner>
     <AvailableLoans></AvailableLoans>
     <HowItWorks></HowItWorks>
     <CustomerFeedback></CustomerFeedback>
     <LoanCalculatorAndFAQ></LoanCalculatorAndFAQ>
    </div>
  );
};

export default Home;