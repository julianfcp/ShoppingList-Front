import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Card, CardTitle, CardText, Row, Col } from 'reactstrap';

export default class Lists extends Component {
    render() {
        return (
            <div>
                <h4 className="componentTitle">My Lists!</h4>
                <Container>
                    <Row>
                        <Col>
                            <Card body className="mb-3 mt-3">
                                <CardTitle>Special Title Treatment</CardTitle>
                                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                <div><Link to="/MyLists/123">View List</Link></div>
                            </Card>
                            <Card body className="mb-3 mt-3">
                                <CardTitle>Special Title Treatment</CardTitle>
                                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                            </Card>
                            <Card body className="mb-3 mt-3">
                                <CardTitle>Special Title Treatment</CardTitle>
                                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                            </Card>
                        </Col>
                    </Row>                    
                </Container>
            </div>
        )
    }
}
