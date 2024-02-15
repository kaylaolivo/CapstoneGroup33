import React from 'react';

import UsersList from '../components/UsersList';

const Users = () => {
  const USERS = [
    {
      id: 'u1',
      name: 'Rutgers-NewBrunswick',
      image: 'https://i.etsystatic.com/13937468/r/il/ef6e22/1369375696/il_1588xN.1369375696_6xvh.jpg',
      places: 3
    },
    {
      id: 'u2',
      name: 'Yiran',
      image: 'https://scontent-lga3-2.xx.fbcdn.net/v/t39.30808-6/284685864_5575100202523965_2593595113365925348_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=lg1vM9KRJQkAX_OZhvr&_nc_ht=scontent-lga3-2.xx&oh=00_AfAcsp1EUm78l13jBlggAPlCW48rjbFbk50eDi9j5tAsNQ&oe=65D2BBD6',
      places: 1
    },
    {
      id: 'u3',
      name: 'Kayla',
      image: 'https://scontent-lga3-2.xx.fbcdn.net/v/t39.30808-6/284685864_5575100202523965_2593595113365925348_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=lg1vM9KRJQkAX_OZhvr&_nc_ht=scontent-lga3-2.xx&oh=00_AfAcsp1EUm78l13jBlggAPlCW48rjbFbk50eDi9j5tAsNQ&oe=65D2BBD6',
      places: 2
    },
    {
      id: 'u4',
      name: 'Antonio',
      image: 'https://scontent-lga3-2.xx.fbcdn.net/v/t39.30808-6/284685864_5575100202523965_2593595113365925348_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=lg1vM9KRJQkAX_OZhvr&_nc_ht=scontent-lga3-2.xx&oh=00_AfAcsp1EUm78l13jBlggAPlCW48rjbFbk50eDi9j5tAsNQ&oe=65D2BBD6',
      places: 4
    },
    {
      id: 'u5',
      name: 'Matthew',
      image: 'https://scontent-lga3-2.xx.fbcdn.net/v/t39.30808-6/284685864_5575100202523965_2593595113365925348_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=lg1vM9KRJQkAX_OZhvr&_nc_ht=scontent-lga3-2.xx&oh=00_AfAcsp1EUm78l13jBlggAPlCW48rjbFbk50eDi9j5tAsNQ&oe=65D2BBD6',
      places: 5
    },
    {
      id: 'u6',
      name: 'Hariraj',
      image: 'https://scontent-lga3-2.xx.fbcdn.net/v/t39.30808-6/284685864_5575100202523965_2593595113365925348_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=lg1vM9KRJQkAX_OZhvr&_nc_ht=scontent-lga3-2.xx&oh=00_AfAcsp1EUm78l13jBlggAPlCW48rjbFbk50eDi9j5tAsNQ&oe=65D2BBD6',
      places: 3
    }
  ];

  return <UsersList items={USERS} />;
};

export default Users;
