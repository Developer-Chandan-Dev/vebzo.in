/* eslint-disable react/prop-types */

const Button = ({
  label = "NOTHING",
  LeftIcon,
  RightIcon,
  className,
  disable,
  width,
  sm,
  md,
  smLong,
  mdLong,
  bg = "bg-[#6a9739]",
  text = "text-[14px]",
  onClick,
  type,
}) => {
  return (
    <button
      className={`px-7 py-[14px] ${sm && "!px-5 !py-[10px]"} ${
        md && "!px-6 !py-[12px]"
      } ${smLong && "!px-10 !py-[10px]"} ${
        mdLong && "!px-10 py-[12px]"
      } text-center transition-all bg-[#6a9739] hover:bg-[#599e10] text-[14px] rounded-[4px] font-semibold text-white gap-x-3 flex items-center ${className} ${
        disable ? "opacity-50 cursor-default" : ""
      } ${width} !${bg} ${text}`}
      onClick={onClick}
      type={type}
    >
      {LeftIcon && <LeftIcon size={16} />}
      {label}
      {RightIcon && <RightIcon size={16} />}
    </button>
  );
};

export default Button;
