import { v4 as uuidv4 } from "uuid";
import { Storage } from "aws-amplify";

export function useS3() {
  function uploadToS3(filename) {
    if (!filename) return;
    const [file, extension] = filename.name.split(".");
    const type = filename.type;
    const key = `images/lists/${file}_${uuidv4()}.${extension}`;
    const result = Storage.put(key, filename, {
      contentType: type,
      metadata: {
        app: "adv-react",
      },
    });
    console.log(result);
    return key;
  }
  return [uploadToS3];
}
