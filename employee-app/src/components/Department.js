import React, { Component } from 'react';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';

import DepartmentAdd from './DepartmentAdd';
// import DepartmenEdit from './DepartmentEdit';
import DepartmentEdit from './DepartmentEdit';



class Department extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deps: [],
            showAddModal: false,
            showEditModal: false

        }
    }

    componentDidMount() {
        this.refreshList()
    }

    refreshList() {
        // this.setState({
        //     deps: [{ "DepartmentID": 1, "DepartmentName": "IT" },
        //     { "DepartmentID": 2, "DepartmentName": "HR" }]
        // })

        fetch('https://localhost:44317/api/department')
            .then(r => r.json())
            .then(data => {
                this.setState({ deps: data })
            });
    }
    hideModalClose() {
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

deleteDep(depid){
    if(window.confirm('Are you sure?')){
        fetch('https://localhost:44317/api/department/'+depid,{
            method:'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
       
    }
}


    render() {

        const {deps,deptId,deptName}=this.state;
        let addModalClose = () => this.setState({ showAddModal: false });
        let EditModalClose = () => this.setState({ showEditModal: false });


        return (
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <th> Department ID</th>
                        <th> Department Name</th>
                        <th> option</th>
                    </thead>
                    <tbody>
                        {this.state.deps.map(dep =>
                            <tr key={dep.DepartmentID}>
                                <td>{dep.DepartmentID}</td>
                                <td>{dep.DepartmentName}</td>
                                <td> 
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info" onClick={()=>this.setState({
                                            showEditModal:true,
                                            deptId:dep.DepartmentID,
                                            deptName:dep.DepartmentName
                                        })}>
                                            Edit
                                        </Button >

                                        <Button className="mr-2" variant="danger" onClick={()=>this.deleteDep(dep.DepartmentID)}>
                                            Delete
                                        </Button>
                                        <DepartmentEdit 
                                        show={this.state.showEditModal}
                                        onHide={EditModalClose}
                                        deptID={deptId}
                                        deptName={deptName}
                                        />
                                    </ButtonToolbar>
                                </td>

                            </tr>
                        )}

                    </tbody>
                </Table>
                <ButtonToolbar>
                    <Button variant="primary" onClick={() => this.setState({ showAddModal: true })}>
                        Add Department
                </Button>

                    <DepartmentAdd
                        show={this.state.showAddModal}
                        onHide={addModalClose}
                    />
                </ButtonToolbar>
            </div>
        )
    }
}
export default Department;