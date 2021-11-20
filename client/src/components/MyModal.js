//Modal component
import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import * as displays from './DisplayFunctions.js';


export const MyModal2 = (props) => {

    return (



        <Modal
            show = {props.show}
            showArray={props.showarray}
            showincome = {props.showincome}
            animation = {true}
            size = "md"
        >
            <Modal.Header>
                <h6>Hi {props.firstname.value},
                    this bank uses advanced algorithmic software from DataTwin to check for errors and issues that
                    can affect your application. An unusual pattern was detected.</h6>
                <button
                    type="button"
                    className="close"
                    aria-label="Close"
                    onClick={props.parentAction}
                >
                    <span aria-hidden="true">&times;</span>
                </button>
            </Modal.Header>


            <Modal.Body>
                <p>Please confirm this information</p>


                { props.showarray.dependents ? < displays.Page2_Dependents currentStep={props.currentStep} value = {props.numdependents.value} parseKids = {props.parseKids} /> : ""}
                { props.showarray.income ? < displays.Page2_Income currentStep={props.currentStep} value = {props.rawincome.value} storeIncome = {props.storeIncome}/>: "" }
                { props.showarray.education ? < displays.Page2_Education currentStep={props.currentStep} value = {props.education.value}  handleChange = {props.handleChange2} /> : "" }
                { props.showarray.okeedokee ? < displays.okeedokee />: "" }

            </Modal.Body>


            <Modal.Footer>
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={props.parentAction}
                >
                    Confirm
                </button>

                {/*
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={props.parentAction}
                >
                    Save changes
                </button>

                */}
            </Modal.Footer>
        </Modal>
    )
}


export default MyModal2;