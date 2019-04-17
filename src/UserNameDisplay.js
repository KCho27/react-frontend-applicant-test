import React, { Component } from "react"

class UserNameDisplay extends Component {
    constructor() {
        super()
        this.state = {
            user: []
        }
    }

    async componentDidMount() {
        try {
            let fetchedData = await fetch("https://jsonplaceholder.typicode.com/users")
            let jsonedData = await fetchedData.json()
            this.setState({
                user: jsonedData
            })
        } catch (error) {
            console.error(error)
        }
    }

    render() {
        return (
            <div>
                {this.state.user ? this.state.user.map(user => {
                    return (
                        <div key={user.id}>{user.name}</div>
                    )
                }) : null}
            </div>
        )
    }
}

export default UserNameDisplay