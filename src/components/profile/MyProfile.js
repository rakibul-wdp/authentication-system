import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import auth from '../../firebase.init';
import Loading from '../shared/Loading';
import UpdateProfileModal from './UpdateProfileModal';

const MyProfile = () => {
  const [user] = useAuthState(auth);

  const {
    data: profiles,
    isLoading,
    refetch,
  } = useQuery('profile', () =>
    fetch(`http://localhost:5000/profile?email=${user.email}`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    }).then((res) => res.json())
  );

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <div className='lg:flex md:flex sm:flex-row items-center justify-center w-100 mx-auto mt-20'>
        <div className='avatar'>
          <div className='w-48 rounded-full'>
            <img
              src={
                user?.photoURL !== null
                  ? user?.photoURL
                  : 'https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png'
              }
              alt='profile'
            />
          </div>
        </div>
        <div className='ml-16'>
          <p className='font-bold text-lg bg-gray-100 p-2 m-1 rounded-md'>
            <span className='text-gray-500'>Name:</span> {user.displayName}
          </p>
          <p className='font-bold text-lg bg-gray-100 p-2 m-1 rounded-md'>
            <span className='text-gray-500'>Email:</span> {user.email}
          </p>
          <label htmlFor='profile-modal' className='btn btn-primary p-2 m-1 w-full text-base-100 text-lg'>
            Update Profile
          </label>
        </div>
      </div>
      <div className='shadow rounded-md w-96 mx-auto p-10 mt-10'>
        <p className='font-bold text-lg p-2 m-1 bg-gray-100 rounded-md'>
          <span className='text-gray-500'>Education:</span>{' '}
        </p>
        <p className='font-bold text-lg p-2 m-1 bg-gray-100 rounded-md'>
          <span className='text-gray-500'>Location:</span>{' '}
        </p>
        <p className='font-bold text-lg p-2 m-1 bg-gray-100 rounded-md'>
          <span className='text-gray-500'>Phone Number:</span>{' '}
        </p>
        <p className='font-bold text-lg p-2 m-1 bg-gray-100 rounded-md'>
          <span className='text-gray-500'>LinkedIn Id:</span>{' '}
        </p>
        <p className='font-bold text-lg p-2 m-1 bg-gray-100 rounded-md'>
          <span className='text-gray-500'>Age:</span>{' '}
        </p>
        <p className='font-bold text-lg p-2 m-1 bg-gray-100 rounded-md'>
          <span className='text-gray-500'>Gender:</span>{' '}
        </p>
      </div>
      {<UpdateProfileModal profiles={profiles} refetch={refetch} />}
    </>
  );
};

export default MyProfile;
