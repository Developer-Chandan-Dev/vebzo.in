/* eslint-disable react/prop-types */
const ToggleSwitch = ({ label, isOn, onToggle }) => {
  return (
    <div className="flex items-center justify-between py-3">
      <span className="text-gray-300">{label}</span>
      <button
        className={`relative inline-flex items-center h-5 w-10 rounded-full transition-colors focus:outline-none ${
          isOn ? "bg-slate-600" : "bg-gray-600"
        }`}
        onClick={onToggle}
      >
        <span
          className={`inline-block size-[14px] transform transition-transform bg-white rounded-full ${
            isOn ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
};

export default ToggleSwitch;
