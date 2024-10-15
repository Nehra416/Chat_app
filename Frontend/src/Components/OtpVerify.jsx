import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { RiLoader2Line } from "react-icons/ri";
import axios from 'axios'

const OtpVerify = () => {
    const [OTP, setOTP] = useState();

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const params = useParams();
    const userName = params.id;

    // function to handle the sign in process
    const handleOtpVerify = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            const res = await axios.post('http://localhost:8000/user/signup-verify', { userName, OTP }, { withCredentials: true })
            console.log("res is:", res);

            if (res.data.success) {
                alert(res.data.message);
                navigate('/signin');
            }

        } catch (error) {
            console.log("Error in handleOtpVerify:", error)
            alert(error.response.data.message);
        } finally {
            setLoading(false);
            setOTP('');
        }
    }

    return (
        <div className='flex justify-center items-center w-screen h-screen px-3'>
            <form onSubmit={handleOtpVerify} className='shadow-xl drop-shadow md:min-w-[35vw] min-w-72 flex flex-col gap-5 p-8 rounded-md'>

                <div className='text-center'>
                    <h1 className='font-semibold text-xl'>Logo</h1>
                    <p className='text-sm font-medium my-2'>OTP send to your email nareshdudi050@gmail.com</p>
                </div>

                {/* takes the user's data from the client for signin */}
                <div>
                    <h1 className='font-semibold text-center'>For conformation enter your 6 digit OTP</h1>
                    <input type="text"
                        className='border-2 text-center w-full rounded-md h-8 pl-2 font-medium my-2'
                        onChange={(e) => setOTP(e.target.value)} value={OTP} name='OTP' required />
                </div>

                {/* display loading on the signup */}
                {
                    loading ? (
                        <button className='bg-gray-700 text-xl py-1 rounded text-white hover:bg-gray-900 flex items-center justify-center'>
                            <RiLoader2Line className='animate-spin mr-3' />
                            Please Wait . . .
                        </button>

                    ) : (
                        <button type='submit' className='bg-gray-700 text-xl py-1 rounded text-white hover:bg-gray-900'>Verify</button>
                    )
                }

                {/* link to send the user to the signup page if he can't created a account */}
                {/* <span className='text-center'>Resend OTP? <Link to="/signup" className="text-blue-500 hover:underline"> Click here</Link></span> */}
            </form>

        </div>
    )
}

export default OtpVerify