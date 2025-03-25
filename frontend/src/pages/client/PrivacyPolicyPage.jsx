import Footer from "../../components/client/Footer";
import Header from "../../components/client/Header";

const PrivacyPolicyPage = () => {
  return (
    <div className="w-full h-auto text-gray-600">
      <Header />
      <div className="py-10 w-full px-5 md:w-[700px] mx-auto">
        <h1 className="py-5 text-3xl font-bold">Privacy Policy</h1>
        <div className="text-left">
          <span className="ml-2">Effective Date: March 15, 2025</span>

          <div className="bg-[#f8f6f3] px-4 py-4 border rounded-md my-3">
            <h2 className="text-xl font-semibold py-3">1. Introduction</h2>
            <p>
              ApnaMarket takes your privacy seriously. This Privacy Policy
              explains how we collect, use, and protect your data. Please read
              it carefully.
            </p>
          </div>

          <div className="bg-[#f8f6f3] px-4 py-4 border rounded-md my-3">
            <h2 className="text-xl font-semibold py-3">
              2. Information We Collect
            </h2>
            <p>We collect your information in the following ways:</p>

            <li>
              <b>Personal Information</b>: Name, email address, phone number,
              address etc.
            </li>
            <li>
              <b>Usage Data</b>: Your browsing activities, page visits, and
              other analytics.
            </li>
            <li>
              <b>Payment Information</b>: Processed securely by third-party
              processors.
            </li>
          </div>

          <div className="bg-[#f8f6f3] px-4 py-4 border rounded-md my-3">
            <h2 className="text-xl font-semibold py-3">
              3. How We Use Your Information
            </h2>
            <p>We use your information for the following purposes: </p>

            <li>Order processing and management.</li>
            <li>Customer support and and feedback improvement.</li>
            <li>Personalizing your website experience.</li>
            <li>Sending promotional emails and offers (if you opt-in).</li>
          </div>

          <div className="bg-[#f8f6f3] px-4 py-4 border rounded-md my-3">
            <h2 className="text-xl font-semibold py-3">
              4. Information Security
            </h2>
            <p>
              We use approriate technical and organizational measures to protect
              your data. However, no internet transmission is completely secure.
            </p>
          </div>

          <div className="bg-[#f8f6f3] px-4 py-4 border rounded-md my-3">
            <h2 className="text-xl font-semibold py-3">
              5. Your Choices and Rights
            </h2>
            <p>
              You have the right to access, modify, or request the deletion of
              your personal information.
            </p>
          </div>

          <div className="bg-[#f8f6f3] px-4 py-4 border rounded-md my-3">
            <h2 className="text-xl font-semibold py-3">
              6. Changes to This Policy
            </h2>
            <p>
              We may update this policy from time to time. Changes will be
              posted on this page.
            </p>
          </div>

          <div className="bg-[#f8f6f3] px-4 py-4 border rounded-md my-3">
            <h2 className="text-xl font-semibold py-3">7. Contact Us</h2>
            <p>If you have any questions or concerns, please contact us:</p>

            <li>📧 example@example.com</li>
            <li>📞 0123456789</li>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
