import React from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll'
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css';

class App extends React.Component{
    constructor(){
        super()
        this.state= {
            robots:[],
            searchfield: ''
        }
    }
    // to make 'this' work the custom functions shoud be in arrow style
    onSearchChange = (event) => {
        this.setState({searchfield:event.target.value})
        
    }
    componentDidMount(){
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(response=>response.json())
            .then(users=>this.setState({robots:users}))
    }
    render(){
        const { robots, searchfield } = this.state;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());
        })
        
        return !robots.length ? //if robots lenght is 0
        <h1>Loading!!!</h1>: //return this as placeholder
        ( //else proceed normally
                <div className='tc'>
                    <h1 className='f1'>RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange}/>
                    <Scroll>
                        <ErrorBoundary>
                            <CardList robots = { filteredRobots }/>
                        </ErrorBoundary>
                    </Scroll>
                </div>
        ) 
    }
}

export default App;
