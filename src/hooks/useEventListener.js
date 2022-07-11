import { useEffect, useRef } from "react"

export default function useEventListener(
    eventType,
    callback,
    element = window
) {
    const callbackRef = useRef(callback)

    /**
     * Current callback ref is being set to
     * the latest callback with every change
     * in the callback.
     */
    useEffect(() => {
        callbackRef.current = callback
    }, [callback])

    /**
     * With every event from the element,
     * which in the default case is the window,
     * we are firing the handler.
     */
    useEffect(() => {
        if (element == null) return
        const handler = e => callbackRef.current(e)
        element.addEventListener(eventType, handler)
        
        /**
         * When the current state is unloaded,
         * the event listener is removed to avoid
         * unnecessary errors
         */
        return () => element.removeEventListener(eventType, handler)
    }, [eventType, element])
}