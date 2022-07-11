import {ImFire} from 'react-icons/im'
import {FaSyncAlt} from 'react-icons/fa'
import ProgressBar from "@ramonak/react-progress-bar";

const Card = ({data}) => {

    /**
     * Since we are not using any
     * API to fetch Owner Info,
     * I have hardcoded this data
     */
    const owners ={
        1: "Rajesh",
        2: "Suresh",
        3: "Ranjini",
    }

    return (
        <div className="w-full bg-white rounded-lg shadow-lg hover:shadow-xl p-4 transition-all duration-300">
            <div className="flex flex-row justify-between">
                <div className="shrink-0">
                    <h3 className="font-medium text-lg text-gray-900">
                        {data.name}
                    </h3>
                    <h6 className="text-xs text-gray-300">{owners[data.owner_id]} &bull; {data.budget_name}</h6>
                </div>
                <div className="shrink-0">
                    <div className="rounded-full bg-rose-100 p-4 shadow-md">
                        {data.card_type === 'burner'? <ImFire className='fill-current text-rose-600' size={18} /> : <FaSyncAlt className='fill-current text-rose-600' size={18} />}
                    </div>
                </div>
            </div>
            <div className="flex flex-row justify-between mt-3">
                <div className="shrink-0">
                    <h6 className="text-xs text-gray-400 uppercase border border-gray-400 rounded-md px-2">{data.card_type}</h6>
                </div>
                <div className="shrink-0">
                <h6 className="text-xs text-gray-500 rounded-md px-2">Expires: {data.expiry}</h6>
                </div>
            </div>
            <ProgressBar completed={(data.spent.value/1000)*100} height={10} className="my-4" isLabelVisible={false} bgColor="#e11d48" baseBgColor="#15803d" />
            <div className="flex flex-row justify-between items-center">
                <div className='flex items-center'>
                    <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                    <h4 className="text-sm text-gray-900 pl-3">Spent</h4>
                </div>
                <h4 className="text-sm text-gray-900 pl-3">{data.spent.value} {data.spent.currency}</h4>
            </div>
            <div className="flex flex-row justify-between items-center">
                <div className='flex items-center'>
                    <div className="w-2 h-2 rounded-full bg-green-700"></div>
                    <h4 className="text-sm text-gray-900 pl-3">Available to spend</h4>
                </div>
                <h4 className="text-sm text-gray-900 pl-3">{data.available_to_spend.value} {data.available_to_spend.currency}</h4>
            </div>
        </div>
    );
}

export default Card;