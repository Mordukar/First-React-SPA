import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { Home } from "../Pages/Home";
import Chats from "../Pages/Chats";
import { Profile, ThemedProfile } from "../Pages/Profile";
import { News } from "../Pages/News/index"


export const Routes = () => {
    return (
        <BrowserRouter>
            <div><Link to="/">HOME</Link></div>
            <div><Link to="/chats">CHATS</Link></div>
            <div><Link to="/profile">PROFILE</Link></div>
            <div><Link to="/news">NEWS</Link></div>
            <Switch>
                <Route path="/" exact>
                    <Home/>
                </Route>
                <Route path="/profile" exact>
                    <ThemedProfile theme={null} />
                </Route>
                <Route path="/chats/:chatId?">
                    <Chats/>
                </Route>
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