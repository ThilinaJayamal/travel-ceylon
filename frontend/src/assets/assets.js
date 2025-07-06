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
    testimonials
}