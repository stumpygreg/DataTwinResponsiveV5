//Modal component
import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';



class ModalClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {show: props.show}
    };


    render() {

        return (
            <Modal
                show={this.props.show}
                animation={true}
                size="md"
            >
                <Modal.Header>
                    <h3>This is modal header</h3>
                    <button
                        type="button"
                        className="close"
                        aria-label="Close"
                        onClick={this.props.parentAction}
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <p>This is modal body</p>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={this.props.parentAction}
                    >
                        Close
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={this.props.parentAction}
                    >
                        Save changes
                    </button>
                </Modal.Footer>
            </Modal>
        );
    }

}

export default ModalClass;