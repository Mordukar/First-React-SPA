import React from "react";
import { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { Home } from "../Pages/Home";
import Chats from "../Pages/Chats";
import { ThemedProfile } from "../Pages/Profile";
import { News } from "../Pages/News/index";
import { PublicRoute } from "../Routes/PublicRoute";
import { PrivateRoute } from "../Routes/PrivateRoute";
import { onAuthStateChanged } from "@firebase/auth";
import { signOut, signUp, auth, login } from "../../services/firebase";


export const Routes = () => {
    const [authed, setAuthed] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthed(true);
            } else {
                setAuthed(false);
            }
        })

        return unsubscribe;
    }, []);

    const handleLogin = async (email, pass) => {
        try {
            await login(email, pass);
        } catch (e) {
            console.log(e);
        }
    }

    const handleSignUp = async (email, pass) => {
        try {
            await signUp(email, pass);
        } catch (e) {
            console.log(e);
        }
    }

    const handleLogout = async () => {
        try {
            await signOut();
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <BrowserRouter>
            <div><Link to="/">HOME</Link></div>
            <div><Link to="/chats">CHATS</Link></div>
            <div><Link to="/profile">PROFILE</Link></div>
            <div><Link to="/news">NEWS</Link></div>
            <Switch>
                <PublicRoute path="/login" exact authed={authed}>
                    <Home onLogin={handleLogin}/>
                </PublicRoute>
                <PublicRoute path="/signup" exact authed={authed}>
                    <Home onSignUp={handleSignUp}/>
                </PublicRoute>
                <PrivateRoute path="/profile" exact authed={authed}>
                    <ThemedProfile theme={null} onLogout={handleLogout}/>
                </PrivateRoute>
                <PrivateRoute path="/chats/:chatId?" authed={authed}>
                    <Chats/>
                </PrivateRoute>
                <Route path="/news" exact>
                    <News/>
                </Route>
                <Route>
                    <h1>Error 404</h1>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}