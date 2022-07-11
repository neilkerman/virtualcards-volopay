import { useState, useRef, Fragment, useCallback } from 'react'
import MasterLayout from "../layouts/MasterLayout";
import { FiSearch } from "react-icons/fi"
import { RiFilter3Line } from "react-icons/ri"
import { RiCloseFill } from "react-icons/ri"
import { RiArrowDropDownLine } from "react-icons/ri"
import useClickOutside from '../hooks/useClickOutside';
import Card from '../components/card.component';
import CardSkeleton from '../components/card-skeleton.component';
import useDataFetch from '../hooks/useDataFetch';
import { Listbox, Transition } from '@headlessui/react'

const BlockedCards = () => {

    /**
     * States used in the code
     */
    const [menuOpen, setMenuOpen] = useState(false)
    const [showSearch, setShowSearch] = useState(false)
    const [scrollLock, setScrollLock] = useState(false)
    const [pageNumber, setPageNumber] = useState(1)
    const [query, setQuery] = useState({search: '', card_type: '', owner_id: null})
    const [filterQuery, setFilterQuery] = useState({search: '', card_type: '', owner_id: null})

    /**
     * Refs used in the code
     */
    const dropdownRef = useRef()
    const observer = useRef()
    const subCheckboxRef = useRef()
    const burCheckboxRef = useRef()

    /**
     * Custom hook to detect clicks outside the element
     */
    useClickOutside(dropdownRef, () => {
        if (menuOpen) setMenuOpen(false)
    })

    /**
     * Custom hook to fetch data
     */
    const {
        data,
        hasMore,
        loading
    } = useDataFetch(pageNumber)

    /**
     * Since we are not using any
     * API to fetch Owner Info,
     * I have hardcoded this data
     */
    const ownersMap = [
        { name: "Rajesh", id: 1 },
        { name: "Suresh", id: 2 },
        { name: "Ranjini", id: 3 },
    ]

    const owners = {
        1: "Rajesh",
        2: "Suresh",
        3: "Ranjini",
    }

    /**
     * Func for infinite scroll
     */
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

    /**
     * Func to filter data
     */
    const filteredData =
        data.filter((d) => {
            return (
                d.name
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(filterQuery.search.toLowerCase().replace(/\s+/g, ''))
                    &&
                    d.card_type.includes(filterQuery.card_type)
                    &&
                    ((filterQuery.owner_id !== null) ? (d.owner_id === filterQuery.owner_id) : true)
            )
        }
        )

    return (
        <MasterLayout>
            {/* Filter Options Start */}
            <div className="w-full flex flex-row items-center justify-end py-5">
                <FiSearch className={showSearch ? 'hidden' : 'cursor-pointer'} onClick={() => { setShowSearch(true) }} />
                <div className={`${showSearch ? 'w-full md:w-auto' : 'w-0 opacity-0'} transition-all duration-300 overflow-hidden flex items-center`}>
                    <input value={filterQuery.search} onChange={e => {
                        setFilterQuery(prev => {
                            return {
                                ...prev,
                                search: e.target.value
                            }
                        })

                        if (!scrollLock) setScrollLock(true)
                    }} type="text" placeholder='search...' className="rounded-l-lg border-b border-t border-l border-gray-200 bg-gray-50 text-gray-700 text-sm px-3 py-1 w-full md:w-54 focus:ring-0 focus:ring-offset-0" />
                    <div onClick={() => {
                        if (filterQuery.search) {
                            setFilterQuery(prev => {
                                return {
                                    ...prev,
                                    search: ''
                                }
                            })
                        } else {
                            setShowSearch(false)
                        }

                        if (scrollLock) setScrollLock(false)
                    }} className=" rounded-r-lg border-b border-t border-r border-gray-200 px-1 py-1 bg-gray-50 cursor-pointer">
                        <RiCloseFill className='fill-current text-gray-500' size={20} />
                    </div>
                </div>
                <div ref={dropdownRef} className="relative pl-4 shrink-0">
                    <button onClick={() => { setMenuOpen(prev => !prev) }} className="py-1 px-3 rounded-lg bg-gray-100">
                        <RiFilter3Line className="fill-current text-gray-400 inline-block" size={18} />
                        <span className="text-gray-500 text-sm pl-1">Filter</span>
                    </button>
                    <div className={`${menuOpen ? '' : 'opacity-0 h-0'} transition-opacity duration-300 overflow-hidden absolute -bottom-30 mt-1 right-0 w-72 rounded-lg shadow-lg border border-gray-100 bg-white`}>
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
                                        ref={subCheckboxRef}
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
                                        ref={burCheckboxRef}
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
                            <h6 className="mt-6 font-medium text-gray-400 text-xs">
                                Cardholder
                            </h6>
                            <div className="mt-3 w-full h-full">
                                <Listbox value={query.owner_id !== null ? { name: owners[query.owner_id], id: query.owner_id } : null} onChange={(e) => {
                                    setQuery(prev => {
                                        return {
                                            ...prev,
                                            owner_id: e.id
                                        }
                                    })
                                }}>
                                    <div className="relative mt-1">
                                        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-gray-50 py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-rose-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-rose-500 sm:text-sm">
                                            {
                                                (query.owner_id)
                                                    ? <span className="block truncate">{owners[query.owner_id]}</span>
                                                    : <span className="text-gray-400 block truncate">
                                                        Select cardholder
                                                    </span>
                                            }
                                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                <RiArrowDropDownLine className="fill-current text-gray-400 inline-block" size={18} />
                                            </span>
                                        </Listbox.Button>
                                        <Transition
                                            as={Fragment}
                                            leave="transition ease-in duration-100"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <Listbox.Options className="mt-1 max-h-60 w-full overflow-auto py-1 text-base shadow-lg sm:text-sm">
                                                {ownersMap.map((owner, ownerIdx) => (
                                                    <Listbox.Option
                                                        key={ownerIdx}
                                                        className={({ active }) =>
                                                            `relative select-none py-2 pl-10 pr-4 cursor-pointer ${active ? 'bg-rose-50 text-rose-500' : 'text-gray-600'
                                                            }`
                                                        }
                                                        value={owner}
                                                    >
                                                        {({ selected }) => (
                                                            <>
                                                                <span
                                                                    className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                                        }`}
                                                                >
                                                                    {owner.name}
                                                                </span>
                                                                {selected ? (
                                                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-rose-500">
                                                                        <RiArrowDropDownLine className="fill-current text-rose-500" size={18} />
                                                                    </span>
                                                                ) : null}
                                                            </>
                                                        )}
                                                    </Listbox.Option>
                                                ))}
                                            </Listbox.Options>
                                        </Transition>
                                    </div>
                                </Listbox>
                            </div>
                            <div className="mt-3 flex flex-row gap-3">
                                <button onClick={() => {
                                    setFilterQuery(query)
                                }} className="w-full rounded-lg shadow text-xs text-white bg-rose-500 px-3 py-1">Apply</button>
                                <button onClick={() => {
                                    /**
                                     * Reseting all filter values here
                                     */
                                    setQuery({search: '', card_type: '', owner_id: null})
                                    setFilterQuery({search: '', card_type: '', owner_id: null})
                                    subCheckboxRef.current.checked = false
                                    burCheckboxRef.current.checked = false
                                }} className="w-full rounded-lg shadow text-xs text-gray-600 bg-gray-100 px-3 py-1">Clear</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Filter Options End */}

            {/* Rendering all cards */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-4">
                {filteredData && filteredData.map((d, index) => {
                    if (filteredData.length === index + 1) {
                        return <div key={d._id} ref={lastCardRef}><Card data={d} /></div>
                    } else {
                        return <div key={d._id}><Card data={d} /></div>
                    }
                })}
                {loading && <><CardSkeleton /><CardSkeleton /><CardSkeleton /></>}

            </div>
            {/* Rendering all cards end */}
        </MasterLayout>
    );
}

export default BlockedCards;