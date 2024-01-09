import mongoose, { isValidObjectId } from "mongoose"
import {Tweet} from "../models/tweet.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const createTweet = asyncHandler(async (req, res) => {
    //TODO: create tweet
    const {content,userId} = req.body;
    const user = await User.findById(userId);

    if(!user){
        return new ApiError(400,"user not found")
    }

    const tweet = await Tweet.create({
        content,
        owner: user._id
    })

    res.status(200).json(new ApiResponse(200,tweet,"Tweet created successfullyy!!"))
})

const getUserTweets = asyncHandler(async (req, res) => {
    // TODO: get user tweets
    // console.log("enters gut")
    const user = await User.findById(req.params.userId);
    // console.log("found user")
    if(!user){
        return new ApiError(400,"user not found")
    }

    const tweets = await Tweet.find({
        owner: user._id
    })
    // console.log("found tweets")

    if(tweets.length === 0){
        return new ApiError(400,"No Tweets")
    }

    // console.log(tweets)
    res.status(200)
    .json(new ApiResponse(200,{tweets}))
})

const updateTweet = asyncHandler(async (req, res) => {
    //TODO: update tweet
    const tweet = await Tweet.findById(req.params.tweetId)

    if(!tweet){
        return new ApiError(400,"tweet not found")
    }
    const {newContent} = req.body;
    tweet.content = newContent
    await tweet.save();

    res.status(200).json(new ApiResponse(200,tweet,"tweet updated successfully"))
})

const deleteTweet = asyncHandler(async (req, res) => {
    //TODO: delete tweet
    const tweet = await Tweet.findByIdAndDelete(req.params.tweetId)

    if(!tweet){
        return new ApiError(400,"tweet not found")
    }

    res.status(200).json(new ApiResponse(200,tweet,"tweet deleted successfully"))
})

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}
