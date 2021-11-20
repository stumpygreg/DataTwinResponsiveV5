//Modal component
import React, { } from 'react';
import {Button, FormGroup, Modal} from 'react-bootstrap';
import { Col, Row, Form } from "react-bootstrap";
//import Autosuggest, { ItemAdapter } from 'react-bootstrap-autosuggest'
import '../App.css';

//import Select from 'react-select';
//import Popover from 'react-bootstrap/Popover'
let classnames = require('classnames');



export const formfieldResponseModal = (props) => {
    //onClick={() => { props.showPopover("ssnmodalshow",false) }} // how to pass a function!


    console.log("In the modal " + props.headertext);
    return(

        <Modal
            show={props.show}
            dialogClassName={props.width}
        >
            <Modal.Header >
                <Row className = "testrow"
                >

                    <Col md={12}><h4 >{props.headertext}</h4></Col>

                </Row>
                <button

                    name="ssnwronglength"
                    type="button"
                    className="close"
                    aria-label="Close"
                    onClick={props.closeModals}>

                    <span aria-hidden="true">&times;</span>
                </button>
            </Modal.Header>
            <Modal.Body>
                <b>{props.bodytext} </b>
            </Modal.Body>
        </Modal>

    )
}

export const Breadcrumb = (props) => {

    //console.log("In Breadcrumb" + props.breadcrumbImage);

    return (

        <Form.Group as={Row} controlId="" className = "breadcrumb  ">
            <Col >
                <img src={props.breadcrumbImage} class = "img-fluid"/>
            </Col>
        </Form.Group>
    )
}

export const Page_Header = (props) => {

    // save of first Col
    //<Col className = "lheaderwarning text-center">
    //Please follow finstructions and format carefully!
    // </Col>

    return(

        <Form.Group as={Row} controlId="Header" className="headerborder  mb-3" >

            <Col className = "lheader text-center">
                {props.pageName}
            </Col>

            <Col  className = "d-none  d-lg-block lheadertemp text-center ">
                Navigation Choices
            </Col>


        </Form.Group>
    )

}

///############################ color control functions //####################
// NOTE THE SPECIFIC USES
//

function firstinput(props) {   // for use with text entry boxes
    let firstinputControl = "validname  border border-dark ";
    let firstlabelname = "l1 pr-0 ";

    if (props.firsttouched && !props.firstvalid) {
        firstinputControl = 'validname invalidname border border-dark ';
        firstlabelname = 'l1 l1invalid pr-0   ';
    }

    if (props.firsttouched && props.firstvalid) {
        firstinputControl = 'validname border border-dark ';
        firstlabelname = 'l1 l1valid pr-0   ';
    }
    return {firstinputControl, firstlabelname};
}

function lastinput(props) {  // for use with text entry boxes
    let lastinputControl = "validname border border-dark ";
    let lastlabelname = "l1  ";

    if (props.lasttouched && !props.lastvalid) {
        lastinputControl = 'validname invalidname border border-dark ';
        lastlabelname = 'l1 l1invalid formgroup ';
    }

    if (props.lasttouched && props.lastvalid) {
        lastinputControl = 'validname border border-dark ';
        lastlabelname = 'l1 l1valid formgroup ';
    }
    return {lastinputControl, lastlabelname};
}

//###################################################################

