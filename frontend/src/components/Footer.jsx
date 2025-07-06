import React from "react";
import { asserts } from "../assets/assets";

function Footer() {
    return (
        <div className="grid gap-4 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr] md:grid-cols-3 sm:grid-cols-2 grid-cols-1 bg-green-300 -mt-8 rounded-t-4xl px-8 py-16">
            <div className="flex flex-col justify-center items-center">
                <h2 className="text-3xl font-bold text-white">Travel <span className="text-black">Ceylon</span></h2>
                <div className="mt-4 flex gap-3">
                    <a href=""><img src={asserts.fb} className="size-6" alt="facebook" /></a>
                    <a href=""><img src={asserts.whatsapp} className="size-6" alt="whatsapp" /></a>
                    <a href=""><img src={asserts.email} className="size-6" alt="mail" /></a>
                    <a href=""><img src={asserts.instagram} className="size-6" alt="instergram" /></a>
                </div>
            </div>
            <div>
                <p className="text-lg font-semibold">Our Activities</p>
                <ul className="mt-4 text-black/70">
                    <li><a href="">Sigiriya Rock Climbing</a></li>
                    <li><a href="">Whale Watching</a></li>
                    <li><a href="">Surfing & Water Sports</a></li>
                    <li><a href="">Wildlife Safari</a></li>
                </ul>
            </div>
            <div>
                <p className="text-lg font-semibold">Travel Blogs</p>
                <ul className="mt-4 text-black/70">
                    <li><a href="">Colombo City Guide</a></li>
                    <li><a href="">Exploring Sigiriya & Dambulla</a></li>
                    <li><a href="">Best Beaches in Sri Lanka</a></li>
                    <li><a href="">Cultural Heritage of Kandy</a></li>
                </ul>
            </div>
            <div>
                <p className="text-lg font-semibold">About Us</p>
                <ul className="mt-4 text-black/70">
                    <li><a href="">Our Story</a></li>
                    <li><a href="">Work with us</a></li>
                </ul>
            </div>
            <div>
                <p className="text-lg font-semibold">Contact Us</p>
                <ul className="mt-4 text-black/70">
                    <li><a href="">Support & Help</a></li>
                    <li><a href="">Partner with Us</a></li>
                </ul>
            </div>
        </div>
    );
}

export default Footer;