const isTestEnvironment=true ;
export const baseUrl =process.env.NEXT_PUBLIC_BASEURL;
export const baseUrlProd =process.env.NEXT_PUBLIC_BASEURL_PROD;
 const payStackDev=process.env.NEXT_PUBLIC_PAYSTACKDEV;
 const payStackProd=process.env.NEXT_PUBLIC_PAYSTACKPROD;
 export const payStack=isTestEnvironment?payStackDev:payStackProd;
 export const BASE_URL =isTestEnvironment? baseUrl:baseUrlProd ;
 const copyLinkDev=process.env.NEXT_PUBLIC_COPYLINKDEV;
 const copyLinkProd=process.env.NEXT_PUBLIC_COPYLINKPROD;
 export const eventCopyLink=isTestEnvironment?copyLinkDev:copyLinkProd;
//  publicKey: "pk_live_f9e91d7c1463cb421aaab647c6b1a5a8a8fe568e",
//  // publicKey: "pk_test_9b34d7cad3b54108b6eb034c951d89366eadcc3d",
//backend.liveparte.com
//staging-be.liveparte.com