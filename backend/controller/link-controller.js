import Link from "./../model/link-model.js";
import ApiResponse from "../utils/Api-response.js";
import User from "../model/user-model.js";

const generateUniqueId = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let uniqueId = "";
  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    uniqueId += characters[randomIndex];
  }
  return uniqueId;
};

export const AddLink = async (req, res) => {
  try {
    const { title, user, url } = req.body;
    const newLink = new Link({
      title,
      user,
      url,
      uniqueId: generateUniqueId(),
      longurl: url,
    });
    await newLink.save();
    res.status(201).json(new ApiResponse(200, newLink, "Link Created!"));
  } catch (error) {
    console.log(error.message);
    res.status(500).json(new ApiResponse(500, null, error.message));
  }
};

export const GetLink = async (req, res) => {
  try {
    const { uniqueId } = req.params;
    const link = await Link.findOne({ uniqueId });
    if (!link) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, "Link not found!"));
    }
    res
      .status(200)
      .json(new ApiResponse(200, link, "Link Found Successfully!"));
  } catch (error) {
    res.status(500).json(new ApiResponse(500, null, error.message));
  }
};

export const GetAllLinks = async (req, res) => {
  try {
    const { userId } = req.params;
    //console.log("userId from params:", userId); // Add a log to debug

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, "User not found!"));
    }

    const links = await Link.find({ user: userId }).sort({ createdAt: -1 });
    if (!links || links.length === 0) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, "Links not found!"));
    }

    return res.status(200).json(new ApiResponse(200, links, "Links found!"));
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(new ApiResponse(500, null, error.message));
  }
};

export const DeleteLink = async (req, res) => {
  try {
    const { uniqueId } = req.params;
    const deletedLink = await Link.findOneAndDelete({ uniqueId });
    if (!deletedLink) {
      return res.status(404).json(new ApiResponse(404, {}, "Link Not Found!"));
    }
    res.status(200).json(new ApiResponse(200, {}, "Link Deleted!"));
  } catch (error) {
    res.status(500).json(new ApiResponse(500, null, error.message));
  }
};
