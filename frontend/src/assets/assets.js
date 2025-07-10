import heroBg from '../assets/hero_bg.jpg';
import shareLocation from '../assets/share_location.svg';
import taxiAlert from '../assets/taxi_alert.svg';
import stays from '../assets/stays.svg';
import collage from '../assets/collage.png';
import travelMan from '../assets/travel_man.jpg';
import followSign from '../assets/follow_the_signs.svg';
import kingBed from '../assets/king_bed.svg';
import localTaxi from '../assets/local_taxi.svg';
import star from '../assets/star.png';
import user1 from '../assets/user1.jpg';
import user2 from '../assets/user2.jpg';
import user3 from '../assets/user3.jpg';
import womenWithHand from '../assets/women_with_hand.png';
import r1 from '../assets/r1.svg';
import r2 from '../assets/r2.svg';
import r3 from '../assets/r3.svg';
import r4 from '../assets/r4.svg';
import r5 from '../assets/r5.svg';
import Central from '../assets/Central.jpg';
import Estern from '../assets/Eastern.jpg';
import North from '../assets/North.jpg';
import NorthWestern from '../assets/NorthWestern.jpg';
import Sabaragamuwa from '../assets/Sabaragamuwa.jpg';
import Northern from '../assets/Northern.jpg';
import Southern from '../assets/Southern.jpg';
import Uva from '../assets/Uva.jpg';
import Western from '../assets/Western.jpg';
import Bt_bg from '../assets/Bt_bg.jpg';
import login_img from '../assets/login_img.png';
import register_img from '../assets/register_img.png';

import fb from '../assets/fb.svg';
import whatsapp from '../assets/whatsapp.svg';
import instagram from '../assets/instagram.svg';
import email from '../assets/email.svg';
import google from '../assets/google.svg';
import fb_color from '../assets/fb_color.svg';

import tick from '../assets/tick.svg';
import close from '../assets/close.svg';
import userBg from '../assets/userBg.jpg';
import new_bg from '../assets/new_bg.png';

const visitCardList = [
    {
        title: "Stays",
        icon: kingBed,
        desc: "1000+ Hotels and stays for you"
    },
    {
        title: "Rides",
        icon: localTaxi,
        desc: "Comfortable and safe rides anytime"
    },
    {
        title: "Guides",
        icon: followSign,
        desc: "Discover places with local experts"
    }
]

  const testimonials = [
    {
      user: 'Sofia',
      country: 'Germany',
      text:
        'Really appreciate the help and support from the staff during these tough times. Shoutout to Katie for helping me always, even when I was out of the country. And always available when needed.',
      rating: 4,
      img: user1,
    },
    {
      user: 'Zara',
      country: 'Canada',
      text:
        'Really appreciate the help and support from the staff during these tough times. Shoutout to Katie for helping me always, even when I was out of the country. And always available when needed.',
      rating: 5,
      img: user2,
    },
    {
      user: 'Jean-Luc',
      country: 'United Kingdom',
      text:
        'Really appreciate the help and support from the staff during these tough times. Shoutout to Katie for helping me always, even when I was out of the country. And always available when needed.',
      rating: 5,
      img: user3,
    }
  ];

  const provinces = [
        {
            Image: Southern,
            title: "Southern Province",
            description: "Sun, Sand, and Serendipity"        
        },
        {
            Image: Estern,
            title: "Eastern Province",
            description: "Where the Island Breezes"
        },
        {
            Image: Uva,
            title: "Uva Province",
            description: "Nature's Playgrounds"
        },
        {
            Image: Western,
            title: "Western Province",
            description: "City Vibes, Coastal Charms"
        },
        {
            Image: Northern,
            title: "Nothern Province",
            description: "Ancient Soul, Modern Vibe"
        },
        {
            Image: Sabaragamuwa,
            title: "Sabaragamuwa Province",
            description: "Hidden Gems Awaitts"
        },
        {
            Image: Central,
            title: "Central Province",
            description: "Hill Country Heartbeat"
        },
        {
            Image: NorthWestern,
            title: "North Western Province",
            description: "History Untouched"
        },
        {
            Image: North,
            title: "North Central Province",
            description: "Land of Legends"
        }
    ]

    const heroSlides = [
        {
            image: heroBg,
            heading: "Dream it - Plan it",
            subheading: "We’ll make it happen",
            description: "Your travel dreams, our responsibility",
        },
        {
            image: Bt_bg,
            heading: "Explore - Experience",
            subheading: "Live your adventure",
            description: "Curated trips with local experts",
        },
        {
            image: new_bg,
            heading: "Relax - Rejuvenate",
            subheading: "Your island escape",
            description: "Luxury stays at your fingertips",
        },
    ];
    

export const asserts = {
    heroBg,
    shareLocation,
    taxiAlert,
    stays,
    collage,
    travelMan,
    followSign,
    kingBed,
    localTaxi,
    visitCardList,
    star,
    user1,
    testimonials,
    womenWithHand,
    r1,
    r2,
    r3,
    r4,
    r5,
    provinces,
    Bt_bg,
    fb,
    whatsapp,
    email,
    instagram,
    tick,
    close,
    login_img,
    register_img,
    google,
    fb_color,
    userBg,
    new_bg,
    heroSlides
}