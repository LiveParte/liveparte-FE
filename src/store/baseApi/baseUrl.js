const isTestEnvironment=false;
export const baseUrl =process.env.NEXT_PUBLIC_BASEURL;
export const baseUrlProd =process.env.NEXT_PUBLIC_BASEURL_PROD;
 const payStackDev=process.env.NEXT_PUBLIC_PAYSTACKDEV;
 const payStackProd=process.env.NEXT_PUBLIC_PAYSTACKPROD;
 export const payStack=isTestEnvironment?payStackDev:payStackProd;
 export const BASE_URL =isTestEnvironment? baseUrl:baseUrlProd ;
 const copyLinkDev=process.env.NEXT_PUBLIC_COPYLINKDEV;
 const copyLinkProd=process.env.NEXT_PUBLIC_COPYLINKPROD;
 export const eventCopyLink=isTestEnvironment?copyLinkDev:copyLinkProd;



//  const isTestEnvironment=true;
// export const baseUrl =process.env.NEXT_PUBLIC_BASEURL;
// export const baseUrlProd =process.env.NEXT_PUBLIC_BASEURL_PROD;
//  const payStackDev=process.env.NEXT_PUBLIC_PAYSTACKDEV;
//  const payStackProd=process.env.NEXT_PUBLIC_PAYSTACKPROD;
//  export const payStack=isTestEnvironment?payStackDev:payStackProd;
//  export const BASE_URL =isTestEnvironment? baseUrl:baseUrlProd ;
//  const copyLinkDev=process.env.NEXT_PUBLIC_COPYLINKDEV;
//  const copyLinkProd=process.env.NEXT_PUBLIC_COPYLINKPROD;
//  export const eventCopyLink=isTestEnvironment?copyLinkDev:copyLinkProd;
