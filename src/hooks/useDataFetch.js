import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useDataFetch(pageNumber, owner_id) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [data, setData] = useState([])
    const [hasMore, setHasMore] = useState(false)

    useEffect(() => {
        setLoading(true)
        setError(false)
        let cancel
        axios({
            method: 'GET',
            url: `https://yummy-confused-harrier.glitch.me/cards`,
            params: { page: pageNumber, owner_id: owner_id },
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