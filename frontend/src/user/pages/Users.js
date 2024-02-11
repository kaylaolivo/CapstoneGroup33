import React from 'react';

import UsersList from '../components/UsersList';

const Users = () => {
  const USERS = [
    {
      id: 'u1',
      name: 'Rutgers-NewBrunswick',
      image:
        'https://i.etsystatic.com/13937468/r/il/ef6e22/1369375696/il_1588xN.1369375696_6xvh.jpg',
      places: 3
    },
    {
      id: '36',
      name:'Yiran',
      image:
          'https://www.psdstack.com/wp-content/uploads/2019/08/copyright-free-images-750x420.jpg',
      places: 1

    }
  ];

  return <UsersList items={USERS} />;
};

export default Users;
