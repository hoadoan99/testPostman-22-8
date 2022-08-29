import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import App from "./App";
import Home from "./Home";

export default function RouterExample() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'></Route>
        <Route path='/home' element={<Home />} />
        <Route path='/recepie-book' element={<App />} />
        <Route path='/recepie' element={<Recepie />} />
        <Route path='/shopping' element={<Recepie />} />
        {/* <Route path='teams' element={<Teams />}>
            <Route path=':teamId' element={<Team />} />
            <Route path='new' element={<NewTeamForm />} />
            <Route index element={<LeagueStandings />} />
          </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

const Recepie = () => {
  return <h1>xin chao</h1>;
};
