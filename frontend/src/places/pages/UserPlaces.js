import React from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList';

const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'College Avenue',
    description: 'Feel free to drop off your book at the student center!!',
    imageUrl:
      'https://www.mycentraljersey.com/gcdn/-mm-/a5076e7a43a0cec6129489319d0fb728e2cd1814/c=0-264-5184-3193/local/-/media/2017/01/14/NJGroup/Bridgewater/636199871623400185-Student-Center-Rendering-1-.jpg?width=660&height=373&fit=crop&format=pjpg&auto=webp',
    address: 'College Ave, New Brunswick, NJ 08901',
    location: {
      lat: 40.7484405,
      lng: -73.9878584
    },
    creator: 'u1'
  },
  {
    id: 'p2',
    title: 'Busch Campus',
    description: 'Only support face-to-face trading here ',
    imageUrl:'https://scheduling.rutgers.edu/sites/default/files/study-space-banners/busch-student-center-banner_2.jpg',
    address: '604 Bartholomew Rd., Piscataway, NJ, United States, NE',
    location: {
      lat: 40.7484405,
      lng: -73.9878584
    },
    creator: 'u1',
  },

  {
    id: 'p2',
    title: 'Busch Campus',
    description: 'Only support face-to-face trading here ',
    imageUrl:'https://scheduling.rutgers.edu/sites/default/files/study-space-banners/busch-student-center-banner_2.jpg',
    address: '604 Bartholomew Rd., Piscataway, NJ, United States, NE',
    location: {
      lat: 40.7484405,
      lng: -73.9878584
    },
    creator: 'u2',
  }
];

const UserPlaces = () => {
  const userId = useParams().userId;
  const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId);
  return <PlaceList items={loadedPlaces} />;
};

export default UserPlaces;
