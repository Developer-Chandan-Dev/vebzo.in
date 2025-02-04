import { Image, TrainTrack, X } from "lucide-react";
import Button from "../../utility/Button";
import useFetchDataWithPagination from "../../../hooks/useFetchDataWithPagination";
import { formatDate } from "../../../utils/dateUtils";
const VITE_API_URL = import.meta.env.VITE_API_URL;

const MyOrders = () => {
  const { data, loading, error } = useFetchDataWithPagination(
    `${VITE_API_URL}/api/v1/orders/my-orders`
  );

  console.log(data?.order, loading, error);

  return (
    <div className="w-full px-4 h-auto py-5">
      <h1 className="text-3xl font-semibold ml-2 mb-5">My Orders</h1>
      <div className="w-full mt-5 h-auto">
        {data?.order.length > 0 && data?.order !== null
          ? data?.order.map((item, index) => (
              <div
                key={index}
                className=" bg-[#f8f6f3] px-5 py-5 drop-shadow-md mb-7 rounded-md"
              >
                <div className="flex items-center justify-between pb-3 gap-3 flex-wrap">
                  <div className="flex items-center gap-3">
                    <button className="px-4 bg-slate-100 font-semibold py-2 rounded-full border">
                      Order{" "}
                      <span className="text-blue-500">{item?.orderId}</span>
                    </button>
                    <p>Order Place: {formatDate(item?.createdAt)}</p>
                  </div>
                  <div>
                    <Button label="TRACK ORDER" LeftIcon={TrainTrack} />
                  </div>
                </div>
                <div className="py-3">
                  <div className="w-full px-2 pt-5 pb-3 flex items-start justify-between gap-5 flex-wrap border-t">
                    <div>
                      {item?.orderItems.length > 0 && item?.orderItems !== null
                        ? item?.orderItems.map((subItem, index) => (
                            <div
                              className="flex items-start gap-3 mb-4"
                              key={index}
                            >
                              {subItem?.product?.imageUrl ? (
                                <img
                                  src={subItem?.product?.imageUrl}
                                  className="w-24 h-24 bg-white border"
                                  alt="Product Image"
                                />
                              ) : (
                                <Image className="w-24 h-24 bg-white text-gray-400 border" />
                              )}
                              <div>
                                <h3>{subItem?.product?.name}</h3>
                                <p>
                                  By: {item?.firstname} {item?.lastname}
                                </p>
                                <p className="mt-3">
                                  Qty : {subItem?.quantity} :{" "}
                                  <b>
                                    Rs. {subItem?.price} ={" "}
                                    {subItem?.quantity * subItem?.price}
                                  </b>
                                </p>
                              </div>
                            </div>
                          ))
                        : ""}
                    </div>
                    <div>
                      <p>
                        Status :{" "}
                        <span className="font-semibold text-orange-400">
                          {item?.status}
                        </span>
                      </p>
                      {/* <p className="text-lg font-semibold text-orange-400">Pending</p> */}
                    </div>
                    <div>
                      <p>Delivery Expected By:</p>
                      <p>
                        <b>24 Dec 2025</b>
                      </p>
                    </div>
                  </div>

                  <div className="w-full mt-5 pt-4 border-t flex items-center justify-between">
                    <Button label="CANCEL ORDER" sm={true} LeftIcon={X} />
                    <p>
                      <b>Rs. {item?.totalPrice}</b>
                    </p>
                  </div>
                </div>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
};

export default MyOrders;
