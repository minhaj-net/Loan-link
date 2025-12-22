import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { FaCheckCircle, FaSpinner, FaExclamationTriangle } from 'react-icons/fa';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const loanId = searchParams.get('loanId');
    const axiosSecure = useAxiosSecure();
    const [status, setStatus] = useState('verifying');
    const [paymentData, setPaymentData] = useState(null);

    useEffect(() => {
        if (sessionId && loanId) {
            axiosSecure.post('/payment/success', { sessionId, loanId })
                .then(res => {
                    if (res.data.success) {
                        setStatus('success');
                        setPaymentData(res.data.result); 
                    } else {
                        setStatus('failed');
                    }
                })
                .catch(err => {
                    console.error(err);
                    setStatus('error');
                });
        }
    }, [sessionId, loanId, axiosSecure]);

    if (status === 'verifying') {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                <FaSpinner className="animate-spin text-4xl text-blue-600 mb-4" />
                <h2 className="text-xl font-semibold text-gray-700">Verifying your payment...</h2>
                <p className="text-gray-500">Please do not close this window.</p>
            </div>
        );
    }
    // failed and errro handeling
    if (status === 'failed' || status === 'error') {
        return (
             <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                <div className="max-w-md w-full bg-white shadow-2xl rounded-2xl p-8 text-center border-t-4 border-red-500">
                    <div className="flex justify-center mb-6">
                        <div className="p-4 bg-red-100 rounded-full">
                            <FaExclamationTriangle className="text-4xl text-red-500" />
                        </div>
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-800 mb-2">Verification Failed</h2>
                    <p className="text-gray-600 mb-8">
                        We couldn't verify your payment. Please contact support if you believe this is an error.
                    </p>
                    <Link to="/dashboard/my-loans" className="btn btn-error w-full text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all">
                        Return to My Loans
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-4">
            <div className="max-w-lg w-full bg-white shadow-2xl rounded-3xl overflow-hidden">
                <div className="bg-green-500 p-8 text-center text-white">
                    <div className="flex justify-center mb-4">
                         <FaCheckCircle className="text-6xl text-white shadow-sm rounded-full bg-green-500" />
                    </div>
                    <h2 className="text-4xl font-black tracking-tight">Payment Successful!</h2>
                    <p className="text-green-100 mt-2 font-medium">Thank you for your application fee.</p>
                </div>
                
                <div className="p-8">
                    <div className="space-y-4 mb-8">
                        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                            <span className="text-gray-500 font-medium">Amount Paid</span>
                            <span className="text-2xl font-bold text-gray-800">$10.00</span>
                        </div>
                         <div className="flex justify-between items-center bg-white border border-gray-100 p-3 rounded-lg">
                            <span className="text-gray-500 text-sm">Loan ID</span>
                            <span className="text-gray-700 font-mono text-sm">{loanId}</span>
                        </div>
                         <div className="flex justify-between items-center bg-white border border-gray-100 p-3 rounded-lg">
                            <span className="text-gray-500 text-sm">Transaction Ref</span>
                            <span className="text-gray-700 font-mono text-sm truncate max-w-[150px]">{sessionId?.slice(-10)}...</span>
                        </div>
                    </div>

                    <Link 
                        to="/dashboard/my-loans" 
                        className="btn btn-success w-full text-white font-bold text-lg py-4 h-auto rounded-xl shadow-green-200 shadow-lg hover:shadow-green-300 hover:-translate-y-1 transition-all duration-200"
                    >
                        Back to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;
