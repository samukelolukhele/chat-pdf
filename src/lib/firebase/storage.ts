import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import app from "../../../firebase.config";

export async function uploadPdf(file: File) {
  const storage = getStorage(app);
  const fileId = uuidv4();
  const filePath = `uploads/${fileId}/${file.name}`;
  const newImageRef = ref(storage, filePath);

  await uploadBytesResumable(newImageRef, file);

  return await getDownloadURL(newImageRef);
}
