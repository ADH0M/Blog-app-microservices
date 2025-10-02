import useAppContext from './useAppContext'

const useTheme = () => {
  const {theme , setTheme } = useAppContext()
  return [theme , setTheme ] as const ;
}

export default useTheme;