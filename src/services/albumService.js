import { storageRef } from "../firebase";

export const uploadImage = async (albumId, image) => {
  await storageRef.child(`albumImages/${albumId}/${image.name}`).put(image);
  var downloadUrl = await storageRef
    .child(`albumImages/${albumId}/${image.name}`)
    .getDownloadURL();
  return downloadUrl;
};
