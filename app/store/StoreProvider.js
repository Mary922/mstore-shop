'use client'
import {useRef} from 'react';
import {makeStore} from '@/app/store/MakeStore';
import {Provider} from 'react-redux'

export default function StoreProvider({children}) {
    const storeRef = useRef(null);
    if (!storeRef.current) {
        storeRef.current = makeStore()
    }
    return <Provider store={storeRef.current}>{children}</Provider>
}