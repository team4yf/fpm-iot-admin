import React, { useState, useEffect } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faPlus, faSync } from '@fortawesome/free-solid-svg-icons'

import { postApi } from './utils.js'

import { 
    Row, Col,
    InputGroup, FormControl, Form, ButtonGroup,
    Spinner,
    Modal,
    Pagination, Breadcrumb, Button, Container, Table } from 'react-bootstrap';

import swal from '@sweetalert/with-react';

function Project(){
    const [limit, setLimit] = useState(10);
    const [list, setList] = useState([]);
    const [total, setTotal] = useState(0);
    const [skip, setSkip] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [keyword, setKeyword] = useState('');
    const [error, setError] = useState(null);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    useEffect(() => {   
        refresh()
    },[]);

    function showCreateModel (){
        setShow(true)
    }

    function postCreateForm(){
        setShow(false)
        setError("error")
        swal({
            icon: `error`,
            text: `error`,
            buttons: `ok`,
        })
    }

    function refresh (){
        setList([])
        setLoading(true)
        if ( page <= 1) {
            setSkip(0)
        }else {
            setSkip((page - 1) * limit)
        }
        postApi("/biz/common/findAndCount", {
            table: 'fim_project',
            skip: skip,
            limit: limit,
            condition: !!keyword ?`name like '%${keyword}%' or code like '%${keyword}%'`: ' 1 = 1 ',
        })
        .then(data => {
            console.log(data)
            setList(data.rows)
            setTotal(data.count)
        })
        .catch(err => {
            console.error(err);
            setError(err);
            
        })
        .finally(() => {
            setLoading(false);
        });
    }

    function search() {
        refresh()
    }

    return (
        <>
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
            <Modal.Title>Create Project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Form.Group as={Row} controlId="inputName">
                    <Form.Label column sm="2">
                    Name
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control type="text" placeholder="project name" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="inputCode">
                    <Form.Label column sm="2">
                    Code
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control type="text" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="inputPID">
                    <Form.Label column sm="2">
                    Project ID
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control type="number" placeholder="project id, normally " defaultValue="1"/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="inputAID">
                    <Form.Label column sm="2">
                    App ID
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control type="text" defaultValue="ceaa191a"/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="inputEntryURL">
                    <Form.Label column sm="2">
                    Entry URL
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control type="text" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="inputSetting">
                    <Form.Label column sm="2">
                        Setting 
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control as="textarea" rows="3" defaultValue="{}"/>
                    </Col>
                </Form.Group>
            </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={postCreateForm}>Ok</Button>
            </Modal.Footer>
        </Modal>
        <Container className="mt-3">
            <Breadcrumb bg="light">
                <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                <Breadcrumb.Item active>Project</Breadcrumb.Item>
            </Breadcrumb>
            <Row>
            <Col md={4}>
                <b>Project List</b>
            </Col>   
            <Col md={{ span: 4, offset: 4 }}>
            <Form inline="true" className="mb-3 float-right">
                <InputGroup>
                <FormControl
                placeholder="name, code"
                aria-label="name, code"
                aria-describedby="basic-addon2"
                onChange={(e) => {
                    setKeyword(e.target.value)
                }}
                onKeyPress={(e) => {
                    if (e.charCode === 13) {
                        search()
                        e.preventDefault();
                    }
                }}
                />
                <InputGroup.Append>
                <Button size="sm" variant="outline-secondary" onClick={ search }><FontAwesomeIcon icon={faSearch} /></Button>
                </InputGroup.Append>
                </InputGroup>
            </Form>
            </Col>
            </Row>
            <Row>
            <Col md={8}>
            <ButtonGroup size="">
                <Button variant="light" onClick={ showCreateModel }><FontAwesomeIcon icon={faPlus} /></Button>
                <Button variant="light" onClick={ refresh }><FontAwesomeIcon icon={faSync} /></Button>
            </ButtonGroup>
            </Col>  
            <Col md={{ span: 4 }}>
            <p className="float-right"> 1-{(limit + skip )> total? total: (limit + skip)}/{total} </p>
                <Pagination inline="true" size="sm" className="float-right">
                    <Pagination.First />
                    <Pagination.Prev />
                    <Pagination.Next />
                    <Pagination.Last />
                </Pagination>
            </Col>
            </Row>
            <Table striped bordered hover>
            <thead>
                <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Code</th>
                <th>PID</th>
                <th>App ID</th>
                <th>Entry URL</th>
                <th>CreateAt</th>
                <th>-</th>
                </tr>
            </thead>
            <tbody>
                {
                loading?(
                <tr>
                    <td colSpan="8"><center><Spinner animation="grow" variant="info" /></center></td>
                </tr>):undefined
                }
                {
                    list.map((item) => {
                        return  (
                        <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.code}</td>
                        <td>{item.project_id}</td>
                        <td>{item.app_id}</td>
                        <td>{item.entry_url}</td>
                        <td>{item.created_at}</td>
                        <td>
                            <Button variant="link" size="sm">Detail</Button>
                        </td>
                        </tr>)
                    })
                }
               
               
            </tbody>
            
            </Table>
            
            </Container>
        </>
    )
}
export default Project