export const Page1_Name = (props) => {
// updated with the red and green change on valid / invalid
    // add top of form that will have navigation and such

    if (props.currentStep !== 1) {
        return null
    }

    //console.log("firstname " + props.firsttouched);
    //console.log("firstname " + props.firstvalid);

    let {firstinputControl, firstlabelname} = firstinput(props);

    let {lastinputControl, lastlabelname} = lastinput(props);


    return (

        <Form.Group  as={Row} controlId="Page1_Name"  fluid className = " align-items-center">


                < Form.Label   className={firstlabelname  }>
                    Name:
                </Form.Label>

            <Col lg = {4} xs = {10} sm = {8} md = {8} className = " formgroup">
                <Form.Control

                    style={{ fontSize: 12  }}
                    type="text"
                    /*size="sm"*/
                    placeholder={props.firstplaceholder}
                    className={firstinputControl}
                    name="firstname"
                    value={props.firstvalue} // makes this a controlled component
                    onChange={props.myonChange} // dont want confusion between built in on change
                    onBlur = {props.onBlur}
                    onFocus = {props.onFocus}

                />
            </Col>

                    < Form.Label  className={lastlabelname}>
                        Last Name:
                     </Form.Label>

                    <Col className = " formgroup" >
                    <Form.Control
                        style={{ fontSize: 12   }}
                        type="text"
                        placeholder={props.lastplaceholder}
                        className={lastinputControl}
                        name="lastname"
                        value={props.lastvalue} // makes this a controlled component
                        onChange={props.myonChange}
                        onBlur = {props.onBlur}
                        onFocus = {props.onFocus}
                    />

                    </Col>

        </Form.Group>

    )
}

export const Page1_SpouseName = (props) => {

    if (props.currentStep !== 1) {
        return null
    }

    let {firstinputControl, firstlabelname} = firstinput(props);

    let {lastinputControl, lastlabelname} = lastinput(props);

    return(

        <Form.Group  as={Row} controlId="Page1_SpouseName" className = "formgroup">


            <Form.Label  className={firstlabelname}>
                Spouse First Name:
            </Form.Label>

            <Col>
                <Form.Control
                    type="text"
                    placeholder={props.firstplaceholder}
                    className={firstinputControl}
                    name="spouse_firstname"
                    value={props.firstvalue} // makes this a controlled component
                    onChange={props.myonChange}
                    onBlur = {props.onBlur}
                    onFocus = {props.onFocus}
                />
            </Col>


            <Form.Label className={lastlabelname}>
                Spouse Last Name:
            </Form.Label>


            <Col >
                <Form.Control
                    placeholder={props.lastplaceholder}
                    name = "spouse_lastname"
                    type="text"
                    className={lastinputControl}
                    value={props.lastvalue} // makes this a controlled component
                    onChange={props.myonChange}
                    onBlur = {props.onBlur}
                    onFocus = {props.onFocus}
                />
            </Col>

        </Form.Group>

    )
}




//######################################################################################
export const Page1_StreetCity = (props) => {

    if (props.currentStep !== 1) {
        return null
    }

    // first input, last input are functions that control the color of border
    // look above
    let {firstinputControl, firstlabelname} = firstinput(props);

    let {lastinputControl, lastlabelname} = lastinput(props);

    return(
        <Form.Group  as={Row} controlId="Page1_CityStreet" fluid className = " align-items-center" >

            <Form.Label className={firstlabelname}>
                Street:
            </Form.Label>

            <Col  lg = {6} xs = {10} sm = {9} md = {8} className = " formgroup" >
                <Form.Control
                    style={{ fontSize: 12  }}
                    type="text"
                    placeholder={props.firstplaceholder}
                    className={firstinputControl}
                    name="street"
                    value={props.firstvalue} // makes this a controlled component
                    onChange={props.onChange}
                    onBlur = {props.firstonBlur}
                    onFocus = {props.onFocus}
                />
            </Col>
            <Form.Label className={lastlabelname}>
                City:
            </Form.Label>
            <Col className = " formgroup" >
                <Form.Control
                    style={{ fontSize: 12  }}
                    placeholder={props.lastplaceholder}
                    name = "city"
                    type="text"
                    className={lastinputControl}
                    value={props.lastvalue} // makes this a controlled component
                    onChange={props.onChange}
                    onBlur = {props.lastonBlur}
                    onFocus = {props.onFocus}
                />
            </Col>

        </Form.Group>

    )
}

//###########################################################################################


