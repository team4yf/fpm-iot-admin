import React, { useState, useEffect } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faPlus, faSync } from '@fortawesome/free-solid-svg-icons'
import { 
    Row, Col,
    InputGroup, FormControl, Form, ButtonGroup,
    Spinner,
    Pagination, Breadcrumb, Button, Container, Table } from 'react-bootstrap';

function Project(){
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {   
        fetch("/biz/common/findAndCount?table=fim_project")
        .then(response => {
            if (response.ok) return response.json();
            
            throw response;
        })
        .then(json => {
            console.log(json)
            if (json.errno === 0){
                setList(json.data.rows)
                return
            }
            throw json.message
        })
        .catch(err => {
            console.error(err);
            setError(err);
        })
        .finally(() => {
            setLoading(false);
        });
        // if (rsp.status == 200){
        //     setList()
        // }
    },[]);

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
                    <td colSpan="8"><center><Spinner animation="grow" variant="info" /></center></td>
                </tr>
                {
                    list.map((item) => {
                        return  (
                        <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.code}</td>
                        <td>{item.project_id}</td>
                        <td>{item.app_id}</td>
                        <td><a href={item.entry_url} target="_blank">{item.entry_url}</a></td>
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