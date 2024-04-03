const React = require("react");

export function FloatingLabelInput({
  label,
  type,
  value,
  onChange,
  error,
  errors,
  name,
  disabled = false,
}) {
  // console.log(errors, "errorserrors");
  const [readOnly, setReadOnly] = React.useState(true);
  const [showPasswords, setShowPasswords] = React.useState("");
  const textFormat = showPasswords || type;

  function handleSwitchPassword() {
    if (textFormat === "password") {
      setShowPasswords("text");
    }
    return textFormat === "text" && setShowPasswords("password");
  }

  return (
    <>
      <div class="relative ">
       
        {type === "password" && (
          <div
            onClick={handleSwitchPassword}
            className="absolute right-[17px] text-[13px] font500 cursor-pointer underline text- z-50 top-0 bottom-0 text-white flex justify-center items-center h-[45px]"
          >
            {textFormat === "text" ? "Hide" : "Show"}
          </div>
        )}
        <div className="relative bg-[#222428] rounded-[8px] cursor-pointer">
          <input
           placeholder=" "
           type={showPasswords || type || "text"}
           role="presentation"
           autocomplete={type==="password"?"new-password":"off"}
          //  autocomplete="new-password"
           ontouchstart="this.removeAttribute('readonly');"
           onfocus="this.removeAttribute('readonly');"

           name={name}
           value={value}
           onChange={onChange}
           disabled={disabled}
            // readOnly={readOnly}
            onFocus={() => setReadOnly(false)}
            onBlur={() => setReadOnly(true)}
            // type="text"
            id="floating_filled"
            className={`block rounded-[8px] z-10 px-[16px] pb-2.5 pt-[20px] w-full text-[13px]  focus:border-[1px] border-[0px]   appearance-none dark:text-white  focus:outline-none focus:ring-0 focus:border-[#63768D] peer h-[50px]  relative bg-transparent ${disabled?'cursor-not-allowed !text-[#63768D]':'text-white '} `}
           
          />
          <label
            // for="floating_filled"
            className="absolute z-0  text-[13px] peer-focus:text-[14px] text-[#63768D] dark:text-[#63768D] duration-300 transform -translate-y-[8px] scale-75 peer-focus:top-[20px] top-[12px]  origin-[0] start-[16px] peer-focus:text-[#63768D] peer-focus:dark:text-[#63768D] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-[3px] peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto cursor-not-allowed font400"
          >
            {label}
          </label>
        </div>
        {error && (
          <div className="text-red-600 font400 text-[12px]">{error}</div>
        )}
      </div>
    </>
  );
}