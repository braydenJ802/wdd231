import { getParkData } from "./parkService.mjs";

const parkInfoLinks = [
  {
    name: "Current Conditions &#x203A;",
    link: "conditions.html",
    description:
      "See what conditions to expect in the park before leaving on your trip!",
  },
  {
    name: "Fees and Passes &#x203A;",
    link: "fees.html",
    description: "Learn about the fees and passes that are available.",
  },
  {
    name: "Visitor Centers &#x203A;",
    link: "visitor_center.html",
    description: "Learn about the visitor centers in the park.",
  },
];

export async function getParkMediaInfo() {
  const parkData = await getParkData();
  const images = parkData?.images || []; // if there are images, use them

  // if there are images, map them dynamically
  if (images.length) {
    return parkInfoLinks.map((item, i) => ({
      ...item, // loop through and create a new object for each entry called "item"
      image: images[i + 1]?.url || images[i % images.length]?.url, // skip the banner image; only pick indices that exist and wrap back to the beginning if needed
    }));
  }

  // fallback if no images
  return parkInfoLinks.map((item) => ({
    ...item,
    image: "placeholder.jpg",
  }));
}


