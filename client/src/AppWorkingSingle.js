import React, { } from 'react';
import axios from 'axios';
import { Container, Col, Row, Form , Button} from "react-bootstrap";
import update from 'immutability-helper';
import validate from './components/validator.js';


//import ModalClass from "./components/ModalClass";  -- using a class
import MyModal2 from "./components/MyModal"; // using a function

import * as displays from './components/DisplayFunctions.js';  // note the differences from the import validate above

import './App.css';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange2 = this.handleChange2.bind(this);
        this.parseIncome = this.parseIncome.bind(this);
        this.parseKids = this.parseKids.bind(this);
        this.hideSpouse2 = this.hideSpouse2.bind(this);
        this.showSpouse2 = this.showSpouse2.bind(this);
        this.toggle = this.toggle.bind(this);  // added for modal
        this.storeIncome = this.storeIncome.bind(this);
        this.printValue = this.printValue.bind(this);
        this.ssn_PopoverLogic = this.ssn_PopoverLogic.bind(this);
        this.closeModals = this.closeModals.bind(this);

        this.state = {
            showFormMortgagePersonalInfoSpouseName: false,
            hideFormMortgagePersonalInfoSpouseName: true,
            show: false,
            close: false,
            showmodal: false,
            formIsValid: false,
            showssnwrong:false,  //todo this should really be at the component level not here
            showssnwronglength:false,
            showssnblacklist:false,
            showssninuse: false,
            showblankfield:false,
            shownamewrong:false,
            shownamewronglength:false,
            showstreetwrong:false,
            showstreetwronglength:false,
            showcitywrong:false,
            showcitywronglength:false,
            showagewrong: false,
            showzipwrong: false,
            showincomewrong: false,
            showokeedokee: false,
            shownotokeedokee: false,

            // show array holds the true/false response values from the search to control what is shown
            showArray: {
                dependents: '',
                income: '',
                education: '',
            },


            formControls: {
                firstname: {
                    value: '',
                    minlength: 2,
                    maxlength: 31,
                    placeholder: 'First name',
                    valid: false,
                    touched: false,
                    visible: true,
                    validationRules: {
                        minLengthValidator: 2, // names like Jo (is that a real name)
                        requiredValidator: true,
                        lettersOnlyValidator: true,
                        emptyTextFieldValidator: false
                    }
                },
                lastname: {
                    value: '',
                    minlength: 2,
                    maxlength: 31,
                    placeholder: 'Last name',
                    valid: false,
                    touched: false,
                    visible: true,
                    validationRules: {
                        minLengthValidator: 2, // names like Jo (is that a real name)
                        requiredValidator: true,
                        lettersOnlyValidator: true,
                        emptyTextFieldValidator: false
                    }
                },

                spouse_firstname: {
                    value: '',
                    minlength: 2,
                    maxlength: 31,
                    placeholder: 'First name',
                    valid: false,
                    touched: false,
                    visible: 'false',
                    validationRules: {
                        minLengthValidator: 2, // names like Jo (is that a real name)
                        requiredValidator: true,
                        lettersOnlyValidator: true,
                        emptyTextFieldValidator: false
                    }
                },
                spouse_lastname: {
                    value: '',
                    minlength: 2,
                    maxlength: 31,
                    placeholder: 'Last name',
                    valid: false,
                    touched: false,
                    visible: 'false',
                    validationRules: {
                        minLengthValidator: 2, // names like Jo (is that a real name)
                        requiredValidator: true,
                        lettersOnlyValidator: true,
                        emptyTextFieldValidator: false
                    }
                },
                street: {
                    value: '',
                    minlength: 2,
                    placeholder: 'Street',
                    valid: false,
                    touched: false,
                    visible: true,
                    validationRules: {
                        minLengthValidator: 2,
                        requiredValidator: true,
                        //streetValidator: true
                    }
                },
                city: {
                    value: '',
                    minlength: 4,
                    maxlength: 25,
                    placeholder: 'City',
                    valid: false,
                    touched: false,
                    visible: true,
                    validationRules: {
                        minLengthValidator: 4,
                        requiredValidator: true,
                        cityValidator: true,
                        cityLengthValidator: 25
                    }
                },
                state: {
                    value: '',
                    placeholder: 'State',
                    valid: false,
                    touched: false,
                    visible: true,
                    validationRules: {
                        minLengthValidator: 2,
                        requiredValidator: true,
                        lettersOnlyValidator: true,
                        emptyTextFieldValidator: false
                    }
                },
                zip: {
                    value: '',
                    maxlength:9,
                    placeholder: 'Zip',
                    valid: false,
                    touched: false,
                    visible: true,
                    validationRules: {
                        minLengthValidator: 5,
                        requiredValidator: true,
                        emptyTextFieldValidator: false,
                        zipValidator: true
                    }
                },
                age: {
                    value: '',
                    minlength: 1,
                    maxlength: 3,
                    placeholder: '42',
                    valid: false,
                    touched: false,
                    visible: true,
                    validationRules: {
                        requiredValidator: true,
                        emptyTextFieldValidator: false,
                        ageValidator: true
                    }
                },
                socialsecuritynumber: {
                    value: '',
                    minlength: 9,
                    placeholder: '111223333',
                    valid: false,
                    touched: false,
                    visible: true,
                    validationRules: {
                        requiredValidator: true,
                        basicSSNValidator : true,
                        emptyTextFieldValidator: false
                    }
                },
                maritalstatus: {
                    value: '',
                    valid: false,
                    touched: false,
                    visible: true,
                    validationRules: {
                        requiredValidator: true,
                    }
                },
                numdependents: {
                    value: '',
                    valid: false,
                    touched: false,
                    visible: true,
                    validationRules: {
                        requiredValidator: true,
                    }
                },
                income: {
                    value: '',
                    placeholder: '40000',
                    valid: false,
                    touched: false,
                    visible: true,
                    validationRules: {
                        requiredValidator: true,

                    }
                },
                rawincome: {
                    value: '',
                    valid: false,
                    touched: false,
                    visible: true,
                    validationRules: {
                        requiredValidator: true,
                        emptyTextFieldValidator: false,
                        numbersOnlyValidator: true
                    }
                },
                pastapplications: {
                    value: '',
                    valid: false,
                    touched: false,
                    visible: true,
                    validationRules: {
                        requiredValidator: true,
                    }
                },
                pastapplicationsdenied: {
                    value: '',
                    valid: false,
                    touched: false,
                    visible: true,
                    validationRules: {
                        requiredValidator: true,
                    }
                },
                education: {
                    value: '',
                    valid: false,
                    touched: false,
                    visible: true,
                    validationRules: {
                        requiredValidator: true,
                    }
                },
                residence: {
                    value: '',
                    valid: false,
                    touched: false,
                    visible: true,
                    validationRules: {
                        requiredValidator: true,
                    }
                }

            }
        };


    }







    toggle = () => {

        //console.log(this.state.showmodal);
        this.setState({showmodal: !this.state.showmodal});// added for modal
    }


    handleSubmit = (e) => {

        console.log("in submit");

        //if (this.state.formControls.numdependents.value === "3") {
        //    this.toggle();
        //}

        //e.preventDefault();


        ///////////////////////////////////////////


        // todo temp make form valid

        this.setState({formIsValid : true});

        //////////////////////////////////////////

        //if (!this.state.formIsValid) {
        if (false) {


            // first make sure all invalid fields are set to label red
            const updatedControls = {
                ...this.state.formControls // gives you all of the form controls and all their ste elements
            };



            // dealing with the conditional display - there has got to be a better way to do this
            for (let inputIdentifier in updatedControls) {

                if (!updatedControls[inputIdentifier].touched) {

                    updatedControls[inputIdentifier].touched = true;
                }
            }


            this.setState({
                formControls: updatedControls
            }, () => {
                console.log("turning all untouched red ");
                console.log(this.state);
                this.setState({shownotokeedokee: true});

            });

            // Now all I need to do is pop a modal that says they have to fill in the missing info


            // } else if (this.state.formIsValid) {
        } else if (true) {


            console.log("valid form - post to server");

            console.log(this.state.formControls);


            //axios.post('http://localhost:5000/api/riskratios', this.state.formControls).then(res => {
            //axios.post('/api/riskratios', this.state.formControls).then(res => {
            //axios.post(`http://localhost:9000/testAPI`, this.state.formControls).then(res => {


            /*
               // test post to api/godaddy

               axios.post('/api/gd', {
                   ReturnURL: 'www.mydatatwin.com',

               }).
               then(res => {
                   console.log(res);
               });

           */
            axios.post('/api/riskratios', this.state.formControls).then(res => {

                console.log(res);

                const newState = update(this.state, {
                    showArray: {
                        dependents: {$set: res.data[0]},
                        income: {$set: res.data[1]},
                        education: {$set: res.data[2]}

                    },
                });

                this.setState(newState);

                console.log(this.state);

                console.log(res.data[0] || res.data[1] || res.data[2])

                if (res.data[0] || res.data[1] || res.data[2]) {

                    this.setState({showmodal: true});

                } else {

                    // Assuming that once the risk scores were developed and checked against the
                    // criteria and the user either fixed or confirmed the info I will now get a final
                    // signal that the form has valid data in it and is ready to go back to the data recipient
                    // and hand the user back to the originating web site.  I then need to do something to
                    // terminate the dyno running this form and server.


                    // the okeedokee modal needs to alert the user that they are going to transfer back to the
                    // originating site and request a confirmation or ok then we post the info back to
                    // some secure API of some data consuming app and redirect back to the website.
                    this.setState({showokeedokee: true})

                    // either create the data json here or back at the server
                    // I think the server will have all of the information so I don't need to resend it.






                }
            }, () => {
                console.log(this.state); // Note how the callback fixes the async issue with last character

            });

        }

        // in the event handler need to do a post to the express server passing the user name
        // then the server will run the api retrieval and returnt he numebr of repos


        //axios.post(`http://localhost:9000/testAPI`, this.state.formControls).then(res => {
        // console.log("im here");
        //console.log(res.data);
        //})
    }


