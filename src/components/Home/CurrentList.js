import React, { Component } from 'react';

import { Form, FormGroup, Label, Input, Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';

export default class CurrentList extends Component {
    constructor(props){
        super(props);
        this.state = {
            newItem: '',
            data : [],
            checked: []
        }
    }

    componentDidMount() {
        window.component = this; // this allows me to call any function from inside a callback
                                 // that is defined in this class. Otherwise youll get a type error
    }
    activeItemsTitle = () => {
        if (this.state.data.length !== 0){
            return <span className="mb-3 mt-3">Active Items</span>
        } else {
            return <span className="mb-3 mt-3">You don't have Active Items!</span>
        }
    }
    checkedItemsTitle = () => {
        if(this.state.checked.length !== 0){
            return <span className="mb-3 mt-3">Checked Items</span>
        }
    }
    // handle if user press enter on input
    handleEnter = (e) => {
        this.setState({
            newItem: e.target.value
        })
        if(e.key === 'Enter') {
            console.log('do validate');
            // reset the input and store data
            if(e.target.value !== ''){
                this.setState({
                    newItem: ''
                });
                // store inputs into an array
                // ++ Should add this to Data Base
                this.state.data.push(e.target.value);
            }
            
        }
    }

    handleCheckbox = (e) => {
        console.log("item checked " + e.target.value);
        this.setState({
            newItem: ''
        });
        this.state.checked.push(e.target.value);
        const index = this.state.data.indexOf(e.target.value);
        if (index > -1) {
            this.state.data.splice(index, 1);
        }
        console.log(this.state.checked);
    }

    render() {
        return (
            <div className="container-list">
                <Container>
                    <Row>
                        <Col>
                            <Input type="text" placeholder="Add Item" onKeyDown={this.handleEnter} onChange={this.handleEnter} value={this.state.newItem}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <hr></hr>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        { this.activeItemsTitle() }
                        <ListGroup>
                            <Form>{
                                // reverse function prints the array backwards   
                                // window.component allows me to call any function in the outter class
                                this.state.data.reverse().map(function(item, i){
                                return (
                                    <ListGroupItem key={i}>
                                        <FormGroup className="mb-0 ml-3">
                                            <Label className="mb-0">
                                                <Input type="checkbox" checked={false} onChange={window.component.handleCheckbox} value={item}/>{item}
                                            </Label>
                                        </FormGroup>
                                    </ListGroupItem>
                                )
                                })}
                            </Form>
                        </ListGroup>
                        </Col>
                    </Row>
                </Container>
                <br />
                <Container>
                    { this.checkedItemsTitle() }
                    <Row>
                        <Col>
                        <ListGroup>
                            <Form>{
                                // reverse function prints the array backwards   
                                // window.component allows me to call any function in the outter class
                                this.state.checked.reverse().map(function(item, i){
                                return (
                                    <ListGroupItem key={i}>
                                        <FormGroup className="mb-0 ml-3">
                                            <Label className="mb-0 checkedItems">
                                                <Input type="checkbox" checked disabled value={item}/>{item}
                                            </Label>
                                        </FormGroup>
                                    </ListGroupItem>
                                )
                                })}
                            </Form>
                        </ListGroup>
                        </Col>
                    </Row>
                </Container>
                
            </div>
        )
    }
}
