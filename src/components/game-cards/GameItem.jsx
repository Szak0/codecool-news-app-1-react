import React, { useRef, useState } from "react";
import StarRatings from "react-star-ratings";
import { Link } from "react-router-dom";
import Platforms from "../UI/platform-icons/Platforms";
import NoImageUrl from "../../static/noImagePlaceholder/no_image_to_show_.webp";
import axios from "axios";

const GameItem = ({ game }) => {
  const [videInfo, seVideoInfo] = useState({
    vidRef: useRef(null),
  });


  const handleWish = (e) => {
    // const baseURL = `http://localhost:8080/api/wishlist/add`;
    // const sentData = {
    //   gameId: game.id,
    //   name: game.name,
    //   background_image: game.background_image,
    //   released: game.released,
    //   rating: game.rating,
    // }
    // console.log(sentData, "DATA");
    // axios.post(baseURL, sentData);

    var bodyFormData = new FormData();
    bodyFormData.append('gameId', game.id)
    bodyFormData.append('background_image', game.background_image)
    bodyFormData.append('name', game.name)
    bodyFormData.append('rating', game.rating)
    bodyFormData.append('released', game.released)
    axios.post(`http://localhost:8080/api/wishlist/add`, bodyFormData).then(res => {
      res.json()
      console.log("Ok");
    })
      .catch(err => {
        if (err.response) {
          // client received an error response (5xx, 4xx)
          console.log("error");
        } else if (err.request) {
          // client never received a response, or request never left
        } else {
          // anything else
        }
      })

  }


  // const handlePlayVideo = () => {
  //   videInfo.vidRef.current.play();
  // };
  function cropImage(imgUrl) {
    if (imgUrl) {
      let directoryPath = imgUrl.split("/").reverse()[2];
      let serverPath = imgUrl.split("/").reverse()[1];
      let imgCode = imgUrl.split("/").reverse()[0];
      let resizedImgUrl = `https://api.rawg.io/media/crop/600/400/${directoryPath}/${serverPath}/${imgCode}`;
      return resizedImgUrl;
    }
    return "";
  }
  return (
    <div className="game-card">
      <div className="media-container">
        {game.clip ? (
          <div className={"image-cover"}>
            <img
              className={"img-card"}
              src={cropImage(game.background_image)}
              alt={game.name}
            />

            {/*
            <button onClick={() => handlePlayVideo} className={"play-button"}>
              PLAY
            </button>
             <video
              onClick={(e) => e.target.pause()}
              ref={videInfo.vidRef}
              controlsList="nodownload"
              muted
              type="video/mp4"
              width="100%"
              height="100%"
            >
              <source src={game.clip.clip} type="video/mp4"></source>
              <source src="Video.ogg" type="video/ogg"></source>
            </video> */}
          </div>
        ) : (
            <div>
              {game.background_image ? (
                <img
                  className={"img-card"}
                  src={cropImage(game.background_image)}
                  alt={game.name}
                />
              ) : (
                  <img className={"img-card"} src={NoImageUrl} alt={game.name} />
                )}
            </div>
          )}
      </div>

      <div className={"game-card-info"} key={game.rating + game.name}>
        <div>
          <Link to={"/game/" + game.id} className={"normalize-link"}>
            <h3 className="title-game-item">{game.name}</h3>
          </Link>
        </div>
        <span>{game.released}</span>
        <Platforms platforms={game.platforms} />
        <div className={"rating-container"}>
          <div className={"rating-number"}>
            <span>{game.rating}</span>
          </div>
          <div>
            <button onClick={async (e) => handleWish(e)}>
              Wish me
            </button>
          </div>
          <div className={"rating-info"}>
            <StarRatings
              rating={game.rating}
              starRatedColor="white"
              starEmptyColor="black"
              numberOfStars={5}
              name="game-rating"
              starDimension="20px"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameItem;
