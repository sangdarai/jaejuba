import "../../css/FooterView.css"
import { Card, Col, Container, Row } from "react-bootstrap";

export default function FooterView(){
    return(
        <Container id="footer">
            <Card.Body className="text-center" style={{marginTop:"10em"}}>
            <Card.Title style={{ fontSize:"2em", fontWeight:"bold" }}>Footer</Card.Title>
                <Container>
                    <Row>
                        <Col style={{ fontSize:"1em"}}>
                            <Card.Text>이름 : 상상라이프</Card.Text>
                            <Card.Text>문의사항 : 010-1111-2222</Card.Text>
                        </Col>
                        <Col style={{ fontSize:"1em"}}>
                            <Card.Text>네이버 : https://blog.naver.com/lifesang01</Card.Text>
                            <Card.Text>다음 : https://lifesang.tistory.com/</Card.Text>
                        </Col>
                    </Row>
                </Container>
            </Card.Body>
        </Container>

    )
}