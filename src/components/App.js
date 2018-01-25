import React from 'react';
import logo from "../assets/imgs/logo.png";
import '../assets/stylus/reset.styl'
import './App.styl';
import {BrowserRouter as Router, Route, Switch, Redirect, NavLink} from "react-router-dom";
import Recommend from "./recommend/Recommend"
import Ranking from "./ranking/Ranking"
import Search from "./search/Search"

class App extends React.Component {
  render() {
    return (
      <div className="app">
          <header className="app-header">
              <img src={logo} className="App-logo" alt="logo"/>
              <h1 className="app-title">Mango Music</h1>
          </header>
          <div className="music-tab">
              <NavLink to="/recommend" className="nav-link">
                  <span>推荐</span>
              </NavLink>
              <NavLink to="./ranking" className="nav-link">
                  <span>排行榜</span>
              </NavLink>
              <NavLink to="./search" className="nav-link">
                  <span>搜索</span>
              </NavLink>
          </div>
          <div className="music-view">
              {/*
              switch组建用来选择最近的一个路由，否则最后一个没有指定path的路由也会显示
              Redirect重定向到列表页*/}
              <Switch>
                  <Route path="/recommend" component={Recommend} />
                  <Route path="/ranking" component={Ranking} />
                  <Route path="/search" component={Search} />

              </Switch>
          </div>
      </div>
    );
  }
}

export default App;