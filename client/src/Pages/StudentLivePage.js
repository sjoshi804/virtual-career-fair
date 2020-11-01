import React from "react";
import {Card, CardDeck} from "react-bootstrap";

export default class StudentLivePage extends React.Component {
    handleRoute = route => () => {
        this.props.history.push({ pathname: route });
        };
  render() {
    return (
      <div style={{ "text-align": "center", "margin": "20px 20px" }}>
        <CardDeck>
        <Card>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
            <Card.Title>Google</Card.Title>
            <Card.Text>
                1
                <br></br>
                2
                <br></br>
                3
                <br></br>
                4
                <br></br>
                5
                <br></br>
                6
                <br></br>
            </Card.Text>
            </Card.Body>
            <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
        </Card>
        <Card>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
            <Card.Title>Microsoft</Card.Title>
            <Card.Text>
                1
                <br></br>
                2
                <br></br>
                3
                <br></br>
                4
                <br></br>
                5
                <br></br>
                6
                <br></br>
            </Card.Text>
            </Card.Body>
            <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
        </Card>
        <Card>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
            <Card.Title>Facebook</Card.Title>
            <Card.Text>
                1
                <br></br>
                2
                <br></br>
                3
                <br></br>
                4
                <br></br>
                5
                <br></br>
                6
                <br></br>
            </Card.Text>
            </Card.Body>
            <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
        </Card>
        </CardDeck>
        <br></br>
        <CardDeck>
        <Card>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
            <Card.Title>Apple</Card.Title>
            <Card.Text>
                1
                <br></br>
                2
                <br></br>
                3
                <br></br>
                4
                <br></br>
                5
                <br></br>
                6
                <br></br>
            </Card.Text>
            </Card.Body>
            <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
        </Card>
        <Card>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
            <Card.Title>Tesla</Card.Title>
            <Card.Text>
                1
                <br></br>
                2
                <br></br>
                3
                <br></br>
                4
                <br></br>
                5
                <br></br>
                6
                <br></br>
            </Card.Text>
            </Card.Body>
            <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
        </Card>
        <Card>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
            <Card.Title>Snapchat</Card.Title>
            <Card.Text>
                1
                <br></br>
                2
                <br></br>
                3
                <br></br>
                4
                <br></br>
                5
                <br></br>
                6
                <br></br>
            </Card.Text>
            </Card.Body>
            <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
        </Card>
        </CardDeck>
        <br></br>
        <CardDeck>
        <Card>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
            <Card.Title>Qualcomm</Card.Title>
            <Card.Text>
                1
                <br></br>
                2
                <br></br>
                3
                <br></br>
                4
                <br></br>
                5
                <br></br>
                6
                <br></br>
            </Card.Text>
            </Card.Body>
            <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
        </Card>
        <Card>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
            <Card.Title>PayPal</Card.Title>
            <Card.Text>
                1
                <br></br>
                2
                <br></br>
                3
                <br></br>
                4
                <br></br>
                5
                <br></br>
                6
                <br></br>
            </Card.Text>
            </Card.Body>
            <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
        </Card>
        <Card>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
            <Card.Title>Netflix</Card.Title>
            <Card.Text>
                1
                <br></br>
                2
                <br></br>
                3
                <br></br>
                4
                <br></br>
                5
                <br></br>
                6
                <br></br>
            </Card.Text>
            </Card.Body>
            <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
        </Card>
        </CardDeck>
      </div>
    );
  }
}
