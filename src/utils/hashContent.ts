import bcrypt from "bcryptjs";

export const hashContent = async (content: string): Promise<string> => {
  const hashedContent = await bcrypt.hash(content, 10);
  return hashedContent;
};
