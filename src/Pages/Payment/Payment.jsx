// Checkout.jsx
import { useState } from "react";
import { useNavigate } from "react-router";

export default function Checkout() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState(100); // Example amount

  const handlePayment = () => {
    const isSuccess = Math.random() > 0.5; // Random success/fail
    if (isSuccess) {
      navigate("/payment-success");
    } else {
      navigate("/payment-failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Checkout</h2>
        <p className="mb-4">Total Amount: ${amount}</p>
        <button
          onClick={handlePayment}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}
