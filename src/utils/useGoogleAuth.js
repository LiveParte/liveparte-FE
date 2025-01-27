import { useEffect, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { accessTokenStorageName, encryptText, storage } from "@/utils/helper";
import { setCoins, setUserData } from "@/store/User";
import {
  ErrorNotification,
  randomBetweenOneAndTen,
  SuccessNotification,
} from "@/utils/reusableComponent";


const useGoogleAuth = ({ onNext, closeModal, eventLink }) => {

    const base_url = process.env.NEXT_PUBLIC_BASEURL
    
  const [userToken, setUserToken] = useState(null);
  const dispatch = useDispatch();
    const router = useRouter();
    
    const checkIfNonImageExist = storage.localStorage.get("noUserProfileImage");
  

  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      setUserToken(tokenResponse.access_token);
    },
    onError: () => {
      ErrorNotification({ message: 'Google login failed' });
    },
  });

  useEffect(() => {
    const authenticateUser = async () => {
      if (!userToken) return;

      try {
        const response = await fetch(`${base_url}auth/oauth/google/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: userToken }),
        });

        if (!response.ok) throw new Error('Authentication failed');
          const data = await response.json();
          
          if (!checkIfNonImageExist?.id) {
          storage.localStorage.set("noUserProfileImage", {
            id: data?.user?._id,
            nonProfileImage: randomBetweenOneAndTen(),
          });
        } else {
          if (data?.user?._id !== checkIfNonImageExist?.id) {
            storage.localStorage.set("noUserProfileImage", {
              id: data?.user?._id,
              nonProfileImage: randomBetweenOneAndTen(),
            });
          }
        }

        if (data?.error?.data?.statusCode) {
          return ErrorNotification({
            message: data?.error?.data?.message,
          });
        }

        if (data?.user?._id) {
          dispatch(setUserData(data?.user));
          dispatch(setCoins(data?.user?.totalCoin));

          storage.localStorage.set(accessTokenStorageName, encryptText(data?.accessToken));
          SuccessNotification({ message: "You're in!" });
          
          if (router?.pathname === '/') {
            return router.push(eventLink);
          }
          
          if (onNext) {
            return onNext(data?.user);
          }
          
          closeModal && closeModal();
        }
      } catch (error) {
        console.log(error);
        ErrorNotification({ message: error?.message });
      } finally {
        setUserToken(null); // Clear the token to prevent re-triggering
      }
    };

    authenticateUser();
  }, [userToken, dispatch, onNext, closeModal, eventLink, router]);

  return googleLogin;
};

export default useGoogleAuth;