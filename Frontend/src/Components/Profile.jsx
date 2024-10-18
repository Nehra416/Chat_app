import React, { useRef, useState } from 'react'
import me from '../Img/me.jpg'
import { Dialog, DialogContent, DialogTrigger, } from "@/components/ui/dialog"
import { Button } from './ui/button'
import axios from 'axios'
import defaultImg from '../Img/default.png'

const Profile = () => {
  const selectImg = useRef(null);
  const [profileImg, setProfileImg] = useState('');
  const [prviewUrl, setPreviewUrl] = useState('');

  const handleProfile = (e) => {
    const file = e.target.files[0];
    setProfileImg(file);

    // create preview url of profile for display
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  }

  const updateProfile = async () => {
    try {
      const res = await axios.post('http://localhost:8000/user/update', { profileImg }, { withCredentials: true })
      console.log("Response is :", res);
      if (res.data.success) {

      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='bg-white w-[58vw] h-[95vh] my-3 rounded-xl overflow-hidden relative'>
      <section className='flex flex-col justify-center items-center gap-2 mt-[5vh]'>
        <img src={defaultImg} alt="Dp" className='rounded-full bg-gray-100 w-40 h-40' />
        <span className='text-2xl font-medium'>Deepak Nehra</span>
        <span className='text-lg text-gray-500 font-medium'>Nehra416</span>
      </section>

      {/* Section for update the profile */}
      <section className='flex justify-center items-center gap-2 mt-[3vh]'>

        {/* Dialog for update username */}
        <Dialog>
          <DialogTrigger>
            <Button>Change UserName</Button>
          </DialogTrigger>
          <DialogContent>
            <span className='font-medium text-xl text-center'>Update your UserName or Name</span>
            <input type="text" className='border rounded px-2 py-1 mb-1 outline-none focus:border-gray-500' placeholder='UserName' />
            <span className='text-center text-gray-500 font-medium'> - - - - - - - - - - OR - - - - - - - - - - </span>
            <input type="text" className='border rounded px-2 py-1 mb-1 outline-none focus:border-gray-500' placeholder='Name' />
            <Button>Update</Button>
          </DialogContent>
        </Dialog>

        {/* Dialog for update profile */}
        <Dialog>
          <DialogTrigger>
            <Button >Change Profile</Button>
          </DialogTrigger>
          <DialogContent>
            <span className='font-medium text-xl text-center'>Update Profile</span>
            <input type="file" ref={selectImg} className='hidden' onChange={handleProfile} />
            {prviewUrl ?
              <div className='flex justify-center'>
                <img src={prviewUrl} alt="Dp" className='w-40 h-40 rounded-full my-5' />
              </div> :
              <Button onClick={() => selectImg.current.click()}>Select Img</Button>}

            <div className={`${prviewUrl ? 'flex justify-center gap-2 items-center' : 'hidden'}`}>
              <Button onClick={() => selectImg.current.click()} className="w-full">Select another img</Button>
              <Button onClick={updateProfile} className="w-full">Update</Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Dialog for update password */}
        <Dialog>
          <DialogTrigger>
            <Button >Change Paasword</Button>
          </DialogTrigger>
          <DialogContent>
            <span className='font-medium text-xl text-center'>Update your Password</span>
            <input type="text" placeholder='Current Password' className='border rounded px-2 py-1 mb-1 outline-none focus:border-gray-500' />
            <input type="text" placeholder='New Password' className='border rounded px-2 py-1 mb-1 outline-none focus:border-gray-500' />
            <input type="text" placeholder='Confirm Password' className='border rounded px-2 py-1 mb-1 outline-none focus:border-gray-500' />
            <Button>Update</Button>
          </DialogContent>
        </Dialog>
      </section>
    </div>
  )
}

export default Profile