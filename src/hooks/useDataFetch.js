import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useDataFetch(pageNumber) {
    /**
     * This hook returns 4 states,
     * those have been declared below
     */
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [data, setData] = useState([])
    const [hasMore, setHasMore] = useState(false)

    useEffect(() => {
        setLoading(true)
        setError(false)
        let cancel

        /**
         * Using axios to fetch the data.
         * Since there is no other API,
         * I have hardcoded the uri here
         */

        axios({
            method: 'GET',
            url: `https://yummy-confused-harrier.glitch.me/cards`,
            params: { page: pageNumber },
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            setData(prevdata => {
                return [...new Set([...prevdata, ...res.data.data])]
            })
            setHasMore(res.data.total > 0)
            setLoading(false)
        }).catch(e => {
            if (axios.isCancel(e)) return
            setError(true)
        })
        return () => cancel()
    }, [pageNumber])

    return { loading, error, data, hasMore }
}