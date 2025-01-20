import { Mail, MapPin, PhoneCall } from "lucide-react";

const ContactInfoBox = () => {
  return (
    <div
      className="w-11/12 pt-10 pb-8 mainInfo-container relative bottom-32 h-auto bg-white rounded-lg mx-auto"
      style={{ boxShadow: "rgba(0, 0, 0, 0.13) 0px 0px 50px -10px" }}
    >
      <div className="absolute w-full h-auto -top-[2rem] ">
        <img
          src="/public/images/basil-leaf.png"
          className="mx-auto h-16"
          alt="Leaf"
        />
      </div>

      <div className="flex items-center flex-wrap gap-5 p-10 justify-between text-base infoBox-container">
        <div className="infoBox w-full sm:w-[340px] rounded p-7 h-auto border flex-center flex-col gap-4 mx-auto">
          <PhoneCall className="size-8 text-[#8bc34a]" />
          <div>
            <p className="py-1 px-1">+91 1234567890</p>
            <p className="py-1 px-1">+91 9876543210</p>
          </div>
        </div>
        <div className="infoBox w-full sm:w-[340px] rounded p-7 h-auto border flex-center flex-col gap-4 mx-auto">
          <Mail className="size-8 text-[#8bc34a]" />
          <div>
            <p className="py-1 px-1">info@example.com</p>
            <p className="py-1 px-1">support@example.com</p>
          </div>
        </div>
        <div className="infoBox w-full sm:w-[340px] rounded p-7 h-auto border flex-center flex-col gap-4 mx-auto">
          <MapPin className="size-8 text-[#8bc34a]" />
          <div>
            <p className="py-1 px-1">1569 Ave, New York,</p>
            <p className="py-1 px-1">NY 10028, USA</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfoBox;
