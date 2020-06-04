import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Card, CardTitle, CardText, Row, Col } from 'reactstrap';

export default class Lists extends Component {
    constructor(props){
        super(props);
        this.state = {
            myLists: this.props.myLists
        }
    }


    render() {
        return (
            <div>
                <h4 className="componentTitle">My Lists!</h4>
                
                <Container>
                    <Row>
                        <Col>
                             {
                                this.state.myLists.map(function(list, i){
                                    if(list.listStatus === 'Active') {
                                    return (
                                        <Card body className="mb-3 mt-3" key={i}>
                                            <CardTitle>{list.listName}</CardTitle>
                                            <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                            <div><Link to={"/MyLists/"+list._id}>View List</Link></div>
                                        </Card>
                                    )
                                } else {
                                    return ''
                                }
                                })
                            }
                        </Col>
                    </Row>                    
                </Container>
            </div>
        )
    }
}
