import React, { Component } from 'react';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';

import EmployeeAdd from './EmployeeAdd';
// import empartmenEdit from './EmployeeEdit';
import EmployeeEdit from './EmployeeEdit';



class Employee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emps: [],
            showAddModal: false,
            showEditModal: false

        }
    }

    componentDidMount() {
        this.refreshList()
    }

    refreshList() {
        // this.setState({
        //     emps: [{ "EmployeeID": 1, "EmployeeName": "IT" },
        //     { "EmployeeID": 2, "EmployeeName": "HR" }]
        // })

        fetch('https://localhost:44317/api/Employee')
            .then(r => r.json())
            .then(data => {
                this.setState({ emps: data })
            });
    }
    hideModalClose() {
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

deleteemp(empid){
    if(window.confirm('Are you sure?')){
        fetch('https://localhost:44317/api/Employee/'+empid,{
            method:'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
       
    }
}


    render() {

        const {emps,empId,empName,department,mailid,doj}=this.state;
        let addModalClose = () => this.setState({ showAddModal: false });
        let EditModalClose = () => this.setState({ showEditModal: false });


        return (
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <th> Employee ID</th>
                        <th> Employee Name</th>
                        <th> Department</th>
                        <th> MailID</th>
                        <th> DOJ</th>

                        <th> option</th>
                    </thead>
                    <tbody>
                        {this.state.emps.map(emp =>
                            <tr key={emp.EmployeeID}>
                                <td>{emp.EmployeeID}</td>
                                <td>{emp.EmployeeName}</td>
                                <td>{emp.Department}</td>
                                <td>{emp.MailID}</td>
                                <td>{emp.DOJ}</td>
                                <td> 
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info" onClick={()=>this.setState({
                                            showEditModal:true,
                                            empId:emp.EmployeeID,
                                            empName:emp.EmployeeName,
                                            department:emp.Department,
                                            mailid:emp.MailID,
                                            doj:emp.DOJ
                                        })}>
                                            Edit
                                        </Button >

                                        <Button className="mr-2" variant="danger" onClick={()=>this.deleteemp(emp.EmployeeID)}>
                                            Delete
                                        </Button>
                                        <EmployeeEdit 
                                        show={this.state.showEditModal}
                                        onHide={EditModalClose}
                                        empID={empId}
                                        empName={empName}
                                        detname={department}
                                        mailid={mailid}
                                        doj={doj}

                                        />
                                    </ButtonToolbar>
                                </td>

                            </tr>
                        )}

                    </tbody>
                </Table>
                <ButtonToolbar>
                    <Button 
                    variant="primary" 
                    onClick={() => this.setState({ showAddModal: true })}>
                        Add Employee
                </Button>

                    <EmployeeAdd
                        show={this.state.showAddModal}
                        onHide={addModalClose}
                    />
                </ButtonToolbar>
            </div>
        )
    }
}
export default Employee;

