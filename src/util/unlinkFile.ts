import fs from "fs";
import path from "path";

const unlinkFile = (file: string | undefined) => {
  const fileName = file!.split("/").pop();
  const filePath = path.join("uploads", "images", fileName!);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

export default unlinkFile;
