import { Mail, MapPin, PhoneCall } from "lucide-react";
import BasilLeaf from "../../../assets/images/basil-leaf.png";

const ContactInfoBox = () => {
  return (
    <div
      className="w-11/12 pt-10 pb-8 mainInfo-container relative bottom-32 h-auto bg-white rounded-lg mx-auto"
      style={{ boxShadow: "rgba(0, 0, 0, 0.13) 0px 0px 50px -10px" }}
    >
      <div className="absolute w-full h-auto -top-[2rem] ">
        <img
          src={BasilLeaf}
          className="mx-auto h-16"
          alt="Leaf"
        />
      </div>

      <div className="flex items-center flex-wrap gap-5 p-10 justify-between text-base infoBox-container">
        <div className="infoBox w-full sm:w-[340px] rounded p-7 h-auto border flex-center flex-col gap-4 mx-auto">
          <PhoneCall className="size-8 text-[#8bc34a]" />
          <div>
            <p className="py-1 px-1">+91 9727378213</p>
            <p className="py-1 px-1">+91 8081137450</p>
          </div>
        </div>
        <div className="infoBox w-full sm:w-[340px] rounded p-7 h-auto border flex-center flex-col gap-4 mx-auto">
          <Mail className="size-8 text-[#8bc34a]" />
          <div>
            <p className="py-1 px-1">chandandev285@gmail.com</p>
            <p className="py-1 px-1"> </p>
          </div>
        </div>
        <div className="infoBox w-full sm:w-[340px] rounded p-7 h-auto border flex-center flex-col gap-4 mx-auto">
          <MapPin className="size-8 text-[#8bc34a]" />
          <div>
            <p className="py-1 px-1">Bhogwara, Ugrasenpur,</p>
            <p className="py-1 px-1">Prayagraj ( UP ) </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfoBox;
