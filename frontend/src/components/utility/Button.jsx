/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

const Button = ({ label = "NOTHING", LeftIcon, RightIcon, className }) => {
  return (
    <button
      className={`px-7 py-[14px] transition-all bg-[#6a9739] hover:bg-[#599e10] text-[14px] rounded-[4px] font-semibold text-white gap-x-3 flex items-center ${className}`}
    >
      {LeftIcon && <LeftIcon size={16} />}
      {label}
      {RightIcon && <RightIcon size={16} />}
    </button>
  );
};

export default Button;
