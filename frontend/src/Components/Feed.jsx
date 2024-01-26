import React, { useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import "@fontsource/open-sans";
import { IconButton } from '@mui/material';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { Card } from "react-bootstrap";
import { Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import lodash from 'lodash';
import 'react-toastify/dist/ReactToastify.css';
function Feed() {
    const [name, setName] = useState();
    const [orderQuantity, setOrderQuantity] = useState(0);
    const [state, setState] = useState();
    const [city, setCity] = useState();
    const [orderPin, setOrderPin] = useState();
    const [show, setShow] = useState(false);
    const token = window.localStorage.getItem("token");
    const user = window.localStorage.getItem("user");
    const _id = window.localStorage.getItem("_id");
    const [itemType, setItemType] = useState();
    const [itemName, setItemName] = useState();
    const [price, setPrice] = useState();
    const [quantity, setQuantity] = useState();
    var [imageList, setImageList] = useState([]);
    const [item, setItem] = useState("");
    const [order, setOrder] = useState(false);
    function handleOrder() {
        setOrder(true);
    }
    function handleDelete(e) {
        let dataMap = {
            id: e.target.id
        }
        axios(
            {
                url: "https://agri-assist-backend.onrender.com/deleteitem",
                method: 'POST',
                data: dataMap
            }
        )
            .then((response) => {
                console.log(response);
                toast.success('Wohoo 🤩! Item deleted Successfully.', {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            })
            .catch((err) => {
                console.log(err);
                toast.error('Something went wrong😞', {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            })
    }
    useEffect(() => {
        axios({
            url: "https://agri-assist-backend.onrender.com/getitem",
            method: "GET",
        })
            .then((response) => {
                console.log("getitem responses" + response.data.response);
                console.log(response);
                let data = response.data.response;
                let items = [];
                data.reverse().map((item) => {
                    let created_date = new Date(item.createdAt);
                    let user_id = item.createdBy;
                    let item_id = item._id;
                    let createdAt =
                        created_date.getDate() +
                        "/" +
                        created_date.getMonth() +
                        "/" +
                        created_date.getFullYear() +
                        " " +
                        created_date.getHours() +
                        ":" +
                        created_date.getMinutes();

                    items.push(
                        user === 'farmer' ?
                            < Col key={item.itemname} style={{ marginTop: "2%", paddingRight: '40px', paddingBottom: "30px" }} md={3} >
                                <Card style={{ backgroundColor: "#99F3BD", borderRadius: "25px" }} bsPrefix="item-card">
                                    <Card.Img style={{ borderRadius: "25px", width: "100%", height: "100%" }}
                                        variant="top"
                                        // src={`${S3_BUCKET_URL}/${item.itemPictures[0].img}`}
                                        src={`https://drive.google.com/thumbnail?id=${item.itemPictures[0].id}`}
                                    />
                                    <Card.Body bsPrefix="card-body" style={{ alignItems: "center" }}>
                                        <Card.Title
                                            style={{
                                                fontFamily: "'Noto Sans JP', sans-serif",
                                                fontWeight: "1.35rem",
                                                color: "blue",
                                                textAlign: "center"
                                            }}
                                        >
                                            Item :{item.itemname}
                                        </Card.Title>
                                        <Card.Text style={{ textAlign: "center" }}>
                                            Item Type:{item.itemtype}
                                        </Card.Text>
                                        <Card.Text style={{ textAlign: "center" }}>
                                            Price:{item.price}
                                        </Card.Text>
                                        <Card.Text style={{ textAlign: "center" }}>
                                            Available Quantity:{item.availableQuantity}
                                        </Card.Text>
                                        <Card.Text
                                            style={{
                                                fontFamily: "'Noto Sans JP', sans-serif",
                                                fontSize: "1rem",
                                                textAlign: "center"
                                            }}
                                        >
                                            Created at : {createdAt}
                                        </Card.Text>

                                        {
                                            _id === user_id ?
                                                <Button variant="danger" id={item_id} onClick={handleDelete}>Delete Item</Button>
                                                : ""
                                        }
                                    </Card.Body>
                                </Card>
                            </Col >

                            :

                            <Col key={item.itemname} style={{ marginTop: "2%", paddingRight: '40px', paddingBottom: "30px" }} md={3} >
                                <Card style={{ backgroundColor: "#99F3BD", borderRadius: "25px" }} bsPrefix="item-card">
                                    <Card.Img style={{ borderRadius: "25px", width: "100%", height: "100%" }}
                                        variant="top"
                                        // src={`${S3_BUCKET_URL}/${item.itemPictures[0].img}`}
                                        src={`https://drive.google.com/thumbnail?id=${item.itemPictures[0].id}`}
                                    />
                                    <Card.Body bsPrefix="card-body" style={{ alignItems: "center" }}>
                                        <Card.Title
                                            style={{
                                                fontFamily: "'Noto Sans JP', sans-serif",
                                                fontWeight: "1.35rem",
                                                color: "blue",
                                                textAlign: "center"
                                            }}
                                        >
                                            Item :{item.itemname}
                                        </Card.Title>
                                        <Card.Text style={{ textAlign: "center" }}>
                                            Item Type:{item.itemtype}
                                        </Card.Text>
                                        <Card.Text style={{ textAlign: "center" }}>
                                            Price:{item.price}
                                        </Card.Text>
                                        <Card.Text style={{ textAlign: "center" }}>
                                            Available Quantity:{item.availableQuantity}
                                        </Card.Text>
                                        <Card.Text
                                            style={{
                                                fontFamily: "'Noto Sans JP', sans-serif",
                                                fontSize: "1rem",
                                                textAlign: "center"
                                            }}
                                        >
                                            Created at : {createdAt}
                                        </Card.Text>
                                        <Button onClick={handleOrder} style={{ backgroundColor: "#32FF6A", borderColor: "black" }}>Add to cart</Button>
                                    </Card.Body>
                                </Card>
                            </Col >

                    )

                })
                setItem(items);
            })
            .catch((err) => {
                console.log("Error :", err);
            });
    }, []);

    const handleOrderClose = () => {
        setOrder(false);
        if (name && city && orderPin && state && city) {
            toast.success('Wohoo 🤩! your order has been placed Successfully.', {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }
        else {
            toast.error('Something went wrong😞', {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }

    }
    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        if (itemType && itemName && price && quantity) {
            const info = new FormData();
            info.append("ItemName", itemName);
            info.append("ItemType", itemType);
            info.append("Price", price);
            info.append("Quantity", quantity);
            imageList.map((itemImage) => {
                info.append("itemPictures", itemImage, itemImage.name);
            });
            console.log(info);
            axios({
                url: "https://agri-assist-backend.onrender.com/postitem",
                method: "POST",
                data: info,
                headers: {
                    Authorization: token ? `Bearer ${token}` : "",
                },
                onUploadProgress: (ProgressEvent) => {
                    console.log(
                        "Upload progress: " +
                        Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100) +
                        "%"
                    );
                },

            })
                .then((response) => {
                    console.log(response);
                })
                .then(() => {

                    toast.success('Wohoo 🤩! Item listed successfully.', {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                })
                .catch((err) => {
                    console.log(err);
                    toast.error('Oops 😞! Check internet connection or try again later', {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });

                });
        }
        else {
            console.log("lllllll");
            toast.warning('Did you missed any of the required fields 🙄?', {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }
    };
    function handleImage() {
        console.log(imageList);
    }
    return (
        <>
            <Modal backdrop='static' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Item Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Form>
                            <Form.Group >
                                <Row style={{ paddingBottom: '30px' }}>
                                    <Col md={4}>
                                        <Form.Label >Yield Type:</Form.Label>
                                    </Col>
                                    <Col>
                                        <Form.Control type="text" value={itemType} onChange={(e) => { setItemType(e.target.value) }} ></Form.Control>
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Form.Group>
                                <Row style={{ paddingBottom: '30px' }}>
                                    <Col md={4}>
                                        <Form.Label>Yield Name:</Form.Label>
                                    </Col>
                                    <Col>
                                        <Form.Control value={itemName} onChange={(e) => { setItemName(e.target.value) }} type="text"></Form.Control>
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Form.Group>
                                <Row style={{ paddingBottom: '30px' }}>
                                    <Col md={4}>
                                        <Form.Label>Price:</Form.Label>
                                    </Col>
                                    <Col>
                                        <Form.Control value={price} onChange={(e) => { setPrice(e.target.value) }} type='Number'></Form.Control>
                                    </Col>
                                    <Col md={1}>
                                        <small>/KG</small>
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Form.Group>
                                <Row style={{ paddingBottom: '30px' }}>
                                    <Col md={4}>
                                        <Form.Label>Available Stock:</Form.Label>
                                    </Col>
                                    <Col>
                                        <Form.Control value={quantity} onChange={(e) => { setQuantity(e.target.value) }} type='Number'></Form.Control>
                                    </Col>
                                    <Col md={1}>
                                        <small>KGs</small>
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Form.Group>
                                <Row>
                                    <Col md={4}>
                                        <Form.Label>Item Images</Form.Label>
                                    </Col>
                                    <Col>
                                        <Form.Control type='file' onChange={(e) => {
                                            let { files } = e.target;
                                            console.log(files)
                                            lodash.forEach(files, (file) => {
                                                console.log(file);
                                                console.log(typeof (imageList));
                                                imageList.push(file);
                                                setImageList(imageList);
                                            });
                                        }}
                                            multiple />
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Form>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Post Item
                    </Button>

                </Modal.Footer>
            </Modal>
            <Container fluid >
                <Row>{item}
                    {
                        user === 'farmer' ?
                            <Box sx={{ borderRadius: "25px", paddingTop: "50px", bgcolor: '#D2F6C5', m: 3, border: 4, width: '15rem', height: '20rem', borderColor: "black" }}><IconButton onClick={handleShow} sx={{ marginLeft: "30px", borderRadius: "0px", backgroundColor: "transparent" }}><AddIcon sx={{ marginLeft: "10px", marginTop: "40px", marginBottom: "10px", border: 4, textAlign: "center", fontSize: "100px", borderColor: "black", borderStyle: "dashed", borderRadius: "25px" }} /></IconButton>
                                <Typography sx={{ textAlign: "center", fontFamily: "Open Sans", fontWeight: "Bold" }}>
                                    Add New Item
                                </Typography>
                            </Box>
                            : ""
                    }
                </Row>
            </Container>


            <Modal backdrop='static' show={order} onHide={handleOrderClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Order Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Form>
                            <Form.Group >
                                <Row style={{ paddingBottom: '30px' }}>
                                    <Col md={4}>
                                        <Form.Label >Enter Name:</Form.Label>
                                    </Col>
                                    <Col>
                                        <Form.Control type="text" value={name} onChange={(e) => { setName(e.target.value) }} ></Form.Control>
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Form.Group>
                                <Row style={{ paddingBottom: '30px' }}>
                                    <Col md={4}>
                                        <Form.Label>Required Quantity</Form.Label>
                                    </Col>
                                    <Col>
                                        <Form.Control value={orderQuantity} onChange={(e) => { setOrderQuantity(e.target.value) }} type="text"></Form.Control>
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Form.Group>
                                <Row style={{ paddingBottom: '30px' }}>
                                    <Col md={4}>
                                        <Form.Label>Pin Code</Form.Label>
                                    </Col>
                                    <Col>
                                        <Form.Control value={orderPin} onChange={(e) => { setOrderPin(e.target.value) }} type='Number'></Form.Control>
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Form.Group>
                                <Row style={{ paddingBottom: '30px' }}>
                                    <Col md={4}>
                                        <Form.Label>City:</Form.Label>
                                    </Col>
                                    <Col>
                                        <Form.Control value={city} onChange={(e) => { setCity(e.target.value) }} type='text'></Form.Control>
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Form.Group>
                                <Row style={{ paddingBottom: '30px' }}>
                                    <Col md={4}>
                                        <Form.Label>State:</Form.Label>
                                    </Col>
                                    <Col>
                                        <Form.Control value={state} onChange={(e) => { setState(e.target.value) }} type='text'></Form.Control>
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Form>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleOrderClose}>
                        Place Order
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer />
        </>
    );
}
export default Feed;
