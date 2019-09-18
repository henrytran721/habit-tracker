import React, { Component } from 'react';
import './_homepage.scss';
import logo from '../images/title.svg';

const AddHabit = (props) => {
    return (
        <div>
            <div className='addHabit'>
                <p className='addText'>Add a new habit</p>
                <button onClick={props.showBox}><span>+</span></button>
            </div>
        </div>
    )
}

const AddBox = (props) => {
    return (
        <div className='addBox'>
            <div className='habitInfo'>
                <p>Habit Name:</p>
                <input className='habitText' type='text' onChange={props.handleHabitValue}></input>
            </div>
            <div className='habitInfo'>
                <p>Times repeated:</p>
                <input className='numText' type='text' onChange={props.handleNumValue}></input>
            </div>
            <button onClick={props.addInfo}>Add</button>
        </div>
    )
}

const HabitBox = (props) => {
    return (
        <div className='boxContainer'>
            {/* {props.habit.map((habit, index) => {
                return (
                    <div className='habitItem'>
                        <div id={index} className='habitBox'>
                            <div className='habitDescription'>
                                <p>{habit.habitName}</p>
                                <p>{habit.startingValue} / {habit.amount}</p>
                                {habit.counter > 0 ? 
                                <p className='counter'>Times completed: {habit.counter}</p> : <p></p>
                                }
                            </div>
                            <div className='incrementor'>
                                {habit.startingValue !== habit.amount 
                                ? <button id={index} onClick={props.handleIncrement}>+</button> : 
                                <button id = {index} className='resetBtn' onClick={props.reset}>Reset</button>
                                }
                                <button id={index} onClick={props.handleDecrement}>-</button>
                            </div>
                            <div className='psuedoBox' style={{width: ((habit.startingValue / habit.amount) * 100) + "%"}}></div>
                        </div>
                        <button id={index} onClick={(e) => props.handleDelete(habit.habitName, e)} className='deleteBtn'>Delete</button>
                    </div>
                )
            })} */}
        </div>
    )
}

export default class Homepage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            habitInfo: [],
            habitValue: '',
            numValue: ''
        }
        
        this.showBox = () => {
            let box = document.querySelector('.addBox');
            {box.style.display === 'none' ? box.style.display = 'flex' : box.style.display = 'none'}
        }

        this.addInfo = () => {
            let habitText = document.querySelector('.habitText');
            let numText = document.querySelector('.numText');
            this.setState({
                habitInfo: this.state.habitInfo.concat({
                    habitName: this.state.habitValue,
                    amount: parseInt(this.state.numValue),
                    startingValue: 0,
                    counter: 0
                })
            })
        }

        this.handleHabitValue = () => {
            let habitText = document.querySelector('.habitText').value;
            this.setState({
                habitValue: habitText
            })
        }
        this.handleNumValue = () => {
            let numText = document.querySelector('.numText').value;
            this.setState({
                numValue: numText
            })
        }

        this.handleIncrement = (e) => {
            let index = parseInt(e.target.id);
            let newState = Object.assign({}, this.state);
            const limit = this.state.habitInfo[index].amount;
            let currentValue = this.state.habitInfo[index].startingValue;
            if(limit > newState.habitInfo[index].startingValue) {
                newState.habitInfo[index].startingValue++;
            }
            this.setState(newState)
            let newValue = this.state.habitInfo[index].startingValue;
            const boxContainer = document.querySelector('.boxContainer');
            let newArr = [].slice.call(boxContainer.childNodes);
            let currentBox = newArr[index].childNodes[0].childNodes[2];
            currentBox.style.width = ((newValue / limit) * 100) + '%';
            console.log(newState);
        }

        this.handleDecrement = (e) => {
            let index = parseInt(e.target.id);
            let newState = Object.assign({}, this.state);
            const limit = this.state.habitInfo[index].amount;
            const currentValue = this.state.habitInfo[index].startingValue;
            if(newState.habitInfo[index].startingValue > 0) {
                newState.habitInfo[index].startingValue--
            }
            this.setState(newState);
            let newValue = this.state.habitInfo[index].startingValue;
            const boxContainer = document.querySelector('.boxContainer');
            let newArr = [].slice.call(boxContainer.childNodes);
            let currentBox = newArr[index].childNodes[0].childNodes[2];
            currentBox.style.width = ((newValue / limit) * 100) + '%';
        }

        this.handleDelete = (name, e) => {
            let index = parseInt(e.target.id);
            let habitName = this.state.habitInfo[index].habitName
            console.log(name, habitName);
            this.setState((currentState) => {
                return {
                    habitInfo: currentState.habitInfo.filter((habit) => habit.habitName !== name)
                }
            })
        }

        this.reset = (e) => {
            let index = parseInt(e.target.id);
            let newState = Object.assign({}, this.state);
            {newState.habitInfo[index].startingValue === newState.habitInfo[index].amount ? 
                newState.habitInfo[index].startingValue = 0 : ''
            }
            newState.habitInfo[index].counter++;
            this.setState(newState);
            console.log(newState);
        }
    }
    componentDidMount() {
        // let newState = localStorage.getItem('habits');
        // let data = JSON.parse(newState);
        // console.log(this.state.habitInfo);
        // this.setState({
        //     habitInfo: data
        // })
    }

    componentDidUpdate() {
        localStorage.setItem('habits', JSON.stringify(this.state.habitInfo));
    }
    render() {
        console.log(this.state.habitInfo);
        return (
            <div id='habitContainer'>
                <div className='title'>
                    <img src={logo} />
                </div>
                <div className='description'>
                    <p>Build or break your habit by adding a new habit</p>
                    <p>Add a number for everyday you accomplish your habit goal</p>
                </div>
                <div className='addFlex'>
                    <AddHabit
                    showBox={this.showBox}
                    />
                    <AddBox
                    addInfo={this.addInfo}
                    handleHabitValue={this.handleHabitValue} 
                    handleNumValue={this.handleNumValue}
                    />
                </div>
                <HabitBox
                habit={this.state.habitInfo} 
                handleIncrement={this.handleIncrement}
                handleDecrement={this.handleDecrement}
                handleDelete={this.handleDelete}
                reset={this.reset}
                />
            </div>
        )
    }
}