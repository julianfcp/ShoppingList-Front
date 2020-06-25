import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Card, CardTitle, CardText, Row} from 'reactstrap';

const Lists = (props) => {
    
    let lists = [];
    let list_1 = [];
    let data = props.myLists;

    data.forEach((item, index) => {
        if(index %2){
            lists.push([data[index - 1], data[index]])
        }
    });
    const rendList_1 = () => {
        if(data.length % 2 !== 0){
            list_1.push(data[data.length - 1]);
            return (
                <Row>
                    <div className='col-lg-6' key={list_1[0].length - 1}>
                        <Card body className="mb-3 mt-3 shadow p-3 mb-5 rounded" key={list_1.length - 1}>
                            <CardTitle>{list_1[0].listName}</CardTitle>
                            <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                            <div><Link to={"/MyLists/"+list_1[0]._id}>View List</Link></div>
                        </Card>
                    </div>
                </Row>
            )
        } else {
            return '';
        }
    }
    if(data.length % 2 !== 0){
        list_1.push(data[data.length - 1]);
    }

    return (
        <div>
        <h4 className="componentTitle">My Lists!</h4>
        <Container>
            {lists.map((list, i) => {
                return (
                    <Row key={i}>
                        <div className='col-6' key={i-1}>
                            <Card body className="mb-3 mt-3 shadow p-3 mb-5 rounded" key={i-1}>
                                <CardTitle>{list[0].listName}</CardTitle>
                                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                <div><Link to={"/MyLists/"+list[0]._id}>View List</Link></div>
                            </Card>
                        </div>
                        <div className='col-6' key={i}>
                            <Card body className="mb-3 mt-3 shadow p-3 mb-5 rounded" key={i}>
                                <CardTitle>{list[1].listName}</CardTitle>
                                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                <div><Link to={"/MyLists/"+list[1]._id}>View List</Link></div>
                            </Card>
                        </div>
                    </Row>
                )
            })}
            {rendList_1()}
        </Container>
        </div>
    )

    
}

export default Lists;