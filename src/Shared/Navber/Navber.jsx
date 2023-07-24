import { useState, useContext } from 'react';
import { BookOpenIcon, Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';

const Navber = () => {
    const { user, logOut } = useContext(AuthContext)
    const Links = [
        { name: "HOME", link: "/" },
        { name: "Collage", link: "/collage" },
        { name: "Admission", link: "/admission" },
        { name: "My College", link: "/myCollege" },
    ];
    const [open, setOpen] = useState(false);
    const handleLogout = () => {
        logOut()
            .then(() => { })
            .catch(err => console.log(err))
    }
    return (
        <div className='font-poppins shadow-md z-10 w-full fixed top-0 left-0'>
            <div className='md:flex items-center justify-between bg-white py-4 md:px-10 px-7'>
                {/* logo section */}
                <div className='font-bold text-2xl cursor-pointer flex items-center gap-1'>
                    <BookOpenIcon className='w-7 h-7 text-blue-600' />
                    <span>Addmition</span>
                </div>
                {/* Menu icon */}
                <div onClick={() => setOpen(!open)} className='absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7'>
                    {
                        open ? <XMarkIcon /> : <Bars3BottomRightIcon />
                    }
                </div>
                {/* linke items */}
                <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-12' : 'top-[-490px]'}`}>
                    {
                        Links.map((link, index) => (
                            <li key={index} className='md:ml-8 md:my-0 my-7 font-semibold'>
                                <Link to={link.link} className='text-gray-800 hover:text-blue-400 duration-500'>{link.name}</Link>
                            </li>))
                    }
                    <li className=''>
                        {
                            user ?
                                <button onClick={handleLogout} className='md:ml-8 md:my-0 my-7 font-semibold text-gray-800 hover:text-blue-400 duration-500'>LOGOUT</button>
                                :
                                <button className='md:ml-8 md:my-0 my-7 font-semibold'> <Link to='/login' className='text-gray-800 hover:text-blue-400 duration-500'>LOGIN</Link></button>
                        }
                    </li>
                    {
                        user?.displayName && <button className='btn bg-blue-600 text-white md:ml-8 font-semibold px-3 py-1 rounded duration-500 md:static'> <Link to={'/profile'}>{user?.displayName}</Link></button>
                    }

                </ul>
                {/* button */}
            </div>
        </div>
    );
};

export default Navber;








































// import { useState, useContext } from 'react';
// import { NavLink } from 'react-router-dom'
// import { BiMenuAltLeft } from 'react-icons/bi'
// import { MdOutlineCancel } from 'react-icons/md'
// const Navber = () => {
//   const [open, setOpen] = useState(true)

//   return (
//     <div className='flex justify-between items-center md:px-7 lg:px-12'>
//       <div>
//         shooping
//       </div>
//       <div className=''>
//         <button onClick={() => setOpen(true)} className='' ><BiMenuAltLeft size={20} /></button>

//         <div >
//           <div className=''>
//             <button onClick={() => setOpen(false)} className='' ><MdOutlineCancel size={20} /></button>
//           </div>
//           <ul className='' >

//             <li>
//               <NavLink
//                 to="/"
//                 className={({ isActive }) =>
//                   isActive ? "text-blue-600" : ""
//                 }
//               >
//                 Home
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="/"
//                 className={({ isActive }) =>
//                   isActive ? "text-blue-600" : ""
//                 }
//               >
//                 Home
//               </NavLink>
//             </li>
//           </ul>
//         </div>
//       </div>

//     </div>
//   );
// };

// export default Navber;
