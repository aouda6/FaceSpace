import React from 'react';

export class AccountCreation extends React.Component {

    constructor() {
        super();
        this.state = {user: "",
        message: "..."} ;
        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        var self = this;
        // Prevents reinitialization
        e.preventDefault();

        let userName = self.state.user;
        fetch('http://localhost:8080/AccountCreation/createAccount?'
            + 'userName=' + userName, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res =>{
            if(res.ok){
                self.setState({message: 'Account: '+userName + ' created!'});
            }
            else{
                self.setState({message: 'No ...'});
            }
        })

    }


    handleUserNameChange (e) {
        // Prevent following the link.
        e.preventDefault();
        this.setState ( {user : e.target.value });
    }

    render() {
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input type="text" defaultValue={this.state.user} onChange={this.handleUserNameChange}/>
                    </label>
                    <input type="submit" value="Create Account!" />
                </form>
                Name: {this.state.user}
                <br/>
                Messages: {this.state.message}
            </div>
        );
    }
}
