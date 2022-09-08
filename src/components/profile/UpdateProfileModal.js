import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import auth from '../../firebase.init';

const UpdateProfileModal = ({ profiles, refetch }) => {
  const [user] = useAuthState(auth);

  const handleOrder = (e) => {
    e.preventDefault();
    const profile = {
      email: user.email,
      education: e.target.education.value,
      location: e.target.location.value,
      phone: e.target.phone.value,
      linkedin: e.target.linkedin.value,
      age: e.target.age.value,
      gender: e.target.gender.value,
    };

    if (profiles[0] === undefined) {
      fetch(`http://localhost:5000/updateProfile`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(profile),
      })
        .then((res) => res.json())
        .then((data) => {
          refetch();
          toast('Profile Update successfully');
        });
    } else {
      fetch(`http://localhost:5000/updateProfile/${profiles[0]._id}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(profile),
      })
        .then((res) => res.json())
        .then((data) => {
          refetch();
          toast('Profile Update successfully');
        });
    }
  };

  return (
    <div>
      <input type='checkbox' id='profile-modal' className='modal-toggle' />
      <div className='modal modal-bottom sm:modal-middle'>
        <div className='modal-box'>
          <label htmlFor='profile-modal' className='btn btn-sm btn-circle absolute right-2 top-2'>
            ✕
          </label>
          <h3 className='font-bold text-lg text-center'>Update Your Profile</h3>
          <form onSubmit={handleOrder} className='w-80 mx-auto'>
            <label className='label'>
              <span className='label-text'>Education</span>
            </label>
            <input
              defaultValue={profiles[0]?.education}
              type='text'
              name='education'
              placeholder='Your Education'
              className='input w-full max-w-xs bg-gray-100'
            />
            <label className='label'>
              <span className='label-text'>Location</span>
            </label>
            <input
              defaultValue={profiles[0]?.location}
              type='text'
              name='location'
              placeholder='Your Location'
              className='input w-full max-w-xs bg-gray-100'
            />
            <label className='label'>
              <span className='label-text'>Phone Number</span>
            </label>
            <input
              defaultValue={profiles[0]?.phone}
              type='text'
              name='phone'
              placeholder='Phone Number'
              className='input w-full max-w-xs bg-gray-100'
            />
            <label className='label'>
              <span className='label-text'>Age</span>
            </label>
            <input
              defaultValue={profiles[0]?.age}
              type='text'
              name='age'
              placeholder='Your Age'
              className='input w-full max-w-xs bg-gray-100'
            />
            <label className='label'>
              <span className='label-text'>Gender</span>
            </label>
            <input
              defaultValue={profiles[0]?.gender}
              type='text'
              name='gender'
              placeholder='Gender'
              className='input w-full max-w-xs bg-gray-100'
            />
            <label className='label'>
              <span className='label-text'>LinkedIn Id</span>
            </label>
            <input
              defaultValue={profiles[0]?.linkedin}
              type='text'
              name='linkedin'
              placeholder='Your LinkedIn Id'
              className='input w-full max-w-xs bg-gray-100'
            />
            <input
              type='submit'
              value='Update Profile'
              className='btn btn-primary w-full max-w-xs mt-5 text-base-100'
            />
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UpdateProfileModal;
