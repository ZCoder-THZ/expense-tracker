// context/AuthContext.js
import { createContext, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const router = useRouter();

    const [auth, setAuth] = useState(false);
    // const [token, setToken] = useState('');
    // check if there is token in localStorage
    // if there is token set the auth to true
    // after login set the token in localstorage 
    // after logout remove the token from localstorage


    // const checkTokenInLocal = async () => {
    //     await localStorage.getItem('token') ? setAuth(true) : setAuth(false);
    //     if (!auth) {
    //         return await router.push('/signin')
    //     }
    // }
    const checkTokenInLocal = async () => {
        const token = await localStorage.getItem('token');
        if (!token) {
            return router.push('/signin')
        }
        setAuth(true)

    }


    const login = (token) => {
        localStorage.setItem('token', token)
        setAuth(true);
    };

    const logout = () => {
        // chage the stat of auth and push to signup
        localStorage.removeItem('token')
        setAuth(!auth);
        router.push('/signup')
    };



    return (
        <AuthContext.Provider value={{ auth, login, logout, checkTokenInLocal }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    return useContext(AuthContext);
};

export { AuthProvider, useAuth };
