// context/AuthContext.js
import { createContext, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const router = useRouter();

    const [auth, setAuth] = useState(false);

    const login = () => {
        //logged in state 

        setAuth(true);
    };

    const logout = () => {
        // chage the stat of auth and push to signup
        setAuth(!auth);

        router.push('/signup')
    };



    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    return useContext(AuthContext);
};

export { AuthProvider, useAuth };
