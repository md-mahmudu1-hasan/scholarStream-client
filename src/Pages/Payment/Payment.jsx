import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxios from "../../Hooks/useAxios";
import toast from "react-hot-toast";

const PaymentCheckout = () => {
  const { id } = useParams();
  const axiosInstance = useAxios();
  const [application, setApplication] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get(`/applications/${id}`)
      .then((res) => {
        setApplication(res.data[0]);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load application data");
        setLoading(false);
      });
  }, [id, axiosInstance]);

  const handlePayment = async () => {
    const paymentInfo = {
      applicationFees: application.applicationFees,
      ApplicantEmail: application.ApplicantEmail,
      applicationId: application._id,
      ScholarshipName: application.ScholarshipName,
    };

    await axiosInstance
      .post("/create-checkout-session", paymentInfo)
      .then((res) => {
        window.location.href = res.data.url;
      });
  };

  if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center 
    bg-gray-100 dark:bg-[#0d1224]">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );
}

if (!application) {
  return (
    <div className="min-h-screen flex items-center justify-center 
    text-red-500 bg-gray-100 dark:bg-[#0d1224]">
      Application not found
    </div>
  );
}

return (
  <div className="min-h-screen flex items-center justify-center px-4
  bg-gray-100 dark:bg-[#0d1224]">
    
    <div
      className="w-full max-w-md rounded-xl shadow-lg p-6
      bg-white dark:bg-[#111827]
      text-gray-900 dark:text-white"
    >
      <h2 className="text-2xl font-bold text-center mb-6">
        Payment Checkout
      </h2>

      <div className="space-y-4 text-sm">
        <div className="flex justify-between gap-4">
          <span className="font-medium text-gray-600 dark:text-gray-300">
            Scholarship Name
          </span>
          <span className="text-right">
            {application?.ScholarshipName}
          </span>
        </div>

        <div className="flex justify-between gap-4">
          <span className="font-medium text-gray-600 dark:text-gray-300">
            University Name
          </span>
          <span className="text-right">
            {application?.universityName}
          </span>
        </div>

        <div className="flex justify-between gap-4">
          <span className="font-medium text-gray-600 dark:text-gray-300">
            Applicant Email
          </span>
          <span className="text-right break-all">
            {application?.ApplicantEmail}
          </span>
        </div>

        <hr className="border-gray-300 dark:border-gray-600" />

        <div className="flex justify-between text-lg font-semibold">
          <span>Application Fees</span>
          <span>${application.applicationFees}</span>
        </div>
      </div>

      <button
        onClick={handlePayment}
        className="w-full mt-6 py-2 rounded-md transition
        bg-blue-600 hover:bg-blue-700 text-white"
      >
        Pay Now
      </button>
    </div>
  </div>
);

};

export default PaymentCheckout;
