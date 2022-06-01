import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import { REFRESH_TOKEN } from "../mutations/auth";
import { LOAD_HERO_DATA, LOAD_ITEM_ATTRIBUTE } from "../queries/products";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";
import { AUTH_TOKEN, AUTH_TOKEN_REFRESH } from "../../constants";
// import { LOAD_ITEMS } from "../queries/products/queries";

export const LoadHeroData = () => {
  const { loading, error, data } = useQuery(LOAD_HERO_DATA);
  const [heroData, setHeroData] = useState(null);

  useEffect(() => {
    if (data && heroData === null) {
      setHeroData(data.heroData);
    }
    if (error) {
      console.log(error);
    }
  }, [data, error, heroData]);
  return (
    <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center lg:pr-32 gap-4 flex-wrap">
      {!loading &&
        data &&
        heroData &&
        heroData.map((p, index) => (
          <div
            key={index}
            className=" lg:w-190 p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center drop-shadow-lg"
          >
            <img
              src={p.productImages[0] && p.productImages[0].productImage}
              className="w-20 lg:w-40 -mt-10 lg:-mt-20 rounded-md"
              alt=""
            />
            <p className="text-base lg:text-xl font-semibold capitalize text-textColor mt-2 lg:mt-4">
              {p.productName}
            </p>

            <p className="text-[12px] lg:text-sm w-full flex capitalize items-center justify-center text-lighttextGray font-semibold my-1 lg:my-3">
              {p.productCategory.name}
            </p>
            <div className="text-sm font-semibold text-headingColor">
              <span className="text-xs text-green-600">₦</span>
              {p.productPrice}
            </div>
          </div>
        ))}
    </div>
  );
};
export const LoadItemAttribute = ({ type }) => {
  const { loading, error, data } = useQuery(LOAD_ITEM_ATTRIBUTE, {
    variables: {
      type: type,
    },
  });
  const [itemAttribute, setItemAttribute] = useState(null);
  const [{ user, token }] = useStateValue();
  const [isToken, setToken] = useState(true);
  type = useRef(type);
  useEffect(() => {
    if (!loading) {
      if (data) {
        setItemAttribute(data.itemAttributes);
      }
      if (error) {
        console.log(error);
        setToken(false);
      }
    }
  }, [data, type, error, loading, user, token]);
  return (
    <>
      {!isToken && <TokenReloader user={user} token={token} />}
      {loading && <option disabled={true}>Loading...</option>}
      {itemAttribute &&
        itemAttribute.map((type) => (
          <option
            key={type.id}
            className="text-base border-0 outline-none capitalize bg-white text-headingColor"
            value={type.urlParamName}
          >
            {type.name}
          </option>
        ))}
    </>
  );
};
export const saveItem = async (mutate, field) => {
  mutate({
    variables: {
      product_slug: field.product_slug,
      product_name: field.product_name,
      product_price: field.product_price,
      product_image: field.product_image,
      product_category: field.product_category,
      product_type: field.product_type,
      product_description: field.product_description,
      product_calories: field.product_calories,
    },
  });
  console.log(field);
};

const Logout = () => {
  localStorage.clear();
};
export const RefreshToken = ({ children, protectedPage }) => {
  const [refreshToken, { loading, error, data }] = useMutation(REFRESH_TOKEN);
  const [isRefresh, setIsRefresh] = useState(loading);
  const [{ user, token }, dispatch] = useStateValue();
  let timer;
  useEffect(() => {
    if (isRefresh === true && token && user) {
      refreshToken({
        variables: {
          refreshToken: token.refreshToken,
        },
      });
      if (error) {
        console.log(error);
      }
      if (data) {
        let qs = data.refreshToken;
        if (qs.error !== null) {
          setIsRefresh(false);
          Logout();
        }
        if (qs.token !== null) {
          console.log(qs);
          var dat = {
            token: qs.token,
            refreshToken: qs.refreshToken,
          };
          dat = JSON.parse(JSON.stringify(dat));
          dispatch({
            type: actionType.SET_TOKEN,
            user: user,
            token: dat,
          });
          localStorage.clear();
          localStorage.setItem(AUTH_TOKEN, user);
          localStorage.setItem(AUTH_TOKEN, qs.token);
          localStorage.setItem(AUTH_TOKEN_REFRESH, qs.refreshToken);
          timer.clearInterval();
          setIsRefresh(false);
          setTimeout(() => {
            setIsRefresh(true);
          }, 5000);
        }
      }
    }
  }, [data, dispatch, error, isRefresh, refreshToken, timer, token, user]);
  if (
    localStorage.getItem(AUTH_TOKEN) === null ||
    localStorage.getItem(AUTH_TOKEN_REFRESH) === null ||
    localStorage.getItem("user") === null
  ) {
    Logout();
  }
  if ((!token && user) || (!token && user && protectedPage)) {
    Logout();
    window.location.href = "/";
  }
  return children;
};

export const TokenReloader = ({ user, token }) => {
  const [refreshToken, { error, data }] = useMutation(REFRESH_TOKEN);
  if (token !== null || user !== null) {
    refreshToken({
      variables: {
        refreshToken: token.refreshToken,
      },
    });
    if (data) {
      localStorage.setItem(AUTH_TOKEN, data.refreshToken.token);
    }
    if (error) {
      Logout();
    }
  } else {
    Logout();
  }
};
