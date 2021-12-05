import React from 'react';

import UsersList from '../components/UsersList.js';


const Users = () => {
  const USERS = [
    {
    id:'u1',
    user: 'Ramona Singer',
    image: 'https://the-hollywood-gossip-res.cloudinary.com/iu/s--5k0sUAIe--/t_slideshow/cs_srgb,f_auto,fl_strip_profile.lossy,q_auto:420/v1407782421/ramona-singer-the-crazy-eyes-have-it.jpg',
    places: 3
    }
  ];

  return (
    <UsersList items={USERS} />
  );
}

export default Users;