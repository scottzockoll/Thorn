import React, {useEffect, useState} from 'react';

import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import './App.css';
import Card from 'react-bootstrap/Card';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

const NewRuleButton = (props) => {
    return (
        <Row>
            <Col>
                <Button onClick={props.onClick} key={props.index} label={props.index} variant="outline-info" block>Add a rule</Button>
            </Col>
        </Row>
    )
}

const Rule = (props) => {
    return (
        <InputGroup className="mb-3">
            <FormControl
                placeholder={props.index}
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
            />
            <FormControl
                placeholder="Value"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
            />
            <InputGroup.Append>
                <Button variant="outline-danger" key={props.index} onClick={props.onClick}>Delete</Button>
            </InputGroup.Append>
        </InputGroup>
    )
}

const Rules = (props) => {
    const [amount, setAmount] = useState(props.amount);

    const [list, setList] = useState([...Array(amount).fill().keys()])

    const incrementAmount = () => {
        setAmount(amount + 1)
        setList([...list, list.length ? Math.max(...list) + 1 : 0])
    }

    const deleteRule = (index) => {
        setAmount(amount - 1)
        setList(list.filter((key) => key !== index))
    }

    return (
        <Card>
            <Card.Body>
                <NewRuleButton onClick={incrementAmount}/>
            </Card.Body>
            <Card.Body>
                {list.map((index) => (
                    <Rule key={index} index={index} onClick={(e) => deleteRule(index)}/>
                ))}
            </Card.Body>
        </Card>
    )
}

const App = () => (
    <Container className="p-3">
        <Container>
            <Row>
                <Col>
                    <Rules amount={3}/>
                </Col>
                <Col>
                    <Card>
                        <Card.Body>This is some text within a card body.</Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    </Container>
);

export default App;
