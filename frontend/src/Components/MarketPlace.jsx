import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/esm/Col';
import Card from 'react-bootstrap/Card';
import { Row } from 'react-bootstrap';

function MarketPlace() {
    const [user_info, setuser_info] = useState(
        JSON.parse(localStorage.getItem("user"))
    );
    const ReadMore = ({ children }) => {
        const text = children;
        const [isReadMore, setIsReadMore] = useState(true);
        const toggleReadMore = () => {
            setIsReadMore(!isReadMore);
        };
        return (
            <p style={{ fontSize: "1rem" }} className="text">
                {isReadMore ? text.slice(0, 15) : text}
                <span onClick={toggleReadMore} className="read-or-hide">
                    {isReadMore ? "...." : " show less"}
                </span>
            </p>
        );
    };
    // setConstraint(true);

    const titleStyles = {
        fontFamily: "'Noto Sans JP', sans-serif",
        fontWeight: "600",
        color: "#fff",

        border: "2px solid green",
        padding: "10px 20px",
        borderRadius: "5px",
        display: "inline-block",
        cursor: "pointer",
        backgroundColor: "#4682A9",
        textDecoration: "none",
    };
    const [item, setitem] = useState("");
    const [Found_item, setFound_item] = useState();
    useEffect(() => {
        axios({
            url: "https://agri-assist-backend.onrender.com/getitem",
            method: "GET",
        })
            .then((response) => {
                console.log("getitem responses" + response.data.postitems);

                let data = response.data.postitems;
                let items = [];
                let Found_items = [];
                data.reverse().map((item) => {
                    let created_date = new Date(item.createdAt);

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

                    if (item.type === "Lost" && item.status === true) {
                        console.log("true faizu");
                        console.log("true faizu" + item.itemPictures[0].Img);
                        let user = false;
                        if (item.createdBy === user_info._id) {
                            user = true;
                            console.log("true faizu");
                        }

                        items.push(
                            <a
                                href={`/${item.name}?cid=${item._id}&type=${item.type}/${user}`}
                            >
                                <Col key={item.name} style={{ marginTop: "2%", paddingRight: '40px' }} md={3}>
                                    <Card bsPrefix="item-card">
                                        <Card.Img
                                            variant="top"
                                            // src={`${S3_BUCKET_URL}/${item.itemPictures[0].img}`}
                                            src={`https://drive.google.com/uc?export=view&id=${item.itemPictures[0].id}`}

                                        />
                                        <Card.Body bsPrefix="card-body">
                                            <Card.Title
                                                style={{
                                                    fontFamily: "'Noto Sans JP', sans-serif",
                                                    fontWeight: "1.35rem",
                                                    color: "blue"
                                                }}
                                            >
                                                Item :{item.name}
                                            </Card.Title>

                                            {item.description ? (
                                                <Card.Text
                                                    style={{
                                                        fontFamily: "'Noto Sans JP', sans-serif",
                                                        fontSize: "1rem",
                                                    }}
                                                >
                                                    {" "}
                                                    Description :<ReadMore>{item.description}</ReadMore>
                                                </Card.Text>
                                            ) : (
                                                ""
                                            )}
                                            <Card.Text
                                                style={{
                                                    fontFamily: "'Noto Sans JP', sans-serif",
                                                    fontSize: "1rem",
                                                }}
                                            >
                                                Created at : {createdAt}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </a>
                        );
                    } else {
                        var user1 = false;
                        if (item.createdBy === user_info._id) {
                            user1 = true;
                        }

                        Found_items.push(
                            <a
                                href={`/${item.name}?cid=${item._id}&type=${item.type}/${user1}`}
                            >
                                <Col style={{ marginTop: "20px", paddingRight: '40px' }} md={3}>
                                    <Card bsPrefix="item-card" key={item.name}>
                                        <Card.Img
                                            variant="top"
                                            // src={`${S3_BUCKET_URL}/${item.itemPictures[0].img}`}
                                            src={`https://drive.google.com/uc?export=view&id=${item.itemPictures[0].id}`}

                                        />
                                        <Card.Body bsPrefix="card-body">
                                            <Card.Title
                                                style={{
                                                    fontFamily: "'Noto Sans JP', sans-serif",
                                                    fontWeight: "1.35rem",
                                                    color: "blue"
                                                }}
                                            >
                                                Item :{item.name}
                                            </Card.Title>
                                            {item.description ? (
                                                <Card.Text
                                                    style={{
                                                        fontFamily: "'Noto Sans JP', sans-serif",
                                                        fontSize: "1rem",
                                                    }}
                                                >
                                                    {" "}
                                                    Description :<ReadMore>{item.description}</ReadMore>
                                                </Card.Text>
                                            ) : (
                                                ""
                                            )}
                                            <Card.Text
                                                style={{
                                                    fontFamily: "'Noto Sans JP', sans-serif",
                                                    fontSize: "1rem",
                                                }}
                                            >
                                                Created at : {createdAt}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </a>
                        );
                    }
                });
                setitem(items);
                setFound_item(Found_items);
            })
            .catch((err) => {
                console.log("Error :", err);
            });
    }, []);

    return (
        <div>
            <div>
                <h2
                    style={{
                        fontFamily: "'Noto Sans JP', sans-serif",
                        backgroundColor: "#fff",
                        color: "#000"
                    }}
                >
                    Welcome {user_info.firstname} 👋!
                </h2>
            </div>
            <div style={{ backgroundColor: "#71C9CE" }}>

                <Container fluid style={{ backgroundColor: " '#71C9CE'" }}>
                    <h2 style={{ textAlign: "center", color: "#fff" }}>Lost items :</h2>
                    <div className="title-border"></div>
                    <Row>{item}</Row>
                </Container>
            </div>
            <div style={{ backgroundColor: "#71C9CE" }}>
                <Container fluid>
                    {Found_item ? (
                        <div>
                            <h2 style={{ textAlign: "center", color: "#fff" }}>Found items :</h2>
                            <div className="title-border"></div>
                            <Row >{Found_item}</Row>
                        </div>
                    ) : (
                        ""
                    )}
                </Container>

            </div>

        </div>




    );
}
export default MarketPlace;