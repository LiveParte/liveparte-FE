const React = require("react");

export function FloatingLabelInput({ label, type }) {
  return (
    <>
      <div class="relative">
        {type === "password" && (
          <div className="absolute right-[17px] text-[13px] font500 cursor-pointer underline text- z-50 top-0 bottom-0 text-white flex justify-center items-center">
            Show
          </div>
        )}
        <div>
          <input
            // type="text"
            id="floating_filled"
            className="block rounded-[8px] px-[16px] pb-2.5 pt-[20px] w-full text-[13px] text-gray-900 bg-[#222428] border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-[#343F4B] dark:focus:border-[#343F4B] focus:outline-none focus:ring-0 focus:border-[#63768D] peer h-[50px]"
            placeholder=" "
            type={type || "text"}
          />
          <label
            for="floating_filled"
            className="absolute  text-[13px] peer-focus:text-[14px] text-[#63768D] dark:text-[#63768D] duration-300 transform -translate-y-[8px] scale-75 peer-focus:top-[23px] top-[12px] z-10 origin-[0] start-[16px] peer-focus:text-[#63768D] peer-focus:dark:text-[#63768D] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-[3px] peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            {label}
          </label>
        </div>
      </div>
    </>
  );
}
