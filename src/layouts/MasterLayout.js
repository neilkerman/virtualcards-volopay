import {BiVideo} from "react-icons/bi"
import {MdAdd} from "react-icons/md"
import {RiLayoutGridFill} from "react-icons/ri"
import {GiHamburgerMenu} from "react-icons/gi"

const MasterLayout = ({children}) => {
    return ( 
        <div className="h-screen w-screen overflow-x-hidden">
            <div className="max-w-6xl px-5 py-10 w-full mx-auto">
                <div className="flex flex-col sm:flex-row justify-between">
                    <div className="flex flex-row items-center">
                        <h1 className="font-semibold text-3xl text-gray-900">Virtual Cards</h1>
                        <h6 className="cursor-pointer text-blue-500 text-sm px-3">
                            <BiVideo className="fill-current text-blue-500 inline-block" size={16} />
                            <span className="pl-1">Learn More</span>
                        </h6>
                    </div>
                    <button className="shadow-md hover:shadow-lg transition-all duration-300 bg-white px-3 py-1 text-sm flex flex-row items-center rounded"><MdAdd className="fill-current" size={20} /> <span className="pl-2">Virtual Card</span></button>
                </div>
                <div className="mt-10 text-xs text-center text-gray-500 border-b border-gray-200 flex flex-row justify-between">
                    <ul className="flex flex-wrap shrink-0 -mb-px">
                        <li className="mr-2">
                            <a className="inline-block px-4 py-3 rounded-t-lg border-b border-transparent hover:text-gray-600 hover:border-gray-300">Your</a>
                        </li>
                        <li className="mr-2">
                            <a className="inline-block px-4 py-3 text-black font-medium rounded-t-lg border-b-2 border-red-600 active">All</a>
                        </li>
                        <li className="mr-2">
                            <a className="inline-block px-4 py-3 rounded-t-lg border-b border-transparent hover:text-gray-600 hover:border-gray-300">Blocked</a>
                        </li>
                    </ul>
                    <div className="flex flex-row shrink-0">
                        <RiLayoutGridFill className="fill-current text-gray-400 my-auto" size={16} />
                        <div className="w-3"></div>
                        <GiHamburgerMenu className="fill-current text-gray-400 my-auto" size={16} />
                    </div>
                </div>
                {children}
            </div>
        </div>
     );
}
 
export default MasterLayout;