export const Page1_StateZip = (props) => {
    if (props.currentStep !== 1) {
        return null
    }

    // todo understand why this section is different from the others
    // think its because this uses a pull down selection box

    let firstinputControl = "validname border border-dark";
    let firstlabelname = "l1 ";

    if (props.firsttouched && !props.firstvalid && props.firstvalue) {

        //console.log(" in props.firsttouched && !props.firstvalid");
        firstinputControl = 'validname invalidname border border-dark';
        firstlabelname = 'l1 l1invalid ';
    }

    if (props.firsttouched && props.firstvalid) {
        //console.log(" in props.firsttouched && props.firstvalid");
        firstinputControl = 'validname border border-dark';
        firstlabelname = 'l1 l1valid ';
    }


    if (props.firsttouched && !props.firstvalid && !props.firstvalue) {
        //console.log(" in props.firsttouched && !props.firstvalid && !firstvlaue");
        firstinputControl = 'validname invalidname placeholder border border-dark';
        firstlabelname = 'l1 l1invalid ';
    }

    if (!props.firsttouched && !props.firstvalid && !props.firstvalue) {
        // console.log(" in !props.firsttouched && !props.firstvalid && !firstvalue");
        firstinputControl = 'placeholder border border-dark';
        firstlabelname = 'l1 ';
    }



    let lastinputControl = "validname border border-dark";
    let lastlabelname = "l1 ";

    if (props.lasttouched && !props.lastvalid) {
        lastinputControl = 'validname invalidname border border-dark';
        lastlabelname = 'l1 l1invalid ';
    }

    if (props.lasttouched && props.lastvalid) {
        lastinputControl = 'validname border border-dark';
        lastlabelname = 'l1 l1valid ';
    }

    // from https://www.derpturkey.com/select-placeholder-with-react/
    //let selectclassname = classnames({'placeholder': !props.firstvalue});


    return (

        <Form.Group as={Row} controlId="Page1_StateZip"  className = " align-items-center">
            <Form.Label  className={firstlabelname}>
                State:
            </Form.Label>

            <Col lg = {2} xs = {10} sm = {9} md = {8} className = "formgroup">

                <Form.Control
                    style={{ fontSize: 12  }}
                    as =  "select"
                    type="text"
                    placeholder={props.firstplaceholder}
                    className={firstinputControl}
                    name="state"
                    value={props.firstvalue} // makes this a controlled component
                    onChange={props.onChange}
                    onBlur = {props.firstonBlur}
                    onFocus = {props.onFocus}

                >

                    <option value="">Select State</option>
                    <option value="AK">Alaska</option>
                    <option value="AL">Alabama</option>
                    <option value="AR">Arkansas</option>
                    <option value="AZ">Arizona</option>s
                    <option value="CA">California</option>
                    <option value="CO">Colorado</option>
                    <option value="CT">Connecticut</option>
                    <option value="DC">District of Columbia</option>
                    <option value="DE">Delaware</option>
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                    <option value="HI">Hawaii</option>
                    <option value="IA">Iowa</option>
                    <option value="ID">Idaho</option>
                    <option value="IL">Illinois</option>
                    <option value="IN">Indiana</option>
                    <option value="KS">Kansas</option>
                    <option value="KY">Kentucky</option>
                    <option value="LA">Louisiana</option>
                    <option value="MA">Massachusetts</option>
                    <option value="MD">Maryland</option>
                    <option value="ME">Maine</option>
                    <option value="MI">Michigan</option>
                    <option value="MN">Minnesota</option>
                    <option value="MO">Missouri</option>
                    <option value="MS">Mississippi</option>
                    <option value="MT">Montana</option>
                    <option value="NC">North Carolina</option>
                    <option value="ND">North Dakota</option>
                    <option value="NE">Nebraska</option>
                    <option value="NH">New Hampshire</option>
                    <option value="NJ">New Jersey</option>
                    <option value="NM">New Mexico</option>
                    <option value="NV">Nevada</option>
                    <option value="NY">New York</option>
                    <option value="OH">Ohio</option>
                    <option value="OK">Oklahoma</option>
                    <option value="OR">Oregon</option>
                    <option value="PA">Pennsylvania</option>
                    <option value="PR">Puerto Rico</option>
                    <option value="RI">Rhode Island</option>
                    <option value="SC">South Carolina</option>
                    <option value="SD">South Dakota</option>
                    <option value="TN">Tennessee</option>
                    <option value="TX">Texas</option>
                    <option value="UT">Utah</option>
                    <option value="VA">Virginia</option>
                    <option value="VT">Vermont</option>
                    <option value="WA">Washington</option>
                    <option value="WI">Wisconsin</option>
                    <option value="WV">West Virginia</option>
                    <option value="WY">Wyoming</option>
                </Form.Control>

            </Col>

            <Form.Label  className={lastlabelname}>
                Zip:
            </Form.Label>

            <Col className = " formgroup">
                <Form.Control
                    style={{ fontSize: 12  }}
                    placeholder={props.lastplaceholder}
                    name = "zip"
                    type="text"
                    className={lastinputControl}
                    value={props.lastvalue} // makes this a controlled component
                    onChange={props.onChange}
                    onBlur = {props.lastonBlur}
                    onFocus = {props.onFocus}
                />
            </Col>

        </Form.Group>
    )
}


