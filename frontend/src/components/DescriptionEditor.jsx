import React, { useState } from 'react';

function DescriptionEditor() {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(`Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla non expedita, dicta aliquam, quidem atque dolor laboriosam suscipit consequatur corrupti quibusdam officia iste totam sequi molestiae aspernatur a sit? Optio soluta ipsa ullam ducimus praesentium, consectetur totam fugiat minus modi voluptas, nihil voluptatum provident sint cum voluptatibus.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla non expedita, dicta aliquam, quidem atque dolor laboriosam suscipit consequatur corrupti quibusdam officia iste totam sequi molestiae aspernatur a sit? Optio soluta ipsa ullam ducimus praesentium, consectetur totam fugiat minus modi voluptas, nihil voluptatum provident sint cum voluptatibus.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla non expedita, dicta aliquam, quidem atque dolor laboriosam suscipit consequatur corrupti quibusdam officia iste totam sequi molestiae aspernatur a sit? Optio soluta ipsa ullam ducimus praesentium, consectetur totam fugiat minus modi voluptas, nihil voluptatum provident sint cum voluptatibus.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla non expedita, dicta aliquam, quidem atque dolor laboriosam suscipit consequatur corrupti quibusdam officia iste totam sequi molestiae aspernatur a sit? Optio soluta ipsa ullam ducimus praesentium, consectetur totam fugiat minus modi voluptas, nihil voluptatum provident sint cum voluptatibus.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla non expedita, dicta aliquam, quidem atque dolor laboriosam suscipit consequatur corrupti quibusdam officia iste totam sequi molestiae aspernatur a sit? Optio soluta ipsa ullam ducimus praesentium, consectetur totam fugiat minus modi voluptas, nihil voluptatum provident sint cum voluptatibus.`);

    const handleToggle = () => {
        setIsEditing((prev) => !prev);
    };

    return (
        <div>
            <h3 className="text-xl font-semibold text-black/70 mt-6">Description</h3>
            <div className='ml-12 mt-3'>
                {isEditing ? (
                    <textarea
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
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                    >
                        {isEditing ? 'Save' : 'Edit'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DescriptionEditor;
