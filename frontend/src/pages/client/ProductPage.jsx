import { Star } from "lucide-react";
import Footer from "../../components/client/Footer";
import Header from "../../components/client/Header";

const ProductPage = () => {
  return (
    <div className="w-full h-auto text-left">
      <Header />
      <div className="px-20 py-20 bg-[#f8f6f3]">
        <div className="flex items-start pb-14">
          <div className="w-[550px] h-[550px]">
            <img
              src="/public/images/potato-1.webp"
              className="w-full h-full object-fit"
              alt=""
            />
          </div>
          <div className="px-10 text-left w-[650px] text-[15px]">
            <h1 className="text-4xl font-semibold amiri-quarn ">Potato</h1>
            <div className="flex items-center">
              <div className="flex-center py-5">
                <Star className="text-yellow-500 fill-yellow-300" size="18" />
                <Star className="text-yellow-500 fill-yellow-300" size="18" />
                <Star className="text-yellow-500 fill-yellow-300" size="18" />
                <Star className="text-yellow-500 fill-yellow-300" size="18" />
                <Star className="text-yellow-500 fill-yellow-300" size="18" />
              </div>
              <span className="ml-2">( 1 customer Review)</span>
            </div>
            <h3 className="text-xl font-bold py-1">Rs. 35.00</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatibus omnis, temporibus veritatis aut earum sint odio
              consequatur, quasi beatae qui explicabo ipsa, possimus eveniet
              natus culpa nesciunt itaque dolorem aliquam! Reprehenderit libero
              enim praesentium. Expedita, hic? Error sequi dolorum non.
            </p>
            <div className="flex items-center gap-2 py-4 border-b">
              <input
                type="number"
                className="w-16 pl-4 pr-1 py-2 border outline-none"
              />
              <button className="w-60 py-2 px-3 bg-[#6a9739] text-white text-semibold text-[14px] rounded-lg">
                ADD TO CART
              </button>
            </div>
            <div className="py-2">
              <p>
                Categories :{" "}
                <span className="text-[#6a9739]"> Groceries, Juice</span>
              </p>
            </div>
          </div>
        </div>

        <div className="w-full h-auto border-t text-[15px]">
          <ul className="flex items-center ">
            <li className="w-36 border flex-center h-12 font-semibold cursor-pointer">
              Description
            </li>
            <li className="w-36 border flex-center h-12 font-semibold cursor-pointer">
              Review
            </li>
          </ul>

          <div>
            <p className="py-3">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi
              magni, error adipisci possimus explicabo vel voluptates corporis
              dolorum dolor reiciendis tempora inventore exercitationem voluptas
              itaque, consequuntur minus. Necessitatibus ex, unde ipsam nam ab
              cum consequuntur fugit expedita. Quae, inventore nostrum.
              Reiciendis facilis porro sed enim aperiam earum quam dolorum qui!
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductPage;