export const Page1_AgeSsn = (props) => {
    if (props.currentStep !== 1) {
        return null
    }

    let {firstinputControl, firstlabelname} = firstinput(props);

    let {lastinputControl, lastlabelname} = lastinput(props);

    return(

        <Form.Group  as={Row} controlId="Page1_AgeSsn"  className = " align-items-center">

            <Form.Label  className={firstlabelname}>
                Age:
            </Form.Label>
            <Col  lg = {2} xs = {10} sm = {9} md = {8} className = "formgroup">
                <Form.Control
                    style={{ fontSize: 12  }}
                    type="text"
                    placeholder={props.firstplaceholder}
                    className={firstinputControl}
                    name="age"
                    value={props.firstvalue} // makes this a controlled component
                    onChange={props.firstonChange}
                    onBlur = {props.firstonBlur}
                    onFocus = {props.onFocus}
                />
            </Col>


            <Form.Label  className={lastlabelname}>
                Social Security Number:
            </Form.Label>
            <Col xs = {5} className = " formgroup">
                <Form.Control
                    style={{ fontSize: 12  }}
                    type="text"
                    placeholder={props.lastplaceholder}
                    className={lastinputControl}
                    name="socialsecuritynumber"
                    value={props.lastvalue} // makes this a controlled component
                    onChange={props.lastonChange}
                    onBlur = {props.lastonBlur}
                    onFocus = {props.onFocus}
                />
            </Col>

        </Form.Group>

    )

}

export const Page1_SpouseAgeSsn = (props) => {
    if (props.currentStep !== 1) {
        return null
    }

    let {firstinputControl, firstlabelname} = firstinput(props);

    let {lastinputControl, lastlabelname} = lastinput(props);

    return(

        <Form.Group  as={Row} controlId="Page1_SpouseAgeSsn" className = " align-items-center">

            <Form.Label  className={firstlabelname}>
                Spouse Age:
            </Form.Label>
            <Col  lg = {2} xs = {10} sm = {9} md = {8} className = "formgroup">
                <Form.Control
                    style={{ fontSize: 12  }}
                    type="text"
                    placeholder={props.firstplaceholder}
                    className={firstinputControl}
                    name="spouse_age"
                    value={props.firstvalue} // makes this a controlled component
                    onChange={props.firstonChange}
                    onBlur = {props.firstonBlur}
                    onFocus = {props.onFocus}
                />
            </Col>

            <Form.Label  className={lastlabelname}>
                Spouse Social Security Number:
            </Form.Label>
            <Col className = "formgroup">
                <Form.Control
                    style={{ fontSize: 12  }}
                    type="text"
                    placeholder={props.lastplaceholder}
                    className={lastinputControl}
                    name="spouse_ssn"
                    value={props.lastvalue} // makes this a controlled component
                    onChange={props.lastonChange}
                    onBlur = {props.lastonBlur}
                    onFocus = {props.onFocus}
                />
            </Col>

        </Form.Group>

    )

}

