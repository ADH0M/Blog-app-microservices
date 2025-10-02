import { AuthContext } from '@/context/ContextProvider';
import  { useContext } from 'react'

const useAppContext = () => {
    const ctx = useContext(AuthContext);
    if(!ctx){
        throw new Error('there are context error')
    };
    return ctx;
}

export default useAppContext