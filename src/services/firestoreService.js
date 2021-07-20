import axios from "../axios";
import { auth } from "../firebase";

export const joinAlbum = async (albumId) => {
  await axios.post(`joinAlbum`, {
    albumId: albumId,
    userId: auth.currentUser.uid,
  });
};
