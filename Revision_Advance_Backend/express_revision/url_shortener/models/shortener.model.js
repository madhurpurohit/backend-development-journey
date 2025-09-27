import path from "path";
import fs from "fs/promises";

//* Here we use ".." to go to the parent folder, which is url_shortener folder.
export const DATA_FILE = path.join(
  import.meta.dirname,
  "..",
  "data",
  "links.json"
);

export const loadLinks = async () => {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    //* It means file is not existed or present in the folder. ENOENT stands for "no such file or directory".
    if (error.code === "ENOENT") {
      await fs.writeFile(DATA_FILE, JSON.stringify({}));
      return {};
    }
    throw error; // This will throw error.
  }
};
