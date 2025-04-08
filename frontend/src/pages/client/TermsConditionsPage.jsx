import { Helmet } from "react-helmet";
import Footer from "../../components/client/Footer";
import Header from "../../components/client/Header";

const TermsConditionsPage = () => {
  return (
    <>
      <Helmet>
        <title>Vebzo - Terms and Conditions</title>
        <meta
          name="description"
          content="Welcome to the Home page of My Website"
        />
      </Helmet>
      <div className="w-full h-auto text-gray-600">
        <Header />
        <div className="py-10 w-full px-5 md:w-[700px] mx-auto">
          <h1 className="py-5 text-3xl font-bold">Terms and Conditions</h1>
          <div className="text-left">
            <span className="ml-2">Effective Date: March 15, 2025</span>

            <div className="bg-[#f8f6f3] px-4 py-4 border rounded-md my-3">
              <h2 className="text-xl font-medium py-3">1. Introduction</h2>
              <p>
                These terms and conditions outline the rules and regulations for
                using the Vebzo website. By using our services, you agree to
                these terms.
              </p>
            </div>

            <div className="bg-[#f8f6f3] px-4 py-4 border rounded-md my-3">
              <h2 className="text-xl font-medium py-3">
                2. Website Usage and Acceptance
              </h2>
              <li>Minimum age for users: [Age, e.g., 18 years].</li>
              <li>
                Providing accurate and up-to-date information is mandatory.
              </li>
              <li>Unauthorized use is strictly prohibited.</li>
            </div>

            <div className="bg-[#f8f6f3] px-4 py-4 border rounded-md my-3">
              <h2 className="text-xl font-medium py-3">
                3. Products and Services
              </h2>

              <li>We provide local and organic products.</li>
              <li>
                All products are subject to availability and pricing changes.
              </li>
            </div>

            <div className="bg-[#f8f6f3] px-4 py-4 border rounded-md my-3">
              <h2 className="text-xl font-medium py-3">
                4. Orders and Payments
              </h2>
              <li>Order will be processed only after payment confirmation.</li>
              <li>Prices may change at any time.</li>
            </div>

            <div className="bg-[#f8f6f3] px-4 py-4 border rounded-md my-3">
              <h2 className="text-xl font-medium py-3">
                5. Return and Refund Policy
              </h2>
              <li>Returns are only accepted for defective products.</li>
              <li>
                Requests for returns must be made within [Number of days, e.g.,
                2 days] of delivery.
              </li>
            </div>

            <div className="bg-[#f8f6f3] px-4 py-4 border rounded-md my-3">
              <h2 className="text-xl font-medium py-3">
                6. Intellecutal Property
              </h2>
              <li>All content displayed on Vebzo is our property.</li>
              <li>
                Copying or republishing content without permission is strictly
                prohibited.
              </li>
            </div>

            <div className="bg-[#f8f6f3] px-4 py-4 border rounded-md my-3">
              <h2 className="text-xl font-medium py-3">
                7. Limitation of Liability
              </h2>
              <li>
                Vebzo will not be responsible for any indirect, incidental, or
                consequential damages.
              </li>
              <li>Your use of our services is at your own risk.</li>
            </div>

            <div className="bg-[#f8f6f3] px-4 py-4 border rounded-md my-3">
              <h2 className="text-xl font-medium py-3">
                8. Changes and Modifications
              </h2>
              <li>We reserve the right to modify these terms at any time.</li>
              <li>Changes will be posted on this page.</li>
            </div>

            <div className="bg-[#f8f6f3] px-4 py-4 border rounded-md my-3">
              <h2 className="text-xl font-medium py-3">9. Contact Us</h2>
              <li>📧 example@example.com</li>
              <li>📞 0123456789</li>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default TermsConditionsPage;