export const Page1_PhoneEmail = (props) => {

    if (props.currentStep !== 1) {
        return null
    }

    let {firstinputControl, firstlabelname} = firstinput(props);

    let {lastinputControl, lastlabelname} = lastinput(props);

    return(

        <Form.Group  as={Row} controlId="Page1_PhoneEmail" className = " align-items-center">

            <Form.Label  className={firstlabelname}>
                Phone Number:
            </Form.Label>
            <Col  lg = {2} xs = {7} sm = {7} md = {8} className = "formgroup ">
                <Form.Control
                    style={{ fontSize: 12  }}
                    type="text"
                    placeholder={props.firstplaceholder}
                    className={firstinputControl}
                    name="phone"
                    value={props.firstvalue} // makes this a controlled component
                    onChange={props.firstonChange}
                    onBlur = {props.firstonBlur}
                    onFocus = {props.onFocus}
                />
            </Col>

            <Form.Label  className={lastlabelname}>
                Email Address:
            </Form.Label>
            <Col className = " formgroup">
                <Form.Control
                    style={{ fontSize: 12  }}
                    type="text"
                    placeholder={props.lastplaceholder}
                    className={lastinputControl}
                    name="email"
                    value={props.lastvalue} // makes this a controlled component
                    onChange={props.lastonChange}
                    onBlur = {props.lastonBlur}
                    onFocus = {props.onFocus}
                />
            </Col>

        </Form.Group>

    )

}

export const Page1_MaritalStatus = (props) => {

    if (props.currentStep !== 1) {
        return null
    }

    //console.log("marital " + props.firsttouched);
    //console.log("marital " + props.firstvalid);


    let inputControl = "radiovalidname";
    let labelname = "l1 verticalalign";


    if (props.firsttouched && !props.firstvalid) {
        inputControl = 'radiovalidname invalidname';
        labelname = 'l1 l1invalid verticalalign'

    }

    if (props.firsttouched && props.firstvalid) {
        inputControl = 'radiovalidname';
        labelname = 'l1 l1valid verticalalign'

    }



    return(

        <Form.Group as = {Row} controlId="formMortgagePersonalInfoMaritalStatus" className = "formgroup align-items-center">

            <Form.Label  className={labelname}>Marital Status</Form.Label>
            <Col>

                {['radio'].map((type) => (
                    <div key={`inline-${type}`} className={inputControl}>
                        <Form.Check inline
                                    label = "Single"
                                    value="Single"
                                    name = "maritalstatus"
                                    type={type}
                                    id={`inline-MaritalStatus-1`}
                                    onChange ={props.hideSpouse}
                                    checked = {props.value === "Single"}

                        />
                        <Form.Check inline
                                    label = "Married"
                                    value="Married"
                                    name = "maritalstatus"
                                    type={type}
                                    id={`inline-MaritalStatus-2`}
                                    onChange ={props.showSpouse}
                                    checked = {props.value === "Married"}

                        />

                        <Form.Check inline
                                    label = "Divorced"
                                    value="Divorced"
                                    name = "maritalstatus"
                                    type={type}
                                    id={`inline-MaritalStatus-3`}
                                    onChange ={props.hideSpouse}
                                    checked = {props.value === "Divorced"}
                        />

                    </div>
                ))}
            </Col>

        </Form.Group>

    )
}

