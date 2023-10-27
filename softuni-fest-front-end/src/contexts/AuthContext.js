import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider(props) {
    const [accessData, setAccessData] = useState(null);
    useEffect(() => {
        const storedAccessData = localStorage.getItem('access_info');
        if (storedAccessData) {
            try {
                const parsedAccessData = JSON.parse(storedAccessData);
                setAccessData(parsedAccessData);
            } catch (error) {
                console.error('Failed to parse access token:', error);
                localStorage.setItem('access_info', JSON.stringify({}));
            }
        }
    }, []);
    let isAuth = false;
    accessData ? isAuth = true : isAuth = false;
    return (
        <AuthContext.Provider
            value={{ accessData, setAccessData, isAuth }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}