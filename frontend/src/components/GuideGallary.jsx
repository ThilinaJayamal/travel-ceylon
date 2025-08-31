import React from "react";
import { useState } from "react";

import anuradapuraImage from "../assets/guideGallary/anuradapura.jpg";
import ellaImage from "../assets/guideGallary/ella.png";
import galleImage from "../assets/guideGallary/galle.jpg";
import hortanImage from "../assets/guideGallary/hortan.jpg";
import sigiriyaImage from "../assets/guideGallary/sigiriya.jpg";

const places = [
  {
    name: "Anuradhapura",
    province: "North Central Province",
    image: anuradapuraImage,
    description:
      "Anuradhapura is one of the ancient capitals of Sri Lanka, famous for its well-preserved ruins of ancient Lankan civilization. A guided tour can help you explore the sacred city, including the Sri Maha Bodhi tree, various stupas, and the archaeological museum, providing insights into the rich history and culture of the area.",
  },
  {
    name: "Ella",
    province: "Uva Province",
    image: ellaImage,
    description:
      "Ella is a small town in the Uva Province of Sri Lanka, known for its stunning views, tea plantations, and hiking trails. A guided tour can take you to popular spots like Ella Rock and Little Adam's Peak, while also introducing you to the local culture and history.",
  },
  {
    name: "Galle",
    province: "Southern Province",
    image: galleImage,
    description:
      "Galle is a historic city on the southwestern coast of Sri Lanka, known for its well-preserved colonial architecture and rich maritime history. A guided tour can take you through the cobblestone streets of the Galle Fort, a UNESCO World Heritage Site, where you can explore ancient churches, museums, and the iconic lighthouse while learning about the city's fascinating past.",
  },
  {
    name: "Horton Plains",
    province: "Central Province",
    image: hortanImage,
    description:
      "Horton Plains is a UNESCO World Heritage Site known for its stunning landscapes and unique biodiversity. A guided tour can help you explore its famous landmarks, such as the World's End cliff and Baker's Falls, while providing insights into the area's rich flora and fauna.",
  },
  {
    name: "Sigiriya",
    province: "North Central Province",
    image: sigiriyaImage,
    description:
      "Eighth Wonder of the World,” Sigiriya is more than just a rock. It’s a royal citadel turned art gallery in the sky. As you climb its winding staircases past ancient frescoes and mirror-like walls, a knowledgeable tour guide can bring the stories of King Kashyapa and the legendary lion gate to life. At the summit, panoramic views of the surrounding jungle and villages await, making the climb worthwhile. A guide can also point out hidden details and historical context that you might miss on your own.",
  },
];

const GuideGallery = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded((prev) => !prev);

  return (
    <section className="py-10 rounded-2xl max-w-[88%] mx-auto mb-10">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Tour Gallery</h2>

      <div className="flex overflow-x-auto space-x-6 scrollbar-hide">
        {places.map((place, index) => (
          <div
            key={index}
            className="w-[85vw] md:w-[45%] flex-shrink-0 rounded-xl shadow-md"
          >
            <div className="relative rounded-xl overflow-hidden">
              <img
                src={place.image}
                alt={place.name}
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 flex flex-col justify-end items-end bg-black/30 text-white text-right px-10 py-8">
                <h3 className="text-xl font-semibold">{place.name}</h3>
                <p className="text-sm">{place.province}</p>
              </div>
            </div>

            <p className="text-sm text-gray-700 px-2">
              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  expanded ? "max-h-[1000px]" : "max-h-16"
                }`}
              >
                {place.description}
              </div>
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={toggleExpanded}
          className="bg-green-300 hover:bg-green-700 hover:text-white text-black px-6 py-3 rounded transition"
        >
          {expanded ? "Show Less" : "Read More"}
        </button>
      </div>
    </section>
  );
};

export default GuideGallery;