export const Page2_Income = (props) => {

    if (props.currentStep !== 2) {
        return null
    }

    //console.log("income " + props.firsttouched);
    //console.log("income " + props.firstvalid);

    let {firstinputControl, firstlabelname} = firstinput(props);

    return(
        <Form.Group as = {Row} controlId="formMortgagePersonalInfoIncome" className = " align-items-center">
            <Form.Label className={firstlabelname} >Gross Income $</Form.Label>
            <Col>
                <Form.Control
                    type = "text"
                    placeholder={props.placeholder}
                    value = {props.value}
                    onChange = {props.storeIncome}
                    className={firstinputControl}
                    name="rawincome"
                    onBlur = {props.firstonBlur}
                    onFocus = {props.onFocus}

                />
            </Col>
        </Form.Group>

    )

}


export const Page2_Education = (props) => {

    if (props.currentStep !== 2) {
        return null
    }

    let inputControl = "radiovalidname";
    let firstlabelname = "l1 verticalalign";


    if (props.firsttouched && !props.firstvalid) {
        inputControl = 'radiovalidname invalidname';
        firstlabelname = 'l1 l1invalid verticalalign'

    }

    if (props.firsttouched && props.firstvalid) {
        inputControl = 'radiovalidname';
        firstlabelname = 'l1 l1valid verticalalign'

    }



    return(
        <Form.Group as = {Row}  controlId="formMortgagePersonalInfoEducation" className = " align-items-center" >


            <Form.Label className={firstlabelname}>Length of Education:</Form.Label>

            <Col>

                {['radio'].map((type) => (
                    <div key={`inline-${type}`} className={inputControl}>
                        <Form.Check inline
                                    label = "HighSchool"
                                    value="21"
                                    name = "education"
                                    type={type}
                                    id={`inline-Education-1`}
                                    onChange ={props.handleChange}
                                    checked = {props.value === "21"}
                        />
                        <Form.Check inline
                                    label = "Associate"
                                    value="22"
                                    name = "education"
                                    type={type}
                                    id={`inline-Education-2`}
                                    onChange ={props.handleChange}
                                    checked = {props.value === "22"}
                        />

                        <Form.Check inline
                                    label = "Bachelors"
                                    value="23"
                                    name = "education"
                                    type={type}
                                    id={`inline-Education-3`}
                                    onChange ={props.handleChange}
                                    checked = {props.value === "23"}
                        />
                        <Form.Check inline
                                    label = "Graduate"
                                    value="24"
                                    name = "education"
                                    type={type}
                                    id={`inline-Education-4`}
                                    onChange ={props.handleChange}
                                    checked = {props.value === "24"}
                        />

                    </div>


                ))}

            </Col>

        </Form.Group>

    )

}








