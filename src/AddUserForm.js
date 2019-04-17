import React from 'react'

const AddUserForm = props => {
    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                <div>
                    <label>Full Name : </label>
                    <input
                     type="text"
                     onChange={props.handleChange}
                     name="name"
                     value={props.name}
                     placeholder="EX : John Smith"
                     />
                </div>
                <div>
                    <label>Email : </label>
                    <input
                     type="Text"
                     onChange={props.handleChange}
                     name="email"
                     value={props.email}
                     placeholder="EX : JohnSmith@example.com"
                    />
                </div>
                <div>
                    <button type="submit">Add User! </button>
                </div>
            </form>
        </div>
    )
}

export default AddUserForm