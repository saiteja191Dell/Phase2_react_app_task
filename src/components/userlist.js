import axios from "axios";
import React,{ Component } from "react";

class UserList extends Component{

    constructor(props){
        super(props);
        this.state={
            users:[]
        }
    }

    componentDidMount(){
        axios.get('http://jsonplaceholder.typicode.com/users')
                .then(result => {
                    this.setState({users:result.data})
                    console.log(this.state.users)
                })
                .catch(error => {
                    console.log("Error caught : " + error)
                })
    }

    render(){
        return(
            <div>
                <h2>User list Component</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.users.map((users, index) => {
                            return(
                                <tr key={index}>
                                    <td>{users.id}</td>
                                    <td>{users.name}</td>
                                    <td>{users.email}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default UserList;