export const Page2_Dependents = (props) => {

   if (props.currentStep !== 2) {
        return null
    }

    //console.log("in dependents display" + props.value)

    let inputControl = "radiovalidname";
    let labelname = "l1 ";


    if (props.firsttouched && !props.firstvalid) {
        inputControl = 'radiovalidname invalidname';
        labelname = 'l1 l1invalid '

    }

    if (props.firsttouched && props.firstvalid) {
        inputControl = 'radiovalidname';
        labelname = 'l1 l1valid '

    }


    let checkedbuttonnumber = props.value;

    return(

        <Form.Group as = {Row} controlId="formMortgagePersonalInfoNumDependents" className = " align-items-center" >

            <Form.Label className={labelname}>Number of Dependents:</Form.Label>
            <Col>

                {['radio'].map((type) => (
                    <div key={`inline-${type}`} className={inputControl}>
                        <Form.Check inline
                                    label = "0"
                                    value="0"
                                    name = "numdependents"
                                    type={type}
                                    id={`inline-NumDependents-1`}
                                    onChange ={props.parseKids}
                                    defaultChecked = {checkedbuttonnumber === "0"}
                                    checked = {props.value === "0"}



                        />
                        <Form.Check inline
                                    label = "1"
                                    value="1"
                                    name = "numdependents"
                                    type={type}
                                    id={`inline-NumDependents-2`}
                                    onChange ={props.parseKids}
                                    defaultChecked = {checkedbuttonnumber === "1"}
                                    checked = {props.value === "1"}


                        />

                        <Form.Check inline
                                    label = "2"
                                    value="2"
                                    name = "numdependents"
                                    type={type}
                                    id={`inline-NumDependents-3`}
                                    onChange ={props.parseKids}
                                    defaultChecked = {props.value === "2"}
                                    checked = {props.value === "2"}


                        />
                        <Form.Check inline
                                    label = "3"
                                    value="3"
                                    name = "numdependents"
                                    type={type}
                                    id={`inline-NumDependents-4`}
                                    onChange ={props.parseKids}
                                    defaultChecked = {checkedbuttonnumber === "3"}
                                    checked = {props.value === "3"}


                        />
                        <Form.Check inline
                                    label = "4"
                                    value="4"
                                    name = "numdependents"
                                    type={type}
                                    id={`inline-NumDependents-5`}
                                    onChange ={props.parseKids}
                                    defaultChecked = {checkedbuttonnumber === "4"}
                                    checked = {props.value === "4"}


                        />
                        <Form.Check inline
                                    label = "5+"
                                    value="5"
                                    name = "numdependents"
                                    type={type}
                                    id={`inline-NumDependents-6`}
                                    onChange ={props.parseKids}
                                    defaultChecked = {checkedbuttonnumber === "5"}
                                    checked = {props.value === "5"}


                        />

                    </div>
                ))}
            </Col>

        </Form.Group>

    )
}


export const Page2_Residence= (props) => {

    if (props.currentStep !== 2) {
        return null
    }

    let inputControl = "radiovalidname";
    let labelname = "l1";


    if (props.firsttouched && !props.firstvalid) {
        inputControl = 'radiovalidname invalidname';
        labelname = 'l1 l1invalid'

    }

    if (props.firsttouched && props.firstvalid) {
        inputControl = 'radiovalidname';
        labelname = 'l1 l1valid'

    }


    return (

        <Form.Group as = {Row} controlId="formMortgagePersonalInfoResidence" className = " align-items-center" >
            <Form.Label className={labelname}>Residence Type:</Form.Label>
            {['radio'].map((type) => (
                <div key={`inline-${type}`} className={inputControl}>
                    <Form.Check
                        inline
                        label="Owner"
                        type={type}
                        id={`inline-${type}-1`}
                        name = "residence"
                        value = "owner"
                        onChange = {props.handleChange}
                        checked = {props.value === "owner"}
                    />
                    <Form.Check
                        inline
                        label="Tenant"
                        type={type}
                        id={`inline-${type}-2`}
                        name = "residence"
                        value = "tenant"
                        onChange = {props.handleChange}
                        checked = {props.value === "tenant"}
                    />
                    <Form.Check
                        inline
                        label="Living with Relative"
                        type={type}
                        id={`inline-${type}-3`}
                        name = "residence"
                        value = "livewithrelative"
                        onChange = {props.handleChange}
                        checked = {props.value === "livewithrelative"}
                    />
                </div>
            ))}
        </Form.Group>




    )
}



