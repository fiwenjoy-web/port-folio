import type { BT } from "./data/siteContent";

export type Project = {
  id: number;
  title: string;
  category: string;
  titleBT: BT;
  categoryBT: BT;
  description: string;
  coverImage: string;
  images: string[];
  tags: string[];
};
