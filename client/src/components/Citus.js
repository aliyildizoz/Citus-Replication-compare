import axios from 'axios';
import React, { Component } from 'react'
import { Alert, Button, Col, Form, Row, Spinner } from 'react-bootstrap'

export default class Citus extends Component {

    state = {
        res: {
            startTime: 0,
            endTime: 0,
            resultTime: 0,
            count: 0
        },
        isFinished: true
    }

    onClickInsert = async () => {
        await this.setState({ ...this.state, isFinished: false });
        await axios.post("http://localhost:5000/api/todos/citus-insert").then((res) => this.setState({ res: res.data })).then(() => this.setState({ ...this.state, isFinished: true })).catch((err) => console.log(err));

    }
    onClickSelect = async () => {
        await this.setState({ ...this.state, isFinished: false });
        await axios.get("http://localhost:5000/api/todos/citus-select").then((res) => this.setState({ res: res.data })).then(() => this.setState({ ...this.state, isFinished: true })).catch((err) => console.log(err));
    }

    render() {
        return (
            <div>
                <Col md={'12'}>
                    <Row>
                        <Col className="mt-5">
                            <Alert.Heading>Citus</Alert.Heading>
                            <p>
                                Total data: <b>{this.props.count < this.state.res.count ? this.state.res.count : this.props.count}</b>
                            </p>
                            <hr />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4} className="mt-3 ">
                            <Row>
                                <Button className="btn-lg btn-success d-inline  rounded-1 mb-3 " disabled={!this.state.isFinished} onClick={this.onClickInsert}>Insert(10000)</Button>
                            </Row>
                            <Row>
                                <Button className="btn-lg btn-warning  rounded-1 mb-3 " disabled={!this.state.isFinished}>Update(10000)</Button>
                            </Row>
                            <Row>
                                <Button className="btn-lg btn-danger  rounded-1 mb-3 " disabled={!this.state.isFinished}>Delete(10000)</Button>
                            </Row>
                            <Row>
                                <Button className="btn-lg btn-dark  rounded-1 mb-3 " disabled={!this.state.isFinished} onClick={this.onClickSelect}>Select({this.props.count < this.state.res.count ? this.state.res.count : this.props.count})</Button>
                            </Row>
                        </Col>
                        <Col className="mt-3">
                            <Alert variant="success">
                                {
                                    this.state.isFinished ? <div><h4>Start time:<b>{this.state.res.startTime} ms</b></h4>
                                        <h4>End time:<b>{this.state.res.startTime} ms</b></h4>

                                        <hr />
                                        <h4>Result time:<b>{this.state.res.resultTime} ms</b></h4>
                                        <i className="mb-0">Number of rows affected: {this.state.res.count} rows</i></div> : <Spinner animation="border" variant="success" />

                                }

                            </Alert>
                        </Col>
                    </Row>
                </Col>
            </div>
        )
    }
}
