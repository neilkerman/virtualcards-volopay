import { useState, useRef } from 'react'
import MasterLayout from "../layouts/MasterLayout";
import { FiSearch } from "react-icons/fi"
import { RiFilter3Line } from "react-icons/ri"
import useClickOutside from '../hooks/useClickOutside';

const YourCards = () => {

    const [menuOpen, setMenuOpen] = useState(false)
    const dropdownRef = useRef()

    useClickOutside(dropdownRef, () => {
        if(menuOpen) setMenuOpen(false)
    })

    return (
        <MasterLayout>
            <div className="w-full flex flex-row items-center justify-end py-5">
                <FiSearch />
                <div ref={dropdownRef} className="relative pl-4">
                    <button onClick={() => { setMenuOpen(prev => !prev) }} className="py-1 px-3 rounded-lg bg-gray-100">
                        <RiFilter3Line className="fill-current text-gray-400 inline-block" size={18} />
                        <span className="text-gray-500 text-sm pl-1">Filter</span>
                    </button>
                    <div className={`${menuOpen ? '' : 'opacity-0 h-0'} transition-opacity duration-300 overflow-hidden absolute -bottom-30 mt-1 right-0 w-72 rounded shadow-lg border border-gray-100 bg-white`}>
                        <div className="p-3 border-b border-gray-200">
                            <h6 className="text-xs font-medium">Filters</h6>
                        </div>
                        <div className="p-3">
                            <h6 className="font-medium text-gray-400 text-xs">
                                Type
                            </h6>
                            <div className="mt-3 flex flex-row">
                                <div className="flex items-center">
                                    <input
                                        id="subcription-checkbox"
                                        type="checkbox"
                                        defaultValue=""
                                        className="w-4 h-4 text-blue-600 rounded-lg focus:ring-0"
                                    />
                                    <label
                                        htmlFor="subcription-checkbox"
                                        className="ml-2 text-xs text-gray-500 font-medium"
                                    >
                                        Subscription
                                    </label>
                                </div>
                                <div className="flex items-center ml-4">
                                    <input
                                        id="burner-checkbox"
                                        type="checkbox"
                                        defaultValue=""
                                        className="w-4 h-4 text-blue-600 rounded-lg focus:ring-0"
                                    />
                                    <label
                                        htmlFor="burner-checkbox"
                                        className="ml-2 text-xs text-gray-500 font-medium"
                                    >
                                        Burner
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MasterLayout>
    );
}

export default YourCards;