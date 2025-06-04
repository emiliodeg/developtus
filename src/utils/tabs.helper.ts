import { getCollection } from "astro:content";

export const getFirstTab = async () => {
  const tabs = await getCollection("tabs");

  if (tabs.length === 0) {
    throw new Error("No tabs found");
  }

  if (tabs[0].data.order === 0) return tabs[0];

  let tab = tabs[0];

  for (const t of tabs) {
    if (t.data.order < tab.data.order) tab = t;
  }

  return tab;
};
