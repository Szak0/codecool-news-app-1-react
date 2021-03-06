import React, { useEffect, useState } from "react";
import axios from "axios";
import WishListContainer from "../components/wishlist/WishListContainer";


const ProfilePage = () => {
  const [data, setData] = useState([]);
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(`${process.env.REACT_APP_BACKEND_USER}/me`, {
        withCredentials: true,
      });
      setData(request.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const request = await axios.get(`${process.env.REACT_APP_BACKEND_USER}/wishlist`, {
          withCredentials: true,
        });
        if (request.data) {
          setGames((game) => [...game, ...request.data]);
        } else {
          setIsError(true);
        }

        console.log(request.data);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
      }
    };
    fetchData();
  }, []);

  const getRegDate = (date) => {
    if (date) {
      return date.split("T")[0];
    }
  };

  const getUpperCase = (str) => {
    if (str) return str.toUpperCase();
  };

  return (
    <div>
      <div className={"user-profile"}>
        <div>
          <h2># {data.id}</h2>
          <h1>{data.userName}</h1>
          <span>{data.email}</span>
          <div>Registration date: {getRegDate(data.registrationDate)}</div>
        </div>
        {games.length != 0 ? (
          <div>
            <h3>{getUpperCase(data.userName)}'s Wishlist</h3>
            <WishListContainer games={games} />{" "}
          </div>
        ) : (
          <h1>Add some game to your wishlist!</h1>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
