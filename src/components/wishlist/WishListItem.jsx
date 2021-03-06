import React, { useState } from "react";
import StarRatings from "react-star-ratings";
import { Link, useHistory } from "react-router-dom";
import Platforms from "../UI/platform-icons/Platforms";
import NoImageUrl from "../../static/noImagePlaceholder/no_image_to_show_.webp";
import { Rating } from '@material-ui/lab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const WishListItem = ({ game }) => {

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
            </div>

            <div className={"game-card-info"} key={game.rating + game.name}>

                <div>
                    <h3 className="title-game-item">{game.name}</h3>
                </div>
                <span>{game.released}</span>
                <Platforms platforms={game.platforms} />
                <div className={"rating-container"}>

                    <div className={"rating-info"}>
                        <Box component="fieldset" mb={3} borderColor="transparent">
                            <Typography component="legend">Rating: {game.rating}</Typography>
                            <Rating
                                name="simple-controlled"
                                value={game.rating}
                                onChange={(event, newValue) => {

                                }}
                            />
                        </Box>
                        {/* <StarRatings
                            rating={game.rating}
                            starRatedColor="white"
                            starEmptyColor="black"
                            numberOfStars={5}
                            name="game-rating"
                            starDimension="20px"
                        />*/}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default WishListItem;