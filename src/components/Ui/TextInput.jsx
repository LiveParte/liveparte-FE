const React = require("react");

export function FloatingLabelInput({ label, type, value,onChange,error,errors,name }) {
  console.log(errors,'errorserrors')
  const [readOnly, setReadOnly] = React.useState(true);
  const [showPasswords, setShowPasswords] = React.useState("");
  const textFormat = showPasswords || type;

  function handleSwitchPassword() {
    console.log(showPasswords, "showPasswords");
    if (textFormat === "password") {
      setShowPasswords("text");
    }
    return textFormat === "text" && setShowPasswords("password");
  }

  return (
    <>
      <div class="relative">
        {type === "password" && (
          <div
            onClick={handleSwitchPassword}
            className="absolute right-[17px] text-[13px] font500 cursor-pointer underline text- z-50 top-0 bottom-0 text-white flex justify-center items-center h-[45px]"
          >
            {textFormat === "text" ? "Hide" : "Show"}
          </div>
        )}
        <div>
          <input
            readOnly={readOnly}
            onFocus={() => setReadOnly(false)}
            onBlur={() => setReadOnly(true)}
            // type="text"
            id="floating_filled"
            className="block rounded-[8px] px-[16px] pb-2.5 pt-[20px] w-full text-[13px] text-white bg-[#222428] focus:border-[1px] border-[0px]   appearance-none dark:text-white  focus:outline-none focus:ring-0 focus:border-[#63768D] peer h-[50px] z-10"
            placeholder=" "
            type={showPasswords || type || "text"}
            role="presentation"
            // autocomplete="off"
            // autoComplete="off"
            
            name={name}
            value={value}
            onChange={onChange}
          
          />
          <label
            // for="floating_filled"
            className="absolute z-0  text-[13px] peer-focus:text-[14px] text-[#63768D] dark:text-[#63768D] duration-300 transform -translate-y-[8px] scale-75 peer-focus:top-[23px] top-[12px]  origin-[0] start-[16px] peer-focus:text-[#63768D] peer-focus:dark:text-[#63768D] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-[3px] peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            {label}
          </label>
        </div>
        {error &&<div className="text-red-600 font400 text-[14px]">{error}</div>}
      </div>
    </>
  );
}
