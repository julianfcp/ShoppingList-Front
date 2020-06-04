import React, { Component } from 'react';
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
        this.getInitialValues();// Get the initial items to render
    }

    getInitialValues = async () => {
        await this.props.updateValues();// get items in case they were updated
        this.setState({// set the data state
            data: this.props.inicialItems
        })
        
    }
    // Sets the title in case there were active items
    activeItemsTitle = () => {
        if (this.state.data.find(item => item.itemStatus === 'Active')){
            return <span className="mb-3 mt-3">Active Items</span>
        } else {
            return <span className="mb-3 mt-3">You don't have Active Items!</span>
        }
    }
    // Sets the title in case there were checked items
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
                await this.props.createItem(this.state.newItem);
                // reset the item so the input is cleared
                this.setState({
                    newItem: {
                        "itemName": "",
                        "itemStatus": ""
                    }
                });
                // Reset the initial values to render
                this.getInitialValues();
            }
            
        }
    }

    // When active item checkbox is pressed
    handleCheckbox = async (itemId,itemName) => {
        // Updates the item status to 'Checked'  
        await this.props.updateCheckedItem(itemId, itemName);
        this.getInitialValues();

    }
    // When checked item checkbox is pressed
    handleCheckboxToActive = async (itemId, itemName) => {
        // Updates the item status to 'Active' 
        await this.props.updateCheckedItemToActive(itemId, itemName);
        this.getInitialValues();
    }
    // Deletes an item
    deleteItem =  async (id) => {
        console.log(id);
        await this.props.deleteItem(id);
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