// helper change handler
    handleChange = (name, value, visible = true) => {

        console.log("in handle change  " + name + "  " + value );

        const updatedControls = {
            ...this.state.formControls // gives you all of the form controls and all their ste elements
        };

        // all of the state for firstname (or whatever is the target) - particular form control
        const updatedFormElement = {
            ...updatedControls[name]
        };

        updatedFormElement.value = value;
        updatedFormElement.touched = true; // we did enter something - may not be correct yet
        updatedFormElement.valid = validate(value, updatedFormElement.validationRules); // goes though each rule in switch

        updatedControls[name] = updatedFormElement;

        let formIsValid = true;


        // dealing with the conditional display - there has got to be a better way to do this
        for (let inputIdentifier in updatedControls) {

            if (updatedControls[inputIdentifier].visible) {
                formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
            }
        }


        this.setState({
            formControls: updatedControls,
            formIsValid: formIsValid

        }, () => {
            console.log("checking form is valid");
            console.log(this.state);


        });

    }


// can handle any target
    handleChange2 = (e) => {

        console.log("in handle change 2 " + e.target.name + "  " + e.target.value );


        const name = e.target.name;

        const value = e.target.value;

        const updatedControls = {
            ...this.state.formControls // gives you all of the form controls and all their ste elements
        };

        // all of the state for firstname (or whatever is the target) - particular form control
        const updatedFormElement = {
            ...updatedControls[name]
        };


        updatedFormElement.value = value;
        updatedFormElement.touched = true; // we did enter something - may not be correct yet
        updatedFormElement.valid = validate(value, updatedFormElement.validationRules); // goes though each rule in switch

        updatedControls[name] = updatedFormElement;

        let formIsValid = true;


        // dealing with the conditional display - there has got to be a better way to do this
        for (let inputIdentifier in updatedControls) {

            if (updatedControls[inputIdentifier].visible) {
                formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
            }
        }


        this.setState({
            formControls: updatedControls,
            formIsValid: formIsValid
        }, () => {
            console.log(this.state);

        });

    }


    hideSpouse2 = e => {  // called from marital selector

        let fieldname1 = "spouse_firstname";

        const value = e.target.value;

        let updatedControls = {
            ...this.state.formControls // gives you all of the form controls and all their ste elements
        };

        // all of the state for firstname (or whatever is the target) - particular form control
        const updatedFormElement = {
            ...updatedControls[fieldname1]
        };

        updatedFormElement.visible = false;

        updatedControls[fieldname1] = updatedFormElement;

        ///////////////////////////////////////////////////////////////////////

        fieldname1 = "spouse_lastname";

        // all of the state for firstname (or whatever is the target) - particular form control
        const updatedFormElement2 = {
            ...updatedControls[fieldname1]
        };

        updatedFormElement2.visible = false;

        updatedControls[fieldname1] = updatedFormElement2;

        let name1 = "spouse_firstname";
        let name2 = "spouse_lastname";

        console.log(updatedControls[name1])
        console.log(updatedControls[name2])

        this.setState({
            showFormMortgagePersonalInfoSpouseName: false,
            hideFormMortgagePersonalInfoSpouseName: true,
            formControls: updatedControls
        }, () => {
            console.log(this.state);
            this.handleChange("maritalstatus", value);

        });
    }


    showSpouse2 = e => {  // called from marital selector

        let fieldname1 = "spouse_firstname";

        const value = e.target.value;

        let updatedControls = {
            ...this.state.formControls // gives you all of the form controls and all their ste elements
        };

        // all of the state for firstname (or whatever is the target) - particular form control
        const updatedFormElement = {
            ...updatedControls[fieldname1]
        };

        updatedFormElement.visible = true;

        updatedControls[fieldname1] = updatedFormElement;

        ///////////////////////////////////////////////////////////////////////

        fieldname1 = "spouse_lastname";

        // all of the state for firstname (or whatever is the target) - particular form control
        const updatedFormElement2 = {
            ...updatedControls[fieldname1]
        };

        updatedFormElement2.visible = true;

        updatedControls[fieldname1] = updatedFormElement2;

        let name1 = "spouse_firstname";
        let name2 = "spouse_lastname";

        console.log(updatedControls[name1])
        console.log(updatedControls[name2])

        this.setState({
            showFormMortgagePersonalInfoSpouseName: true,
            hideFormMortgagePersonalInfoSpouseName: false,
            formControls: updatedControls
        }, () => {
            console.log(this.state);
            this.handleChange("maritalstatus", value);

        });
    }


    printValue = e => {

        console.log(e.target.value);

    }


