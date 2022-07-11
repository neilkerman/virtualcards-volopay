import { useState, useRef, useEffect, useCallback } from 'react'
import MasterLayout from "../layouts/MasterLayout";
import { FiSearch } from "react-icons/fi"
import { RiFilter3Line } from "react-icons/ri"
import { RiCloseFill } from "react-icons/ri"
import useClickOutside from '../hooks/useClickOutside';
import Card from '../components/card.component';
import CardSkeleton from '../components/card-skeleton.component';
import useDataFetch from '../hooks/useDataFetch';
import { AnimatedList } from 'react-animated-list';

const YourCards = () => {

    const [menuOpen, setMenuOpen] = useState(false)
    const [showSearch, setShowSearch] = useState(false)
    const [scrollLock, setScrollLock] = useState(false)
    const [pageNumber, setPageNumber] = useState(1)
    const [query, setQuery] = useState({ search: '', card_type: '' })

    const dropdownRef = useRef()
    const observer = useRef()

    useClickOutside(dropdownRef, () => {
        if (menuOpen) setMenuOpen(false)
    })

    const {
        data,
        hasMore,
        loading,
        error
    } = useDataFetch(pageNumber, 1)

    const lastCardRef = useCallback(node => {
        if (loading) return
        if (scrollLock) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPageNumber(prevPageNumber => prevPageNumber + 1)
            }
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMore, scrollLock])

    const filteredData =
        data.filter((d) => {
            return (
                d.name
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(query.search.toLowerCase().replace(/\s+/g, ''))
                &&
                d.card_type.includes(query.card_type)
                &&
                d.owner_id === 1
            )
        }
        )

    return (
        <MasterLayout>
            <div className="w-full flex flex-row items-center justify-end py-5">
                <FiSearch className={showSearch ? 'hidden' : 'cursor-pointer'} onClick={() => { setShowSearch(true) }} />
                <div className={`${showSearch ? 'w-full md:w-auto' : 'w-0 opacity-0'} transition-all duration-300 overflow-hidden flex items-center`}>
                    <input value={query.search} onChange={e => {
                        setQuery(prev => {
                            return {
                                ...prev,
                                search: e.target.value
                            }
                        })

                        if(!scrollLock) setScrollLock(true)
                    }} type="text" placeholder='search...' className="rounded-l-lg border-b border-t border-l border-gray-200 bg-gray-50 text-gray-700 text-sm px-3 py-1 w-full md:w-54 focus:ring-0 focus:ring-offset-0" />
                    <div onClick={() => {
                        if (query.search) {
                            setQuery(prev => {
                                return {
                                    ...prev,
                                    search: ''
                                }
                            })
                        } else {
                            setShowSearch(false)
                        }

                        if(scrollLock) setScrollLock(false)
                    }} className=" rounded-r-lg border-b border-t border-r border-gray-200 px-1 py-1 bg-gray-50 cursor-pointer">
                        <RiCloseFill className='fill-current text-gray-500' size={20} />
                    </div>
                </div>
                <div ref={dropdownRef} className="relative pl-4 shrink-0">
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
                                        onChange={() => {
                                            setQuery(prev => {
                                                return {
                                                    ...prev,
                                                    card_type: prev.card_type === '' ? 'subscription' : ''
                                                }
                                            })
                                        }}
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
                                        onChange={() => {
                                            setQuery(prev => {
                                                return {
                                                    ...prev,
                                                    card_type: prev.card_type === '' ? 'burner' : ''
                                                }
                                            })
                                        }}
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
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-4">
                {/* <AnimatedList animation={"fade"}> */}
                    {filteredData && filteredData.map((d, index) => {
                        if (filteredData.length == index + 1) {
                            return <div key={d._id} ref={lastCardRef}><Card data={d} /></div>
                        } else {
                            return <div key={d._id}><Card data={d} /></div>
                        }
                    })}
                {/* </AnimatedList> */}
                {loading && <><CardSkeleton /><CardSkeleton /><CardSkeleton /></>}

            </div>
        </MasterLayout>
    );
}

export default YourCards;