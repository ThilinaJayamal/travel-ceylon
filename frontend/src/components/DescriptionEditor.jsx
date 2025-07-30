import React, { useState } from 'react';
import { SquarePen } from 'lucide-react';
import { Save } from 'lucide-react';

function DescriptionEditor() {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(`Where Coastal Charm Meets Modern Comfort

Nestled on the fringes of Yala National Park, Cinnamon Wild Yala offers a unique blend of adventure and comfort, where luxury meets the untamed wilderness. This eco-friendly resort is designed to immerse you in nature, with rustic-chic accommodations that harmonize with the surrounding jungle and beachscape. Just minutes away from Yala National Park (famous for leopards, elephants, and exotic birds), the resort organizes thrilling jeep safaris for unforgettable wildlife encounters.Committed to sustainability, the resort uses solar power, minimizes plastic, and supports local conservation efforts.

Why Guests Love Us 

🌿 Located between the wild jungles of Yala and the pristine shores of the Indian Ocean, the resort offers a rare combination of safari excitement and beachside serenity.
🛖 Choose from cozy jungle chalets. each thoughtfully designed with natural materials and modern comforts, offering stunning views of the wilderness or ocean.
🐘 Just minutes away from Yala National Park  the resort organizes thrilling jeep safaris for unforgettable wildlife encounters.
🍽️ Dining with Nature. Enjoy delicious Sri Lankan and international cuisine at the open-air restaurant, where you might spot wildlife roaming nearby.
🌍 Committed to sustainability, the resort uses solar power, minimizes plastic, and supports local conservation efforts.`);

    const handleToggle = () => {
        setIsEditing((prev) => !prev);
    };

    return (
        <div>
                {isEditing ? (
                    <textarea
                    rows={12}
                        className="w-full max-h-[300px] min-h-[150px] p-4 bg-white border border-gray-300 rounded-md resize-y text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                ) : (
                    <p className="border-2 border-gray-200 p-4 rounded-md mt-2 text-sm leading-relaxed text-black/80 whitespace-pre-line">
                        {text}
                    </p>
                )}

                <div className="flex justify-end items-center mt-3">
                    <button
                        onClick={handleToggle}
                        className="cursor-pointer"
                    >
                        {isEditing ? <Save className='size-6' /> : <SquarePen className='size-6' />}
                    </button>
                </div>
            </div>
    );
}

export default DescriptionEditor;