//converts the dollar amount to the index
    parseIncome = () => {

        let tempvalue = this.state.formControls.rawincome.value;
        let incomenumber = '';

        if (tempvalue < 0) {
            console.log("income must be positive") // todo this should generate an immediate pop up
        } else if (tempvalue >= 0 && tempvalue <= 13850) {
            incomenumber = "11";
        } else if (tempvalue > 13850 && tempvalue <= 52850) {
            incomenumber = "12";
        } else if (tempvalue > 52850 && tempvalue <= 84200) {
            incomenumber = "13";
        } else if (tempvalue > 84200 && tempvalue <= 160700) {
            incomenumber = "14";
        } else if (tempvalue > 160700 && tempvalue <= 204100) {
            incomenumber = "15";
        } else if (tempvalue > 204100 && tempvalue <= 510300) {
            incomenumber = "16";
        } else if (tempvalue > 510300) {
            incomenumber = "17";
        }

        let name = "income";
        let value = incomenumber;

        this.handleChange(name, value);

    }

    storeIncome = e => {
        const name = e.target.name;

        //console.log(e.target.name);

        const value = e.target.value;

        console.log("in store income" + value);

        const updatedControls = {
            ...this.state.formControls // gives you all of the form controls and all their ste elements
        };

        // all of the state for firstname (or whatever is the target) - particular form control
        const updatedFormElement = {
            ...updatedControls[name]
        };


        updatedFormElement.value = value;
        updatedFormElement.touched = true; // we did enter something - may not be correct yet
        updatedFormElement.valid = validate(value, updatedFormElement.validationRules); // goes though each rule in switch

        updatedControls[name] = updatedFormElement;

        let formIsValid = true;


        for (let inputIdentifier in updatedControls) {
            formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
        }


        this.setState({
            formControls: updatedControls,
            formIsValid: formIsValid
        }, () => {
            this.parseIncome();

        });
    }




    parseKids = e => {
        console.log(" in parse kids");
        console.log(e.target.value);
        let name = "numdependents";
        let value = Number(e.target.value);
        if (value >= 5) {
            value = 5;
        }
        value = String(value);
        this.handleChange(name, value);
    }


    //#######################################################################################

    name_PopoverLogic = (e) => {

        console.log("in name_PopoverLogic");


        let nameValid = this.state.formControls[e.target.getAttribute('name')]

        //console.log(e.target.getAttribute('value').length+"  "+ nameValid.valid + "  "+ e.target.getAttribute('name'));


        // is the field left blank?
        if(e.target.getAttribute('value').length === 0 && nameValid.valid === false ) {  // this may not work  might be "" not zero

            console.log("checking for blank field");
            this.setState({
                showblankfield:true
            }, () => {
                this.handleChange();
                console.log("in the name_PopoverLogic blank field");
            });
        }


        // name length must match the validator rule
        else if(e.target.getAttribute('value').length < this.state.formControls.firstname.minlength && nameValid.valid === false ) {

            let re = /^[a-zA-Z'.-]*$/;
            //console.log( re.test(String(e.target.getAttribute('value')).toLowerCase()));
            var chartest =  (re.test(String(e.target.getAttribute('value')).toLowerCase()));

            if(chartest === true) {
                this.setState({
                    shownamewronglength: true
                }, () => {
                    console.log("in the name_PopoverLogic name too short");
                });
            } else {
                this.setState({
                    shownamewrong: true
                }, () => {
                    console.log("in the name_PopoverLogic name too short but also bad charaacter");
                });

            }
        }




        // is there something there and its not letters only
        else if(nameValid.valid === false ) {
            this.setState({
                shownamewrong:true
            }, () => {
                console.log("in the name_PopoverLogic - bad character present");
            });
        }

        // name length limited to 31 characters per passport but it passes basic test
        else if(e.target.getAttribute('value').length >this.state.formControls.firstname.maxlength && nameValid.valid === true ) {

            this.setState({
                shownamewronglength:true
            }, () => {
                console.log("in the name_PopoverLogic name  too long");
            });
        }

        else {this.setState({

        }, () => {
            console.log("in the name_PopoverLogic function after state set - in else");
        });

        }

    }

    //#######################################################################################

    street_PopoverLogic = (e) => {

        console.log("in street_PopoverLogic");

        let nameValid = this.state.formControls[e.target.getAttribute('name')]

        //console.log(e.key + "  "+e.target.getAttribute('value').length+"  "+ nameValid.valid + "  "+ e.target.getAttribute('name'));


        // is the field left blank?
        if(e.target.getAttribute('value').length === 0 && nameValid.valid === false ) {  // this may not work  might be "" not zero

            console.log("checking for blank field");
            this.setState({
                showblankfield:true
            }, () => {
                this.handleChange();
                console.log("in the street_PopoverLogic blank field");
            });
        }

        // name length must match the validator rule
        else if(e.target.getAttribute('value').length < this.state.formControls.street.minlength && nameValid.valid === false ) {

            let re = /\d+[ ](?:[A-Za-z0-9.-]+[ ]?)+(?:Avenue|Lane|Road|Boulevard|Drive|Street|Ave|Dr|Rd|Blvd|Ln|St)\.?/;
            //console.log( re.test(String(e.target.getAttribute('value')).toLowerCase()));
            var chartest =  (re.test(String(e.target.getAttribute('value')).toLowerCase()));

            if(chartest === true) {
                this.setState({
                    showstreetwronglength: true
                }, () => {
                    console.log("in the street_PopoverLogic name too short");
                });
            } else {
                this.setState({
                    showstreetwrong: true
                }, () => {
                    console.log("in the street_PopoverLogic name too short but also bad charaacter");
                });

            }
        }


        // is there something there and its not letters only
        else if(nameValid.valid === false ) {
            this.setState({
                showstreetwrong:true
            }, () => {
                console.log("in the street_PopoverLogic - bad character present");
            });
        }

    }

    //#######################################################################################

    city_PopoverLogic = (e) => {

        console.log("in city_PopoverLogic");

        let nameValid = this.state.formControls[e.target.getAttribute('name')]

        //console.log(e.key + "  "+e.target.getAttribute('value').length+"  "+ nameValid.valid + "  "+ e.target.getAttribute('name'));


        // is the field left blank?
        if(e.target.getAttribute('value').length === 0 && nameValid.valid === false ) {  // this may not work  might be "" not zero

            console.log("checking for blank field");
            this.setState({
                showblankfield:true
            }, () => {
                this.handleChange();
                console.log("in the city_PopoverLogic blank field");
            });
        }

        // name length must match the validator rule
        else if(e.target.getAttribute('value').length < this.state.formControls.city.validationRules.minLengthValidator && nameValid.valid === false ) {

            let re = /^[a-zA-Z]+(?:(?:\\s+|-)[a-zA-Z]+)*$/;
            //console.log( re.test(String(e.target.getAttribute('value')).toLowerCase()));
            var chartest =  (re.test(String(e.target.getAttribute('value')).toLowerCase()));

            if(chartest === true) {
                this.setState({
                    showcitywronglength: true
                }, () => {
                    console.log("in the city_PopoverLogic name too short");
                });
            } else {
                this.setState({
                    showcitywrong: true
                }, () => {
                    console.log("in the city_PopoverLogic name too short but also bad charaacter");
                });

            }
        }


        // is there something there and its not letters only
        else if(nameValid.valid === false ) {
            this.setState({
                showcitywrong:true
            }, () => {
                console.log("in the streetcity_PopoverLogic - bad character present");
            });
        }

        // name length limited to 25 characters per passport but it passes basic test
        else if(e.target.getAttribute('value').length > this.state.formControls.city.validationRules.cityLengthValidator && nameValid.valid === true ) {

            this.setState({
                showcitywronglength:true
            }, () => {
                console.log("in the city_PopoverLogic name  too long");
            });
        }

    }

    //#######################################################################################
    zip_PopoverLogic = (e) => {

        console.log("in zip_PopoverLogic");

        let nameValid = this.state.formControls[e.target.getAttribute('name')]

        console.log(e.key + "  "+e.target.getAttribute('value').length+"  "+ nameValid.valid + "  "+ e.target.getAttribute('name'));


        // is the field left blank?
        if(e.target.getAttribute('value').length === 0 && nameValid.valid === false ) {  // this may not work  might be "" not zero

            console.log("checking for blank field");
            this.setState({
                showblankfield:true
            }, () => {
                this.handleChange();
                console.log("in the zip_PopoverLogic blank field");
            });
        }

        // zip is wrong  - small,big, or bad charcters
        else if(nameValid.valid === false ) {



            this.setState({
                showzipwrong: true
            }, () => {
                console.log("in the zip_PopoverLogic zipwrong");
            });

        }





    }

    //#######################################################################################


    age_PopoverLogic = (e) => {

        console.log("in age_PopoverLogic");

        let namevalid = this.state.formControls[e.target.getAttribute('name')]

        // is the field left blank?
        if(e.target.getAttribute('value').length === 0 && namevalid.valid === false ) {  // this may not work  might be "" not zero

            console.log("checking for blank field");
            this.setState({
                showblankfield:true
            }, () => {
                this.handleChange();
                console.log("in the age_PopoverLogic blank field");
            });
        }

        else if((e.target.getAttribute('value').length > 0 ) && (namevalid.valid === false) ) {
            this.setState({
                showagewrong:true
            }, () => {
                console.log("in the income_PopoverLogic function  - bad character");
            });
        }


    }

    //#######################################################################################

    ssn_PopoverLogic = (e) => {

        console.log("in ssn_PopoverLogic");

        let nameValid = this.state.formControls[e.target.getAttribute('name')]

        // todo  special handling for demo cases!!!!

        if(e.target.getAttribute('value') == "123456789" ) {

            this.setState({
                showssnblacklist:true
            }, () => {
                console.log("in the ssn_PopoverLogic blacklist");
            });
        }

        if(e.target.getAttribute('value') == "555061212" ) {

            // put up the ssn already in use modal
            this.setState({
                showssninuse:true
            }, () => {
                console.log("in the ssn_PopoverLogic ssninuse");
            });
        }


        console.log(e.target.getAttribute('value').length+"  "+ nameValid.valid + "  "+ e.target.getAttribute('name'));

        if((e.target.getAttribute('value').length === 0)&&  nameValid.valid === false ) {

            this.setState({
                showblankfield:true
            }, () => {
                console.log("in the ssn_PopoverLogic function after state set - false -true");
            });
        }

        else if((e.target.getAttribute('value').length === 9) && (nameValid.valid === false) ) {
            this.setState({
                showssnwrong:true
            }, () => {
                console.log("in the ssn_PopoverLogic function after state set - true-false");
            });
        }

        //else if(e.key === && (e.target.getAttribute('value').length <9 || e.target.getAttribute('value').length >9) && this.valid === false ) {
        else if((e.target.getAttribute('value').length !== 9)&&  nameValid.valid === false ) {

            this.setState({
                showssnwronglength:true
            }, () => {
                console.log("in the ssn_PopoverLogic function after state set - false -true");
            });
        }

        else {this.setState({

        }, () => {
            console.log("in the ssn_PopoverLogic function after state set - in else");
        });

        }

    }

    //#######################################################################################


    income_PopoverLogic = (e) => {

        console.log("in income_PopoverLogic");

        let namevalid = this.state.formControls[e.target.getAttribute('name')]

        //console.log("income popover valid "+ e.target.getAttribute('name'));

        // is the field left blank?
        if(e.target.getAttribute('value').length === 0 && namevalid.valid === false ) {  // this may not work  might be "" not zero

            console.log("checking for blank field");
            this.setState({
                showblankfield:true
            }, () => {
                this.handleChange();
                console.log("in the income_PopoverLogic blank field");
            });
        }


        else if((e.target.getAttribute('value').length > 0 ) && (namevalid.valid === false) ) {
            this.setState({
                showincomewrong:true
            }, () => {
                console.log("in the income_PopoverLogic function  - bad character");
            });
        }


    }

    //#######################################################################################

    // ALL MODALS BEED TO BE ENTERED HERE!!!!!!!
    closeModals = (e) => {

        //console.log("in close modals")
        this.setState({
            showssnwrong:false,
            showssnwronglength:false,
            showblankfield:false,
            shownamewrong:false,
            shownamewronglength:false,
            showstreetwrong:false,
            showstreetwronglength:false,
            showcitywrong:false,
            showcitywronglength:false,
            showagewrong:false,
            showzipwrong: false,
            showincomewrong: false,
            showokeedokee: false,
            shownotokeedokee: false,
            showssninuse: false,
            showssnblacklist:false
        }, () => {
            //console.log("in the close modals function");
        });

    }


    setTouchedOnFocus = (e) => {
        const name = e.target.name;

        console.log("in on focus   " + name);

        const updatedControls = {
            ...this.state.formControls // gives you all of the form controls and all their ste elements
        };

        // all of the state for firstname (or whatever is the target) - particular form control
        const updatedFormElement = {
            ...updatedControls[name]
        };

        updatedFormElement.touched = true; // we did enter something - may not be correct yet

        updatedControls[name] = updatedFormElement;

        this.setState({
            formControls: updatedControls,
        }, () => {
            //console.log(this.state);

        });
    }


    render() {

        const {showFormMortgagePersonalInfoSpouseName, hideFormMortgagePersonalInfoSpouseName, showmodal,
            showssnwrong,showssnwronglength, showblankfield, shownamewrong, shownamewronglength,showstreetwrong,
            showstreetwronglength, showcitywrong, showcitywronglength, showzipwrong, showagewrong,showincomewrong,
            showokeedokee, shownotokeedokee,showssninuse,showssnblacklist} = this.state;

        return (

            <Container className="container">

                <Form
                    className="form"
                    /*onSubmit = {this.handleSubmit}*/
                >


                    <Form.Label className="l2">
                        Data Twin Demo:
                    </Form.Label>


                    <displays.firstLastName
                        type="text"
                        firstplaceholder={this.state.formControls.firstname.placeholder}
                        firstvalue={this.state.formControls.firstname.value} // makes this a controlled component
                        firstvalid={this.state.formControls.firstname.valid}
                        firsttouched={this.state.formControls.firstname.touched}


                        lastplaceholder={this.state.formControls.lastname.placeholder}
                        lastvalue={this.state.formControls.lastname.value}
                        lastvalid={this.state.formControls.lastname.valid}
                        lasttouched={this.state.formControls.lastname.touched}
                        myonChange={this.handleChange2}
                        onBlur = {this.name_PopoverLogic}
                        onFocus = {this.setTouchedOnFocus}
                    />


                    {showFormMortgagePersonalInfoSpouseName && !hideFormMortgagePersonalInfoSpouseName && (
                        <displays.spouseName
                            type="text"
                            firstplaceholder={this.state.formControls.spouse_firstname.placeholder}
                            firstvalue={this.state.formControls.spouse_firstname.value} // makes this a controlled component
                            firstvalid={this.state.formControls.spouse_firstname.valid}
                            firsttouched={this.state.formControls.spouse_firstname.touched}


                            lastplaceholder={this.state.formControls.spouse_lastname.placeholder}
                            lastvalue={this.state.formControls.spouse_lastname.value}
                            lastvalid={this.state.formControls.spouse_lastname.valid}
                            lasttouched={this.state.formControls.spouse_lastname.touched}
                            myonChange={this.handleChange2}
                            onBlur = {this.name_PopoverLogic}
                            onFocus = {this.setTouchedOnFocus}
                        /> )}


                    <displays.streetCity
                        type="text"
                        firstplaceholder={this.state.formControls.street.placeholder}
                        lastplaceholder={this.state.formControls.city.placeholder}
                        firstvalue={this.state.formControls.street.value} // makes this a controlled component
                        lastvalue={this.state.formControls.city.value}
                        onChange={this.handleChange2}
                        firstvalid={this.state.formControls.street.valid}
                        lastvalid={this.state.formControls.city.valid}
                        firsttouched={this.state.formControls.street.touched}
                        lasttouched={this.state.formControls.city.touched}
                        firstonBlur = {this.street_PopoverLogic}
                        lastonBlur = {this.city_PopoverLogic}
                        onFocus = {this.setTouchedOnFocus}
                    />


                    <displays.stateZip
                        type="text"
                        firstplaceholder={this.state.formControls.state.placeholder}
                        lastplaceholder={this.state.formControls.zip.placeholder}
                        firstvalue={this.state.formControls.state.value} // makes this a controlled component
                        lastvalue={this.state.formControls.zip.value}
                        onChange={this.handleChange2}
                        firstvalid={this.state.formControls.state.valid}
                        lastvalid={this.state.formControls.zip.valid}
                        firsttouched={this.state.formControls.state.touched}
                        lasttouched={this.state.formControls.zip.touched}
                        firstonBlur = {this.state_PopoverLogic}
                        lastonBlur = {this.zip_PopoverLogic}
                        onFocus = {this.setTouchedOnFocus}
                    />


                    <displays.agessn
                        type="text"
                        firstplaceholder={this.state.formControls.age.placeholder}
                        firstvalue={this.state.formControls.age.value} // makes this a controlled component
                        firstonChange={this.handleChange2}
                        firstvalid={this.state.formControls.age.valid}
                        firsttouched={this.state.formControls.age.touched}
                        lastplaceholder={this.state.formControls.socialsecuritynumber.placeholder}
                        lastvalue={this.state.formControls.socialsecuritynumber.value} // makes this a controlled component
                        lastonChange={this.handleChange2}
                        lastvalid={this.state.formControls.socialsecuritynumber.valid}
                        lasttouched={this.state.formControls.socialsecuritynumber.touched}
                        firstonBlur = {this.age_PopoverLogic}
                        lastonBlur = {this.ssn_PopoverLogic}
                        onFocus = {this.setTouchedOnFocus}
                    />

                    <displays.maritalStatus
                        numdependents={this.state.formControls.maritalstatus.value}
                        showSpouse={this.showSpouse2}
                        hideSpouse={this.hideSpouse2}
                        type="text"
                        value={this.state.formControls.maritalstatus.value} // makes this a controlled component
                        firstvalid={this.state.formControls.maritalstatus.valid}
                        firsttouched={this.state.formControls.maritalstatus.touched}
                        onFocus = {this.setTouchedOnFocus}
                    />


                    <displays.dependents
                        numdependents={this.state.formControls.numdependents.value}
                        parseKids={this.parseKids}
                        type="text"
                        value={this.state.formControls.numdependents.value} // makes this a controlled component
                        firstvalid={this.state.formControls.numdependents.valid}
                        firsttouched={this.state.formControls.numdependents.touched}
                        onFocus = {this.setTouchedOnFocus}
                    />


                    <displays.residence
                        residence={this.state.formControls.residence.value}
                        handleChange={this.handleChange2}
                        type="text"
                        value={this.state.formControls.residence.value} // makes this a controlled component
                        firstvalid={this.state.formControls.residence.valid}
                        firsttouched={this.state.formControls.residence.touched}
                        onFocus = {this.setTouchedOnFocus}
                    />


                    <displays.income
                        rawincome={this.state.formControls.rawincome.value}
                        storeIncome={this.storeIncome}
                        placeholder={this.state.formControls.income.placeholder}
                        firstvalid={this.state.formControls.rawincome.valid}
                        firsttouched={this.state.formControls.rawincome.touched}
                        value={this.state.formControls.rawincome.value}
                        onFocus = {this.setTouchedOnFocus}
                        firstonBlur = {this.income_PopoverLogic}

                    />


                    <displays.education
                        education={this.state.formControls.education.value}
                        handleChange={this.handleChange2}
                        type="text"
                        placeholder={this.state.formControls.education.placeholder}
                        value={this.state.formControls.education.value} // makes this a controlled component
                        firstvalid={this.state.formControls.education.valid}
                        firsttouched={this.state.formControls.education.touched}
                        onFocus = {this.setTouchedOnFocus}
                    />

                    {/*

                    <Form.Label className="l2">
                        Mortgage Applications:
                    </Form.Label>


                    <displays.applications
                        applications={this.state.formControls.pastapplications.value}
                        handleChange={this.handleChange2}
                        placeholder={this.state.formControls.pastapplications.placeholder}
                        value={this.state.formControls.pastapplications.value} // makes this a controlled component
                        firstvalid={this.state.formControls.pastapplications.valid}
                        firsttouched={this.state.formControls.pastapplications.touched}
                        onFocus = {this.setTouchedOnFocus}
                    />

                    <displays.applicationsdenied
                        applicationsdenied={this.state.formControls.pastapplicationsdenied.value}
                        handleChange={this.handleChange2}
                        placeholder={this.state.formControls.pastapplicationsdenied.placeholder}
                        value={this.state.formControls.pastapplicationsdenied.value} // makes this a controlled component
                        firstvalid={this.state.formControls.pastapplicationsdenied.valid}
                        firsttouched={this.state.formControls.pastapplicationsdenied.touched}
                        onFocus = {this.setTouchedOnFocus}
                    />

                    */}


                    <Form.Group as={Row} controlId="submitButton" className="formgroup">
                        <Col>
                            <Button
                                className="submitButton"
                                onClick={this.handleSubmit}
                                //disabled={!this.state.formIsValid}
                            > Submit
                            </Button>
                        </Col>

                    </Form.Group>

                    {/*
                    <Form.Group as={Row} controlId="modalButton" className="formgroup">
                        <Col>
                            <Button
                                className="submitButton"

                                onClick={this.toggle}
                            >
                                Show Modal
                            </Button>
                        </Col>ß

                    </Form.Group>


                    <Alert variant="success">
                        <Alert.Heading>Hey, nice to see you</Alert.Heading>
                        <p>
                            Aww yeah, you successfully read this important alert message. This example
                            text is going to run a bit longer so that you can see how spacing within an
                            alert works with this kind of content.
                        </p>
                        <hr />
                        <p className="mb-0">
                            Whenever you need to, be sure to use margin utilities to keep things nice
                            and tidy.
                        </p>
                    </Alert
*/}

                    {showssnwrong && (

                        <displays.formfieldResponseModal
                            show = {this.state.showssnwrong}
                            closeModals = {this.closeModals}
                            headertext = "Illegal Characters in SSN"
                            bodytext = "Please enter a social security number with nine digits and no hypens"
                        />
                    )}

                    {showssnwronglength && (

                        <displays.formfieldResponseModal
                            show = {this.state.showssnwronglength}
                            closeModals = {this.closeModals}
                            headertext = "Too Short or Too long!"
                            bodytext = "Your social security number must be exactly nine (9) numbers in length"
                        />
                    )}


                    {showblankfield && (

                        <displays.formfieldResponseModal
                            show = {this.state.showblankfield}
                            closeModals = {this.closeModals}
                            headertext = "You have left a field blank"
                            bodytext = "We really need this information to process your application!"
                            width = "modal-50w"
                        />
                    )}

                    {shownamewrong && (

                        <displays.formfieldResponseModal
                            show = {this.state.shownamewrong}
                            closeModals = {this.closeModals}
                            headertext = "Names contain characters only"
                            bodytext = "Please delete all non letters from your name -
                            spaces are not valid characters - make sure you didn't add one to name!!"
                        />
                    )}

                    {shownamewronglength && (

                        <displays.formfieldResponseModal
                            show = {this.state.shownamewronglength}
                            closeModals = {this.closeModals}
                            headertext = "Name length must be more than one character and less than 32 characters"
                            bodytext = "Please enter your name as it is on your passport!"
                            width = "modal-70w"
                        />
                    )}

                    {showstreetwrong && (

                        <displays.formfieldResponseModal
                            show = {this.state.showstreetwrong}
                            closeModals = {this.closeModals}
                            headertext = "Street addresses have letters, numbers, hyphens, and periods."
                            bodytext = "Please delete everything else from your street address"
                        />
                    )}

                    {showstreetwronglength && (

                        <displays.formfieldResponseModal
                            show = {this.state.showstreetwronglength}
                            closeModals = {this.closeModals}
                            headertext = "Street address length must be more than one character and less than 36 characters"
                            bodytext = "Please check your street address for length"
                            width = "modal-70w"
                        />
                    )}

                    {showcitywrong && (

                        <displays.formfieldResponseModal
                            show = {this.state.showcitywrong}
                            closeModals = {this.closeModals}
                            headertext = "City names contain letters only"
                            bodytext = "Please delete all non letters from your city name"
                        />
                    )}

                    {showcitywronglength && (

                        <displays.formfieldResponseModal
                            show = {this.state.showcitywronglength}
                            closeModals = {this.closeModals}
                            headertext = "Name length must be more than three characters and less than 25 characters"
                            bodytext = "Please check the length of your city name"
                        />
                    )}

                    {showzipwrong && (

                        <displays.formfieldResponseModal
                            show = {this.state.showzipwrong}
                            closeModals = {this.closeModals}
                            headertext = "Your zip code should be either 5 numbers or 5 numbers, a dash, and 4 more numbers"
                            bodytext = "Please make sure your zip code meets these requirements"
                            width = "modal-70w"
                        />
                    )}

                    {showagewrong && (

                        <displays.formfieldResponseModal
                            show = {this.state.showagewrong}
                            closeModals = {this.closeModals}
                            headertext = "Your age is required to be 17 to 120 years old"
                            bodytext = "We do not lend to folks younger than 17.  If you are older than 120 years old please
                            call customer service for special service to make this easier."
                        />
                    )}

                    {showincomewrong && (

                        <displays.formfieldResponseModal
                            show = {this.state.showincomewrong}
                            closeModals = {this.closeModals}
                            headertext = "Your income should be only numbers."
                            bodytext = "There is no need to enter a dollar sign. Please make sure you have only entered numbers!"
                        />
                    )}

                    {showokeedokee && (

                        <displays.formfieldResponseModal
                            show = {this.state.showokeedokee}
                            closeModals = {this.closeModals}
                            headertext = "Your application has been submitted."
                            bodytext = "Thanks for submitting your application! We are reviewing and validating your information using a battery
                            of sophisticated algortihmic tools from DataTwin.  You should receive an email shortly with an account number
                             and password."
                        />
                    )}

                    {shownotokeedokee && (

                        <displays.formfieldResponseModal
                            show = {this.state.shownotokeedokee}
                            closeModals = {this.closeModals}
                            headertext = "Your application cannot be submitted unless all fields are complete and valid."
                            bodytext = "Invalid fields are clearly marked in red.  Please fix and click submit."
                            width = "modal-70w"
                        />
                    )}

                    {showssnblacklist && (

                        <displays.formfieldResponseModal
                            show = {this.state.showssnblacklist}
                            closeModals = {this.closeModals}
                            headertext = "The entered SSN is not allowed!."
                            bodytext = "The SSN you have entered is blacklisted by the IRS and is not allowed, please enter your correct SSN!"
                            width = "modal-70w"
                        />
                    )}


                    {showssninuse && (

                        <displays.formfieldResponseModal
                            show = {this.state.showssninuse}
                            closeModals = {this.closeModals}
                            headertext = "The entered SSN is assigned to another person!"
                            bodytext = "Make sure you are entering your name as it is on your drivers license or passport.  Please make sure the number you have entered is correct!"
                            width = "modal-70w"
                        />
                    )}



                    {showmodal && (
                        <MyModal2
                            show={this.state.showmodal}
                            showarray={this.state.showArray}
                            firstname={this.state.formControls.firstname}
                            rawincome={this.state.formControls.rawincome}
                            numdependents={this.state.formControls.numdependents}
                            education={this.state.formControls.education}
                            storeIncome={this.storeIncome}
                            parentAction={this.toggle}
                            parseKids = {this.parseKids}/>
                        /*  <ModalClass show = {this.state.show} parentAction = {this.toggle}/>*/
                    )}







                    {/*
                    {showbasicSSNmodal && (
                    <Modal
                        animation = {true}
                        size = "md"
                        show={true}>
                        <Modal.Body>Your Social Security Number contains exactly 9 numbers with no letters or other characters other than hyphens.
                            Please check what you have entered.</Modal.Body>
                    </Modal>
                    )}

                    */}

                </Form>
            </Container>
        );

    }

}





export default App;