import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { installUnauthorizedHandler, setAuthToken } from "../api/client";

const AuthContext = createContext(null);
const STORAGE_KEY = "accessToken";

export function AuthProvider({ children }){
    const [accessToken, setAccessToken] = useState(() => {
        return localStorage.getItem(STORAGE_KEY) || "";
    });

    const isAuthenticated = Boolean(accessToken);

    useEffect(() => {
        installUnauthorizedHandler(() => {
            setAccessToken("");

            localStorage.removeItem(STORAGE_KEY);

            setAuthToken(null);
        });
    }, []);

    useEffect(() => {
        setAuthToken(accessToken || null);
    }, [accessToken]);

    async function login(username, password){
        const baseUrl = import.meta.env.VITE_API_URL;

        if(!baseUrl)
            throw new Error("VITE_API_URL est undefined. Vérifiez le fichier .env puis redemarrez");

        const url = `${baseUrl}/api/token/`;

        try{
            const response = await axios.post(url, { username, password });
            const token = response.data.access;

            if(!token)
                throw new Error("Réponse JWT invalide, champ 'access' manquant");

            setAccessToken(token);

            localStorage.setItem(STORAGE_KEY, token);

            return { ok: true };
        } catch (err) {
            const status = err?.response?.status;
            if(status === 401)
                return { ok:false, message: "Identifiants invalides" };
            return { ok:false, message: "Erreur de connexion au serveur" };
        }
    }

    function logout(){
        setAccessToken("");
        localStorage.removeItem(STORAGE_KEY);
        setAuthToken(null);
    }

    const value = useMemo( () => {
        return { accessToken, isAuthenticated, login, logout};
        }, [accessToken, isAuthenticated]);
    
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(){
    const ctx = useContext(AuthContext);
    if(!ctx)
        throw new Error("useAuth doit être utilisé à l'interieur de <AuthProvider>,");

    return ctx;
}