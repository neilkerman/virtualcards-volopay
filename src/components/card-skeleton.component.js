import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const CardSkeleton = () => {
    return (
        <div className="w-full bg-white rounded-lg shadow-lg p-4">
            <div className="flex flex-row justify-between">
                <div className="shrink-0">
                    <Skeleton width={200} height={24} />
                    <Skeleton width={140} height={12} />
                </div>
                <div className="shrink-0">
                    <Skeleton width={50} height={50} circle={true} />
                </div>
            </div>
            <div className="flex flex-row justify-between mt-3 mb-1">
                <div className="shrink-0">
                    <Skeleton width={60} height={16} />
                </div>
                <div className="shrink-0">
                    <Skeleton width={80} height={12} />
                </div>
            </div>
            <Skeleton width={"100%"} height={14} />
            <div className="mt-1 flex flex-row justify-between items-center">
                <div className='flex items-center'>
                    <Skeleton className='flex items-center mr-3' width={10} height={10} circle={true} />
                    <Skeleton className='flex items-center ' width={60} height={14} />
                </div>
                <Skeleton width={40} height={14} className="mb-0"/>
            </div>
            <div className="flex flex-row justify-between items-center">
                <div className='flex flex-row items-center'>
                    <Skeleton className='flex items-center mr-3' width={10} height={10} circle={true} />
                    <Skeleton className='flex items-center ' width={100} height={14} />
                </div>
                <Skeleton width={40} height={14} className="mb-0" />
            </div>
        </div>
    );
}

export default CardSkeleton;