import axios from "axios";
const FILE_UPLOAD_URL = "https://api.cloudinary.com/v1_1/gmnayeem/image/upload";

// use cloudinary website
const upload = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "zenshop");

    try {
        const res = await axios.post(FILE_UPLOAD_URL,data)

        const { url } = res.data;
        return url;
    } catch (err) {
        console.log(err);
    }
};

export default upload;