export const applications = (props) => { // not used


    let inputControl = "radaiovalidname";
    let labelname = "l1";


    if (props.firsttouched && !props.firstvalid) {
        inputControl = 'radiovalidname invalidname';
        labelname = 'l1 l1invalid'

    }

    if (props.firsttouched && props.firstvalid) {
        inputControl = 'radiovalidname';
        labelname = 'l1 l1valid'

    }


    return(
        <Form.Group as = {Row}  controlId="formMortgagePersonalInfoApplications" className = "formgroup">


            <Form.Label className={labelname}>Number of Past Applications</Form.Label>

            <Col>

                {['radio'].map((type) => (
                    <div key={`inline-${type}`} className={inputControl}>
                        <Form.Check inline
                                    label = "0"
                                    value="0"
                                    name = "pastapplications"
                                    type={type}
                                    id={`inline-PastApplications-1`}
                                    onChange ={props.handleChange}
                        />
                        <Form.Check inline
                                    label = "1"
                                    value="1"
                                    name = "pastapplications"
                                    type={type}
                                    id={`inline-PastApplications-2`}
                                    onChange ={props.handleChange}
                        />

                        <Form.Check inline
                                    label = "2"
                                    value="2"
                                    name = "pastapplications"
                                    type={type}
                                    id={`inline-PastApplications-3`}
                                    onChange ={props.handleChange}
                        />
                        <Form.Check inline
                                    label = "3+"
                                    value="3"
                                    name = "pastapplications"
                                    type={type}
                                    id={`inline-PastApplications-4`}
                                    onChange ={props.handleChange}
                        />

                    </div>


                ))}

            </Col>

        </Form.Group>

    )

}


export const applicationsdenied = (props) => { // not used

    let inputControl = "radiovalidname";
    let labelname = "l1";


    if (props.firsttouched && !props.firstvalid) {
        inputControl = 'radiovalidname invalidname';
        labelname = 'l1 l1invalid'

    }

    if (props.firsttouched && props.firstvalid) {
        inputControl = 'radiovalidname';
        labelname = 'l1 l1valid'

    }


    return(
        <Form.Group as = {Row}  controlId="formMortgagePersonalInfoApplicationsDenied" className = "formgroup">

            <Form.Label className={labelname}>Number of Past Applications Denied</Form.Label>

            <Col>
                {['radio'].map((type) => (
                    <div key={`inline-${type}`} className={inputControl}>
                        <Form.Check inline
                                    label = "0"
                                    value="0"
                                    name = "pastapplicationsdenied"
                                    type={type}
                                    id={`inline-PastApplicationsDenied-1`}
                                    onChange ={props.handleChange}
                        />
                        <Form.Check inline
                                    label = "1"
                                    value="1"
                                    name = "pastapplicationsdenied"
                                    type={type}
                                    id={`inline-PastApplicationsDenied-2`}
                                    onChange ={props.handleChange}
                        />

                        <Form.Check inline
                                    label = "2"
                                    value="2"
                                    name = "pastapplicationsdenied"
                                    type={type}
                                    id={`inline-PastApplicationsDenied-3`}
                                    onChange ={props.handleChange}
                        />
                        <Form.Check inline
                                    label = "3+"
                                    value="3"
                                    name = "pastapplicationsdenied"
                                    type={type}
                                    id={`inline-PastApplicationsDenied-4`}
                                    onChange ={props.handleChange}
                        />

                    </div>


                ))}

            </Col>

        </Form.Group>

    )
}

export const Page1_bottominfo = (props) => {

    if (props.currentStep !== 1) {
        return null
    }
    return(
        <Form.Text className="text-muted">
            <ul>
                <li>This is the basic information we need to create your account and assign you a customer number.</li>
                <li>It will be encrypted before it is stored.</li>
                <li>We will never share your information without your permission!</li>
            </ul>
        </Form.Text>
    )

}


export const okeedokee = (props) => {
    return(
        <Form.Group  as={Row} controlId="thanksforsubmitting" className = "formgroup">

            <Col>
                Thanks for submitting your application! We are reviewing and validating your information using a battery
                of sophisticated algortihmic tools from DataTwin.  You should receive an email shortly with an account number
                and password.
            </Col>
        </Form.Group>
    )
}


export const basicssnmistake = (props) => {
    return(
        <Form.Group  as={Row} controlId="basicssnmistake" className = "formgroup">

            <Col>
                Your Social Security Number contains exactly 9 numbers with no letters or other characters.  Please check what you have entered.
            </Col>
        </Form.Group>
    )
}