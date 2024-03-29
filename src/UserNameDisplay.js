import React, { Component } from "react"
import AddUserForm from "./AddUserForm"

class UserNameDisplay extends Component {
    constructor() {
        super()
        this.state = {
            users: [],
            displayPage : 0,
            setsOfFiveUsers: [],
            name: "",
            email: ""
        }
        this.increasePage = this.increasePage.bind(this)
        this.decreasePage = this.decreasePage.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async componentDidMount() {
        try {
            let fetchedData = await fetch("https://jsonplaceholder.typicode.com/users")
            let jsonedData = await fetchedData.json()
            let sortedData = jsonedData.sort((a,b) => a.name !== b.name ? a.name < b.name ? -1 : 1 : 0)
            let setsOfFive = this.setsOfFiveCreator(sortedData)
            this.setState({
                users: sortedData,
                setsOfFiveUsers: setsOfFive
            })
        } catch (error) {
            console.error(error)
        }
    }

    setsOfFiveCreator (arr) {
        let finalArr = []
        if (arr.length < 5) {
            finalArr.push(arr)
        } else {
            for (let i = 0; i < arr.length; i += 5) {
                if ( i + 5 > arr.length) {
                    let slicedArr = arr.slice(i)
                    finalArr.push(slicedArr)
                } else {
                    let slicedArr = arr.slice(i, i + 5)
                    finalArr.push(slicedArr)
                }
            }
        }
        return finalArr
    }

    increasePage () {
        this.setState({
            displayPage: this.state.displayPage + 1
        })
    }

    decreasePage() {
        this.setState({
            displayPage: this.state.displayPage - 1
        })
    }

    handleChange = event => {
        this.setState({
            [event.currentTarget.name] : event.currentTarget.value
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        let firstAndLastName = this.state.name.split(" ")
        if (firstAndLastName.length !== 2) {
            alert("You Must Enter A First AND Last Name")
        } else if (!this.state.email.includes(".")
                  || !this.state.email.includes("@")
                  || this.state.email.startsWith("@")
                  || this.state.email.startsWith(".")) {
                      alert("You Must Enter A Valid Email")
        } else {
            let newUser = {
                name: this.state.name, 
                email: this.state.email
            }
            let newUserList = [...this.state.users, newUser]
            let newSortedUsers = newUserList.sort((a,b) => a.name !== b.name ? a.name < b.name ? -1 : 1 : 0)
            let newSetsOfFive = this.setsOfFiveCreator(newSortedUsers)
            this.setState({
                users: newSortedUsers,
                setsOfFiveUsers: newSetsOfFive,
                name: "",
                email: ""
            })
        }
    }

    render() {
        return (
            <div>
                {this.state.setsOfFiveUsers && this.state.setsOfFiveUsers[this.state.displayPage] ?
                this.state.setsOfFiveUsers[this.state.displayPage].map(user => {
                    if(user.email.endsWith(".biz")){
                    return (<div key={user.email} style={{color:"green"}}>{user.name}</div>)
                    } else {
                        return(<div key={user.email}>{user.name}</div>)
                    }
                }) : null}
                <div>
                    {this.state.displayPage !== 0 ? <button onClick={this.decreasePage}>Previous</button> : null}
                    {this.state.displayPage < this.state.setsOfFiveUsers.length - 1 ? 
                        <button onClick={this.increasePage}>Next</button>
                        : null}
                </div>
                <div>
                    Page {this.state.displayPage + 1} of {this.state.setsOfFiveUsers.length}
                </div>
                <div>
                    <AddUserForm 
                    {...this.state}
                    handleChange={this.handleChange} 
                    handleSubmit={this.handleSubmit}
                    />
                </div>
            </div>
        )
    }
}

export default UserNameDisplay