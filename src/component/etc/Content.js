import "../../css/Content.css"
import { Container, Col, Card, Row } from "react-bootstrap";
import snagsanglogo from "../../icon/sangsang.png";
import creativity from "../../icon/창의력.png";
import challenge from "../../icon/도전.png";

export default function Content(){
    return (
        <div>

            <Row id="Container_1" xs={1} md={2}>
                <Col> 
                    <Container>
                        <Card.Text style={{ fontSize: "3em", fontWeight: "bold", marginLeft:"50%"}}>생각</Card.Text> 
                        <Card.Text style={{ fontSize: "2em", marginLeft:"50%"}}>끊임없이 생각하라</Card.Text>
                    </Container>
                </Col>
                <Col>
                    <Container>
                        <Card.Img id="cardImage_1" src={snagsanglogo}></Card.Img>
                    </Container>
                </Col>
            </Row >

            <Row id="Container_2" xs={1} md={2}>
                <Col>
                    <Container>
                        <Card.Img id="cardImage_2"  src={creativity}></Card.Img>
                    </Container>
                </Col>
                <Col>  
                    <Container>
                        <Card.Text style={{ fontSize: "3em", fontWeight: "bold", marginLeft:"25%"}}>창의력</Card.Text>
                        <Card.Text style={{ fontSize: "2em",  marginLeft:"25%"}}>나만의 창의력</Card.Text> 
                    </Container>
                </Col>
            </Row>

            <Row id="Container_3" xs={1} md={2}>
                <Col>  
                    <Container>
                        <Card.Text style={{ fontSize: "3em", fontWeight: "bold", marginLeft:"50%"}}>도전</Card.Text> 
                        <Card.Text style={{ fontSize: "2em", marginLeft:"50%"}}>끊임없이 도전하라</Card.Text>
                    </Container>
                </Col>
                <Col>
                    <Container>
                        <Card.Img id="cardImage_3" src={challenge}></Card.Img>
                    </Container>
                </Col>
            </Row>

            
            

        </div>
    )
}