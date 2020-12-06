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
                <Button onClick={props.onClick} key={props.index} label={props.index} variant="outline-info" block>Add a
                    rule</Button>
            </Col>
        </Row>
    )
}

const InputString = (props) => {
    return (
        <InputGroup className="mb-3">
            <FormControl
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                onKeyPress={event => {
                    if (event.key === "Enter") {
                        props.onClick();
                    }
                }}
            />
            <InputGroup.Append>
                <Button variant="outline-success" key={"evaluate"} onClick={props.onClick}>Evaluate</Button>
            </InputGroup.Append>
        </InputGroup>
    )
}

const Rule = (props) => {
    const [key, setKey] = useState('')
    const [value, setValue] = useState('')

    useEffect(() => {
        props.onChange({[props.index]: [key, value]})
    })

    return (
        <InputGroup className="mb-3">
            <FormControl
                placeholder={props.index}
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                onChange={event => {
                    setKey(event.target.value)
                }}
            />
            <FormControl
                placeholder="Value"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                onChange={event => {
                    setValue(event.target.value)
                }}
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
        props.onDeleteRule(index)
    }

    return (
        <Card>
            <Card.Body>
                <InputString onClick={() => console.log('evaluate clicked')}/>
                <NewRuleButton onClick={incrementAmount}/>
            </Card.Body>
            <Card.Body>
                {list.map((index) => (
                    <Rule key={index} index={index} onChange={props.onChange} onClick={(e) => deleteRule(index)}/>
                ))}
            </Card.Body>
        </Card>
    )
}

const Markov = () => {
    let ruleBook = {}

    const printRuleBook = () => {
        console.log('Rule book:')
        console.log(ruleBook)
    }

    const onDeleteRule = (index) => {
        delete ruleBook[index]
    }

    const handleChange = (ruleDefinition) => {
        ruleBook = {...ruleBook, ...ruleDefinition}
    }

    return (
        <Container>
            <button onClick={printRuleBook}>Print ruleBook</button>
            <Row>
                <Col>
                    <Rules amount={3} onChange={handleChange} onDeleteRule={onDeleteRule}/>
                </Col>
                <Col>
                    <Card>
                        <Card.Body>This is some text within a card body.</Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

const App = () => (
    <Container className="p-3">
        <Markov />
    </Container>
);

export default App;
