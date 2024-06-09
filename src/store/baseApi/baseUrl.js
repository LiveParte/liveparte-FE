const isTestEnvironment=true;
export const baseUrl =`https://staging-be.liveparte.com/v1/api/`;
export const baseUrlProd =`https://backend.liveparte.com/v1/api/`;
 const payStackDev=`pk_test_9b34d7cad3b54108b6eb034c951d89366eadcc3d`;
 const payStackProd='pk_live_f9e91d7c1463cb421aaab647c6b1a5a8a8fe568e';
 export const payStack=isTestEnvironment?payStackDev:payStackProd;
 export const BASE_URL =isTestEnvironment? baseUrl:baseUrlProd ;
 const copyLinkDev=`https://staging.liveparte.com/event/`;
 const copyLinkProd=`https://liveparte.com/event/`;
 export const eventCopyLink=isTestEnvironment?copyLinkDev:copyLinkProd;
//  publicKey: "pk_live_f9e91d7c1463cb421aaab647c6b1a5a8a8fe568e",
//  // publicKey: "pk_test_9b34d7cad3b54108b6eb034c951d89366eadcc3d",
//backend.liveparte.com
//staging-be.liveparte.com

//http://54.163.212.107:3001/api/v1 
//https://staging-be.liveparte.com/v1/api/
//https://backend.liveparte.com/v1/
