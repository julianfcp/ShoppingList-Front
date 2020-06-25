import React, { useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter, Input, Form, FormGroup } from 'reactstrap';
import { withRouter } from 'react-router-dom';

const ModalListName = (props) => {

      // Using Hoooks
      const [modal, setModal] = useState(true);
      const [nameList, setNameList] = useState("");
      // Handle onChange Input name list
      const onChange = (e) => {
        setNameList(e.target.value);
      }
      // Handle toogle cancel 
      const toggle = () => {
          setModal(!modal);
          props.history.push('/'); // redirect to home page (withRouter)
      }
      // Handle when user press Enter
      const handleEnter = (e) => {
        if(e.key === 'Enter') {
          e.preventDefault(); // prevent page to load
          inputName(); // calls input handler
        }
      }


      // Handle send name list to Parent (index CreateList)
      const inputName = () => {
        if(nameList !== "") {
            props.handleListName(nameList);
            setModal(!modal);
        } else {
            setModal(modal);
        }
      }

      return (
        <div>
          <Modal isOpen={modal} toggle={toggle} className="modalNameList">
            <Form>
            <ModalBody>
                <FormGroup>
                  <Input name="nameList" onChange={onChange} onKeyDown={handleEnter} placeholder="List Name"></Input>
                </FormGroup>
                <FormGroup>
                  <Input type="textarea" name="description" placeholder="Description"></Input>
                </FormGroup> 
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={toggle}>Cancel</Button>
                <Button color="primary" onClick={inputName}>Create</Button>
            </ModalFooter>
            </Form>
          </Modal>
        </div>
      );
}
// withRouter allows to redirect when press cancel
export default withRouter(ModalListName);