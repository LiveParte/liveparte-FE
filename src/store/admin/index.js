import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 1,
    user_id: 9,
    dob: "2022-05-27",
    address: "4 onyibo Lekki Nigeria",
    created_at: "2022-10-16T15:56:12.000000Z",
    updated_at: "2022-10-16T18:21:27.000000Z",
    user: {
      id: 9,
      name: "Manager Account",
      phone: "+2348107215633",
      email: "estatemanager@gmail.com",
      email_verified_at: null,
      gender: "male",
      image:
        "https://res.cloudinary.com/aladdin-digital-bank/image/upload/v1665580939/international_payments/s1brifvx0tqcwjwjnpov.jpg",
      status: 0,
      created_at: "2022-10-16T15:56:12.000000Z",
      updated_at: "2022-10-16T18:20:23.000000Z",
    },
  },
];

export const managerSlice = createSlice({
  name: "managers",
  initialState,
  reducers: {},
});
//  export const getAllManager =state=>state?.manager ;
export default managerSlice.reducer;
