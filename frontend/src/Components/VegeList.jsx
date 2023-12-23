import React from 'react';
import { Table, Dropdown, Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
function VegeList() {
    let [data, setData] = useState([]);
    let [stateInfo, setStateInfo] = useState('telangana');

    function handleClick(e) {
        console.log("hello:" + e.target.value);
        setStateInfo(e.target.value);
    }
    useEffect(() => {
        axios.post('https://agri-assist-backend.onrender.com/get-item', {
            method: 'POST',
            body: { stateInfo }
        }).then((res) => {
            setData(res.data.filter((data) => data.vegetable_names !== ''));
            console.log(res.data);
        })
    }, [stateInfo])
    return (
        <>
            <Dropdown style={{ position: 'absolute', right: '75%' }} >
                <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                    Select State
                </Dropdown.Toggle>
                <Dropdown.Menu >
                    <Dropdown.Item>
                        <Button onClick={handleClick} value="andhraPradesh" variant='light' >Andhra Pradesh</Button>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <Button onClick={handleClick} value="arunachalPradesh" variant='light' >Arunachal Pradesh</Button>
                    </Dropdown.Item>
                    <Dropdown.Item >
                        <Button onClick={handleClick} value="telangana" variant='light' >Telangana</Button>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <Button onClick={handleClick} value="maharashtra" variant='light'>Maharashtra</Button>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Form.Label style={{ position: 'absolute', right: '42%', width: '30%' }} ><b>Current State Value</b></Form.Label>
            <Form.Control
                type='text'
                value={stateInfo}
                style={{ position: 'absolute', right: '40%', width: '20%', fontWeight: 'bold' }}
                readOnly
            />
            <br />
            <br />

            <Table striped bordered hover variant='light'>
                <thead>
                    <tr>
                        <th>Vegetable Names</th>
                        <th>Wholesale Price</th>
                        <th>Retail Price</th>
                        <th>Shopping Mall Price</th>
                        <th>Units</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item) => {
                            return (
                                <tr>
                                    <td>{item.vegetable_names}</td>
                                    <td>{item.wholesale_price}</td>
                                    <td>{item.retail_price}</td>
                                    <td>{item.shoppingmall_price}</td>
                                    <td>{item.units}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </>
    )
}
export default VegeList;