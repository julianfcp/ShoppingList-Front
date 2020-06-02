import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { Form, FormGroup, Label, Input, Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import '../../App.css';


export default class CurrentList extends Component {
    constructor(props){
        super(props);
        this.state = {
            newItem: {  "itemName": "",
                        "itemStatus": ""},
            data : [{"itemStatus": ""}]
        }
    }

    componentDidMount() {
        // this allows me to call any function from inside a callback
         // that is defined in this class. Otherwise youll get a type error
        window.component = this;
        // Get the initial items to render
        this.getInitialValues();
    }

    getInitialValues = async () => {
        // get items in case they were updated
        await this.props.updateValues();
        console.log(this.props.inicialItems);
        // set the data state
        this.setState({
            data: this.props.inicialItems
        })
        
    }

    activeItemsTitle = () => {
        if (this.state.data.find(item => item.itemStatus === 'Active')){
            return <span className="mb-3 mt-3">Active Items</span>
        } else {
            return <span className="mb-3 mt-3">You don't have Active Items!</span>
        }
    }
    checkedItemsTitle = () => {
        if(this.state.data.find(item => item.itemStatus === 'Checked')){
            return <span className="mb-3 mt-3">Checked Items</span>
        }
    }
    // handle if user press enter on input
    handleEnter = async (e) => {
        // New item to store
        this.setState({
            newItem: {
                "itemName": e.target.value,
                "itemStatus": "Active"
            }
        })
        // User presses enter
        if(e.key === 'Enter') {
            console.log('Enter pressed', this.state.newItem.itemName);
            // reset the input and store data
            if(e.target.value !== ''){
                // store input into the Database
                await axios.post('http://localhost:4000/api/currentList', this.state.newItem)
                            .then(function(res){ 
                                console.log(res)
                            })
                            .catch(function(error){
                                console.log(error)
                            });
                // reset the item so the input is cleared
                this.setState({
                    newItem: {
                        "itemName": "",
                        "itemStatus": ""
                    }
                });

                await this.props.updateValues();
                this.getInitialValues();
            }
            
        }
    }

    handleCheckbox = async (itemId,itemName) => {
        console.log("item checked " + itemId);
        
        /*this.state.checked.push(e.target.value);
        const index = this.state.data.indexOf(e.target.value);
        console.log(index);
        // This erase item from data and reload the render
        this.setState({
            data: this.state.data.filter((_, i) => i !== index),
          });
        console.log(this.state.data2);*/
        // here I should update the database....

       
        await this.props.updateCheckedItem(itemId, itemName);
        this.getInitialValues();

    }
    handleCheckboxToActive = async (itemId, itemName) => {
        console.log("item checked " + itemId);
        await this.props.updateCheckedItemToActive(itemId, itemName);
        this.getInitialValues();
    }

    deleteItem =  async (id) => {
        console.log(id);
        await axios.delete('http://localhost:4000/api/currentList/'+id)
                    .then(function(res){
                        console.log(res);
                    })
                    .catch(function(error){
                        console.log(error)
                    });
        await this.props.updateValues();
        this.getInitialValues();
        
    }

    render() {
        return (
            <div className="container-list">
                <Container>
                    <Row>
                        <Col>
                            <Input type="text" placeholder="Add Item" onKeyDown={this.handleEnter} onChange={this.handleEnter} value={this.state.newItem.itemName}/>
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
                                    if(item.itemStatus === 'Active') {
                                    return (
                                        <ListGroupItem key={i}>
                                            <FormGroup className="mb-0 ml-3">
                                                <Label className="mb-0">
                                                    <Input type="checkbox" checked={false} onChange={() => window.component.handleCheckbox(item._id, item.itemName)} value={item.itemName}/>
                                                        {item.itemName}
                                                </Label>
                                                <FontAwesomeIcon className="trashCan" onClick={() => window.component.deleteItem(item._id)} icon={faTrashAlt} />
                                            </FormGroup>
                                        </ListGroupItem>
                                    )
                                } else {
                                    return ''
                                }
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
                                this.state.data.reverse().map(function(item, i){
                                if(item.itemStatus === 'Checked') {
                                    return (
                                        <ListGroupItem key={i}>
                                            <FormGroup className="mb-0 ml-3">
                                                <Label className="mb-0 checkedItems">
                                                    <Input type="checkbox" checked onChange={() => window.component.handleCheckboxToActive(item._id, item.itemName)} value={item.itemName}/>
                                                    {item.itemName}
                                                </Label>
                                                <FontAwesomeIcon className="trashCan" onClick={() => window.component.deleteItem(item._id)} icon={faTrashAlt} />
                                            </FormGroup>
                                        </ListGroupItem>
                                    )
                                } else {
                                    return ''
                                }
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
