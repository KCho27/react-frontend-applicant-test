import React, { Component } from "react"

class UserNameDisplay extends Component {
    constructor() {
        super()
        this.state = {
            displayPage : 0,
            setsOfFiveUsers: []
        }
        this.setsOfFiveCreator = this.setsOfFiveCreator.bind(this)
    }

    async componentDidMount() {
        try {
            let fetchedData = await fetch("https://jsonplaceholder.typicode.com/users")
            let jsonedData = await fetchedData.json()
            let sortedData = jsonedData.sort((a,b) => a.name !== b.name ? a.name < b.name ? -1 : 1 : 0)
            let setsOfFive = this.setsOfFiveCreator(sortedData)
            this.setState({
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
                    let slicedArr = arr.slice(i, arr.length - 1)
                    finalArr.push(slicedArr)
                } else {
                    let slicedArr = arr.slice(i, i + 5)
                    finalArr.push(slicedArr)
                }
            }
        }
        return finalArr
    }

    render() {
        return (
            <div>
                {this.state.setsOfFiveUsers && this.state.setsOfFiveUsers[this.state.displayPage] ?
                this.state.setsOfFiveUsers[this.state.displayPage].map(user => {
                    return (
                        <div key={user.id}>{user.name}</div>
                    )
                }) : null}
            </div>
        )
    }
}

export default UserNameDisplay