import { getDownloadURL, getStorage, ref } from "firebase/storage";
import fs from "fs";
import https from "https";
import app from "../../../firebase.config";

export async function downloadFromFirebase(
  file_url: string
): Promise<string | undefined> {
  try {
    const storage = getStorage(app);
    const file_key = await getDownloadURL(ref(storage, file_url));

    const file_name = `./tmp/pdf-${Date.now()}.pdf`;
    const file = fs.createWriteStream(file_name);

    return new Promise((resolve, reject) => {
      const req = https.get(file_key, (res) => {
        res
          .on("data", (data) => {
            return file.write(data);
          })
          .on("end", () => {
            if (
              res.statusCode &&
              res.statusCode >= 200 &&
              res.statusCode < 300
            ) {
              file.end();
              return resolve(file_name);
            } else {
              reject("Request failed. status: " + res.statusCode);
            }
          });
      });

      req.on("error", reject);
    });
  } catch (error) {
    console.log(error);
  }
}
