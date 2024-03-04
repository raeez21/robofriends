import React, {useState, useEffect} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll'
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css';


//CLASS TO HOOKS
// class App extends Component{
//     constructor(){
//         super()
//         this.state= {
//             robots:[],
//             searchfield: ''
//         }
//     }
    
function App(){

    // to make 'this' work the custom functions shoud be in arrow style
    // onSearchChange = (event) => {
    //     this.setState({searchfield:event.target.value})
        
    // }
    //CLASS TO HOOKS
    // componentDidMount(){
    //     fetch("https://jsonplaceholder.typicode.com/users")
    //         .then(response=>response.json())
    //         .then(users=>this.setState({robots:users}))
    // }

    //CLASS TO HOOKS
    const [robots, setRobots] = useState([])
    const [searchfield, setSearchfield] = useState('')
    const [count, setCount] = useState(0)

    useEffect(()=>{
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(response=>response.json())
            .then(users=>setRobots(users))
        console.log(count)
    },[count])

    const onSearchChange = (event) => {
        //CLASS TO HOOKS
        // this.setState({searchfield:event.target.value})
        setSearchfield(event.target.value)
        
    }
    // render(){
    // const { robots, searchfield } = this.state;
    const filteredRobots = robots.filter(robot => {
        return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    })
    return !robots.length ? //if robots lenght is 0
    <h1>Loading!!!</h1>: //return this as placeholder
    ( //else proceed normally
            <div className='tc'>
                <h1 className='f1'>RoboFriends</h1>
                <button onClick={()=>setCount(count+1)}>CLICK ME!</button>
                <SearchBox searchChange={onSearchChange}/>
                <Scroll>
                    <ErrorBoundary>
                        <CardList robots = { filteredRobots }/>
                    </ErrorBoundary>
                </Scroll>
            </div>
    ) 
    // }
}

export default App;
