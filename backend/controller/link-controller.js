import Link from "./../model/link-model.js";
import ApiResponse from "../utils/Api-response.js";

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
    res.status(500).json(new ApiResponse(500, null, error.message));
  }
};
