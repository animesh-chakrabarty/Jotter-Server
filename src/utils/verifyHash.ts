import bcrypt from "bcryptjs";

const verifyHash = async (
  content: string,
  hashedContent: string
): Promise<boolean> => {
  return await bcrypt.compare(content, hashedContent);
};

export default verifyHash;
