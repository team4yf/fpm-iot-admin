import React from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faPlus, faSync } from '@fortawesome/free-solid-svg-icons'
import { 
    Row, Col,
    InputGroup, FormControl, Form, ButtonGroup,
    Pagination, Breadcrumb, Button, Container, Table } from 'react-bootstrap';

function Project(){
    return (
        <>
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
            <Form inline={true} className="mb-3 float-right">
                <InputGroup>
                <FormControl
                placeholder="name, code, project id"
                aria-label="name, code, project id"
                aria-describedby="basic-addon2"
                />
                <InputGroup.Append>
                <Button size="sm" variant="outline-secondary"><FontAwesomeIcon icon={faSearch} /></Button>
                </InputGroup.Append>
                </InputGroup>
            </Form>
            </Col>
            </Row>
            <Row>
            <Col md={8}>
            <ButtonGroup size="">
                <Button variant="light"><FontAwesomeIcon icon={faPlus} /></Button>
                <Button variant="light"><FontAwesomeIcon icon={faSync} /></Button>
            </ButtonGroup>
            </Col>  
            <Col md={{ span: 4 }}>
                <Pagination inline={true} size="sm" className="float-right">
                    <Pagination.First />
                    <Pagination.Prev />
                    
                    <Pagination.Item variant="light" active>{2}</Pagination.Item>
                    <Pagination.Next />
                    <Pagination.Last />
                </Pagination>
                {/* <p className="float-right"> 1-4/4 </p> */}
            </Col>
            </Row>
            <Table striped bordered hover>
            <thead>
                <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Code</th>
                <th>Project ID</th>
                <th>Entry URL</th>
                <th>Status</th>
                <th>CreateAt</th>
                <th>-</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>1</td>
                <td>智慧路灯管理平台-xuan123</td>
                <td>ceaa191a</td>
                <td>1</td>
                <td>ceaa191a</td>
                <td><a href="http://open.yunplus.io:19501/demo" target="_blank">http://open.yunplus.io:19501/demo</a></td>
                <td>2020-01-01</td>
                <td>
                    <Button variant="link" size="sm">Detail</Button>
                </td>
                </tr>
            </tbody>
            
            </Table>
            
            </Container>
        </>
    )
}
export default Project