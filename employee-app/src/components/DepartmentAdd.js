import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'



class DepartmentAdd extends Component {
    constructor(props) {
        super(props);
        this.state = { snackbaropen: false, snackbarmsg: '' }
        this.submitHandle = this.submitHandle.bind(this);
    }
    snackbarClose = (event) => {
        this.setState({ snackbaropen: false })
    };

    submitHandle(event) {
        event.preventDefault();

        fetch('https://localhost:44317/api/department', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                DepartmentID: null,
                DepartmentName: event.target.DepartmentName.value
            })
        })
            .then(response => response.json())
            .then(result => {
                // alert(result);
                this.setState({ snackbaropen: true, snackbarmsg: result })
            }, (error) => {
                // alert('Failed');

                this.setState({ snackbaropen: true, snackbarmsg: 'Failed' })
            })


    }

    render() {
        return (
            <div className="container">
                <Snackbar anchorOrigin={{ vertical: 'left', horizontal: 'center' }}
                    open={this.state.snackbaropen}
                    autoHideDuration={3000}
                    onClose={this.state.snackbarmsg}
                    message={
                        <span id="message-id">{this.state.snackbarmsg}</span>
                    }
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            onClick={this.snackbarClose}>x</IconButton>
                    ]}
                    severity="success"
                />

                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add Department
              </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.submitHandle}>
                                    <Form.Group controlId="DepartmentName">
                                        <Form.Label>Department Name</Form.Label>
                                        <Form.Control type="text" required placeholder="DepartmentName" />

                                    </Form.Group>
                                    <Form.Group>
                                        <Button variant="primary" type="submit"> Add Department</Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>



                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
export default DepartmentAdd;