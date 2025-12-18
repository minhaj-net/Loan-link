import React from 'react';
import { Link } from 'react-router';
import { FaTimesCircle, FaArrowLeft } from 'react-icons/fa';

const PaymentFailed = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="max-w-md w-full bg-white shadow-2xl rounded-3xl p-8 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-red-500"></div>
                
                <div className="flex justify-center mb-6 mt-4">
                    <div className="p-4 bg-red-50 rounded-full animate-pulse">
                        <FaTimesCircle className="text-6xl text-red-500" />
                    </div>
                </div>

                <h2 className="text-3xl font-extrabold text-gray-800 mb-2">Payment Canceled</h2>
                <p className="text-gray-500 mb-8 px-4">
                    Your payment process was canceled or failed. No charges were made to your account.
                </p>

                <div className="space-y-3">
                    <Link 
                        to="/dashboard/my-loans" 
                        className="btn btn-neutral w-full text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-transform hover:-translate-y-1"
                    >
                       <FaArrowLeft className="mr-2" /> Return to My Loans
                    </Link>
                    
                    <button 
                        onClick={() => window.history.back()}
                        className="btn btn-ghost w-full text-gray-500 hover:bg-gray-100 rounded-xl"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentFailed;
