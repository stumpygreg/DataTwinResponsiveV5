import React, { } from 'react';
import {Container, Col, Row, Form, Button, FormGroup} from "react-bootstrap";
import axios from 'axios';
import update from 'immutability-helper';


import './App.css';
import * as displays from './components/DisplayFunctions.js';
//import * as breadcrumbs from './images/'; // todo figure out how to import multiple images
import breadcrumb3 from './images/breadcrumb3.png';
import breadcrumb4 from './images/breadcrumb4.png';

import MyModal2 from "./components/MyModal";
import {Page1_SpouseAgeSsn} from "./components/DisplayFunctions.js"; // using a function


import * as SmartyStreetsSDK from "smartystreets-javascript-sdk";  //todo where is this???
import * as sdkUtils from "smartystreets-javascript-sdk-utils";
import Suggestions from "./components/Suggestions";

var numpages = 2;


class MasterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            // smarty state items
            shouldValidate: true,
            country: "US",
            suggestions: [],
            error: "",
            showSuggestions: true,

            // added to eliminate recoding the validation errors
            // tried using an array but updating values is a mess to do
            // as long as there are a reasonable number, this makes the errors very clear
            emptyNameFieldError: false,
            nameTooShortError: false,
            nameTooLongError: false,
            lettersOnlyError: false,
            numbersOnlyError: false,
            requiredError: false,
            streetTooShortError: false,
            streetBadCharError: false,
            cityTooShortError: false,
            cityBadCharError: false,
            stateWrongLengthError: false,
            zipLengthError: false,
            zipBadCharError: false,
            ageLengthError: false,
            ageBadCharError: false,
            ageOutOfLimitsError: false,
            ssnWrongError : false,
            incomeBadLengthError: false,
            incomeOutOfLimitsError: false,
            phoneNumberInvalidError: false,




            // added for multipage form
            currentStep: 1,
            pageName: 'Start Here',
            breadcrumbImage:breadcrumb3,

            //original state
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
            showbadphonenumber: false,
            showbademail: false,

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
                    placeholder: 'First name as on drivers licence',
                    valid: false,
                    touched: false,
                    visible: true,
                    validationRules: {
                        requiredValidator: true,
                        lettersOnlyValidator: true,
                        minNameLengthValidator: 2, // names like Jo (is that a real name)
                        maxNameLengthValidator: 31,
                    }
                },
                lastname: {
                    value: '',
                    minlength: 2,
                    maxlength: 31,
                    placeholder: 'Last name as on drivers licence',
                    valid: false,
                    touched: false,
                    visible: true,
                    validationRules: {
                        requiredValidator: true,
                        minNameLengthValidator: 2, // names like Jo (is that a real name)
                        maxNameLengthValidator: 31,
                        lettersOnlyValidator: true,
                    }
                },

                spouse_firstname: {
                    value: '',
                    minlength: 2,
                    maxlength: 31,
                    placeholder: 'First name as on drivers licence',
                    valid: false,
                    touched: false,
                    visible: 'false',
                    validationRules: {
                        requiredValidator: true,
                        minNameLengthValidator: 2, // names like Jo (is that a real name)
                        maxNameLengthValidator: 31,
                        lettersOnlyValidator: true,

                    }
                },
                spouse_lastname: {
                    value: '',
                    minlength: 2,
                    maxlength: 31,
                    placeholder: 'Last name as on drivers licence',
                    valid: false,
                    touched: false,
                    visible: 'false',
                    validationRules: {
                        requiredValidator: true,
                        minLengthValidator: 2, // names like Jo (is that a real name)
                        maxLengthValidator: 31,
                        lettersOnlyValidator: true,
                    }
                },
                spouse_age: {
                    value: '',
                    minlength: 1,
                    maxlength: 3,
                    placeholder: '22',
                    valid: false,
                    touched: false,
                    visible: true,
                    validationRules: {
                        requiredValidator: true,
                        ageValidator: true
                    }
                },
                spouse_ssn: {
                    value: '',
                    minlength: 9,
                    placeholder: '111223333',
                    valid: false,
                    touched: false,
                    visible: true,
                    validationRules: {
                        requiredValidator: true,
                        basicSSNValidator : true,
                    }
                },
                street: {
                    value: '',
                    minStreetlength: 2,
                    placeholder: 'Where you live',
                    valid: false,
                    touched: false,
                    visible: true,
                    validationRules: {
                       // minLengthValidator: 2,
                       // requiredValidator: true,
                        //streetValidator: true
                    }
                },
                city: {
                    value: '',
                    minCitylength: 4,
                    maxCitylength: 25,
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
                        minStateLengthValidator: 2,
                        requiredValidator: true,
                        lettersOnlyValidator: true,
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
                        minZipLengthValidator: 5,
                        requiredValidator: true,
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
                    }
                },
                phone: {
                    value: '',
                    minlength: 10,
                    placeholder: '5125551212',
                    valid: false,
                    touched: false,
                    visible: true,
                    validationRules: {
                        requiredValidator: true,
                        phoneValidator: true,
                    }
                },
                email: {
                    value: '',
                    minlength: 4,
                    placeholder: 'greg@aol.com',
                    valid: false,
                    touched: false,
                    visible: true,
                    validationRules: {
                        requiredValidator: true,
                        emailValidator: true,
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
                // start of page 2 state variables ////////////////////////////////////////////
               /* nickname: {
                    value: '',
                    valid: false,
                    touched: false,
                    visible: true,
                    validationRules: {
                        requiredValidator: true,
                    }
                },*/

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
                        //requiredValidator: true,

                    }
                },
                rawincome: {
                    value: '',
                    valid: false,
                    touched: false,
                    visible: true,
                    validationRules: {
                        //requiredValidator: true,
                        //numbersOnlyValidator: true
                    }
                },
                pastapplications: {  // not currently used
                    value: '',
                    valid: false,
                    touched: false,
                    visible: true,
                    validationRules: {
                        requiredValidator: true,
                    }
                },
                pastapplicationsdenied: { // not currently used
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

        //################################# added smarty stuff  ########################################
        //###########################################################################################

        const SmartyStreetsCore = SmartyStreetsSDK.core;
        const websiteKey = "109492610003229950"; // Your website key here  Localhost Key
        //const websiteKey = "109492610181451020"; // Your website key here  AWS key
        const smartyStreetsSharedCredentials = new SmartyStreetsCore.SharedCredentials(websiteKey);
        const autoCompleteClientBuilder = new SmartyStreetsCore.ClientBuilder(smartyStreetsSharedCredentials).withLicenses(["us-autocomplete-pro-cloud"]);
        const usStreetClientBuilder = new SmartyStreetsCore.ClientBuilder(smartyStreetsSharedCredentials);

        this.SmartyStreetsCore = SmartyStreetsCore;
        this.autoCompleteClient = autoCompleteClientBuilder.buildUsAutocompleteProClient();
        this.usStreetClient = usStreetClientBuilder.buildUsStreetApiClient();

    }

    //################################### add validation stuff ###################################
    //###########################################################################################

    //###################################### minLengthValidator ################################################
    minNameLengthValidator = (value, minLength) => {

        //this.setStateTopLevel('nameTooShortError', true);
        console.log("in min length validator ");
        return (value.length >= minLength);
    }

    //###################################### maxLengthValidator ################################################
    maxNameLengthValidator = (value, maxLength) => {

        //this.setStateTopLevel('nameTooShortError', true);
        console.log("in min length validator ");
        return (value.length <= maxLength);
    }

    //###################################### requiredValidator ################################################
    requiredValidator = (value, comp) => {
        console.log("in required validator" );
        return (((value.trim() !== '') === comp));
    }


    //###################################### ################################################
    // actually name validator
    // https://stackoverflow.com/questions/2385701/regular-expression-for-first-and-last-name
    // Alexander Burakevych

    //###################################### numbersOnlyValidator ################################################

    lettersOnlyValidator = (value, comp) => {
        console.log("in letters only validator");
        let re = /^[a-zA-Z'.-]*$/;
        return ((re.test(String(value).toLowerCase())) === comp);
    }
    //###################################### numbersOnlyValidator ################################################

        //https://stackoverflow.com/questions/19715303/regex-that-accepts-only-numbers-0-9-and-no-characters
        //Michael Liu

    numbersOnlyValidator = (value, comp) => {
            //console.log("in numbers only validator");
            //accept one or more digits
            let re = /^[0-9]+$/;
            //console.log(re.test(Number(value)));
            return (re.test(Number(value)) === comp);
    }


    //###################################### emptyTextFieldValidator ################################################
    emptyTextFieldValidator = (value, comp) => {
        //console.log("in empty field validator");
        //console.log("value  " + (value.length === 0));
        //console.log("comp  " + (comp));
        //console.log("emptyfield evaluator results  " + ((value.length == 0) == comp));


        return ((value.length === 0) === comp);

    }

    //###################################### basicSSNValidator ################################################
    //https://www.codeproject.com/Articles/651609/Validating-Social-Security-Numbers-through-Regular

    basicSSNValidator = (value) => {
        //strip hyphens out of string
        var newValue = value.replace(/-/g, "");
        // basic check that you only have 9 numbers
        let re = /^\d{9}$/;
        console.log("basic test :" + re.test(String(newValue)));
        return re.test(String(newValue));
    }

    //###################################### minStreetLengthValidator ################################################
    minStreetLengthValidator = (value, minLength) => {

        //this.setStateTopLevel('nameTooShortError', true);
        console.log("in min length validator ");
        return (value.length >= minLength);
    }

    //###################################### streetValidator ################################################
    streetValidator = (value, comp) => {
        //console.log("in street validator");
        let re = /\d+[ ](?:[A-Za-z0-9.-]+[ ]?)+(?:Avenue|Lane|Road|Boulevard|Drive|Street|Ave|Dr|Rd|Blvd|Ln|St)\.?/;
        return (re.test(String(value).toLowerCase()) === comp);
    }


    //###################################### minCityLengthValidator ################################################
    minCityLengthValidator = (value, minLength) => {

        //this.setStateTopLevel('nameTooShortError', true);
        console.log("in min length validator ");
        return (value.length >= minLength);
    }
    //###################################### cityValidator ################################################

    cityValidator = (value, comp) => {

        console.log("in city validator");
        let re = /^[a-zA-Z]+(?:(?:\\s+|-)[a-zA-Z]+)*$/;
        //console.log("retest" + re.test(String(value).toLowerCase()));
        return (re.test(String(value).toLowerCase() === comp));
    }


    //###################################### zipValidator ################################################

    zipValidator = (value, comp) => {

        //console.log("in zip validator");
        let re = /^[0-9]{5}(?:-[0-9]{4})?$/;
        //console.log("in the zipp " + (re.test(String(value))));
        return (re.test(String(value)) === comp);
    }


    //###################################### ageValidator ################################################

    ageValidator = (value, comp) => {
        //console.log("in age validator");
        let re = /^(?:1[01][0-9]|120|1[7-9]|[2-9][0-9])$/;
        return (re.test(Number(value)) === comp);
    }



    //https://stackoverflow.com/questions/123559/how-to-validate-phone-numbers-using-regex
    //###################################### phoneValidator ################################################

    phoneValidator = (value, comp) => {
    console.log("in phone validator");
    let re = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;
    console.log(" phone validator" + re.test(Number(value)));
    return (re.test(Number(value)) === comp);
}

   // https://www.w3resource.com/javascript/form/email-validation.php
    //###################################### phoneValidator ################################################

    emailValidator = (value, comp) => {
        console.log("in email validator");
        let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        console.log(re.test(String(value)) + "  " + value);
        return (re.test(String(value)) === comp);
    }

    //###################################### Main Validation Run Function  - validate #############################

    validate = (value, rules) => {

        let isValid = true;

        for (let rule in rules) {

            switch (rule) { // has to have every rule from every target !

                case 'requiredValidator':
                {
                    let tempIsValid = true;

                    console.log("In validate : requiredValidator   ");
                    tempIsValid = tempIsValid && this.requiredValidator(value, rules[rule]);
                    if (tempIsValid === false) {
                        console.log("setting true required error exists");
                        this.setStateTopLevel("requiredError", true)
                    } else if(tempIsValid === true) {
                        console.log("setting false required error  does not exist");
                        this.setStateTopLevel("requiredError", false)
                    }

                    isValid = isValid && tempIsValid;

                    break;
                }

                case 'minNameLengthValidator': {

                    let tempIsValid = true;

                    console.log("In validate : minlengthval");

                    tempIsValid = tempIsValid && this.minNameLengthValidator(value, rules[rule]);
                    if (tempIsValid === false) {
                        console.log("setting true min error exists");
                        this.setStateTopLevel("nameTooShortError", true)
                    } else {
                        console.log("setting false min error does not exist");
                        this.setStateTopLevel("nameTooShortError", false)
                    }
                    isValid = isValid && tempIsValid;
                    break;
                }

                case 'maxNameLengthValidator': {

                    let tempIsValid = true;

                    console.log("In validate : maxlengthval");

                    tempIsValid = tempIsValid && this.maxNameLengthValidator(value, rules[rule]);
                    if (tempIsValid === false) {
                        console.log("setting true min error exists");
                        this.setStateTopLevel("nameTooLongError", true)
                    } else {
                        console.log("setting false min error does not exist");
                        this.setStateTopLevel("nameTooLongError", false)
                    }
                    isValid = isValid && tempIsValid;
                    break;
                }
                case 'lettersOnlyValidator': {

                    let tempIsValid = true;

                    console.log("In validate : lettersOnlyValidator");

                    tempIsValid = tempIsValid && this.lettersOnlyValidator(value, rules[rule]);
                    if (tempIsValid === false) {
                        this.setStateTopLevel("lettersOnlyError", true)
                        console.log("setting true letters only error exists");
                    } else {
                        console.log("setting false letters only error does not exist");
                        this.setStateTopLevel("lettersOnlyError", false)
                    }

                    isValid = isValid && tempIsValid;

                    break;

                }




                case 'basicSSNValidator': {

                    let tempIsValid = true;

                    tempIsValid = isValid && this.basicSSNValidator(value);
                    if (!isValid) {
                        this.setStateTopLevel("ssnWrongError", true)
                        console.log("setting ssn wrong error exists");
                    } else {
                    this.setStateTopLevel("ssnWrongError", false)
                        console.log("setting false ssn wrong does not exist");
                    }
                    isValid = isValid && tempIsValid;
                    break;
                }


                /*
                case 'emptyTextFieldValidator':{

                    let tempIsValid = true;

                    isValid = isValid && this.emptyTextFieldValidator(value, rules[rule]);
                    if (!isValid) {
                        this.setState({emptyFieldError: true}, () => {
                            console.log(this.state)
                        })
                    } else {
                        this.setState({emptyFieldError: false}, () => {
                            console.log(this.state)
                        })
                    }
                    break;
                }
                */

                case 'numbersOnlyValidator': {

                    let tempIsValid = true;

                    tempIsValid = isValid && this.numbersOnlyValidator(value, rules[rule]);
                    if (!isValid) {
                        this.setStateTopLevel("numbersOnlyError", true)
                        console.log("setting numbersOnlyError exists");
                    } else {
                        this.setStateTopLevel("numbersOnlyError", false)
                        console.log("setting numbersOnlyError  does not exist");
                    }
                    isValid = isValid && tempIsValid;
                    break;
                }


                case 'minZipLengthValidator': {

                    let tempIsValid = true;

                    tempIsValid = tempIsValid && this.minZipLengthValidator(value, rules[rule]);
                    if (tempIsValid === false) {

                        console.log("setting true zipLengthError  exists");
                        this.setStateTopLevel("zipLengthError", true)
                    } else {
                        console.log("setting false zipLengthError does not exist");
                        this.setStateTopLevel("zipLengthError", false)
                    }
                    isValid = isValid && tempIsValid;
                    break;
                }


                case 'zipValidator': {

                    let tempIsValid = true;

                    tempIsValid = isValid && this.zipValidator(value, rules[rule]);

                    if (tempIsValid === false) {

                        console.log("setting true zipBadCharError  exists");
                        this.setStateTopLevel("zipBadCharError", true)
                    } else {
                        console.log("setting false zipBadCharError does not exist");
                        this.setStateTopLevel("zipBadCharError", false)
                    }
                    isValid = isValid && tempIsValid;

                    break;
                }

                case 'ageValidator': {
                    let tempIsValid = true;
                    tempIsValid = isValid && this.ageValidator(value, rules[rule]);

                    if (tempIsValid === false) {

                        console.log("setting true ageBadCharError  exists");
                        this.setStateTopLevel("ageValidator", true)
                    } else {
                        console.log("setting false ageBadCharError does not exist");
                        this.setStateTopLevel("ageBadCharError", false)
                    }
                    isValid = isValid && tempIsValid;

                    break;
                }

                case 'minStreetLengthValidator': {

                    let tempIsValid = true;

                    tempIsValid = tempIsValid && this.minStreetLengthValidator(value, rules[rule]);
                    if (tempIsValid === false) {
                        console.log("setting true streetTooShortError error exists");
                        this.setStateTopLevel("streetTooShortError", true)
                    } else {
                        console.log("setting false streetTooShortError error does not exist");
                        this.setStateTopLevel("streetTooShortError", false)
                    }
                    isValid = isValid && tempIsValid;
                    break;
                }



                case 'streetValidator': {

                    let tempIsValid = true;

                    tempIsValid = isValid && this.streetValidator(value, rules[rule]);
                    if (tempIsValid === false) {
                        console.log("setting true streetBadCharError error exists");
                        this.setStateTopLevel("streetBadCharError", true)
                    } else {
                        console.log("setting false streetBadCharError error does not exist");
                        this.setStateTopLevel("streetBadCharError", false)
                    }
                    isValid = isValid && tempIsValid;
                    break;
                }

                case 'minCityLengthValidator': {

                    let tempIsValid = true;

                    console.log("In validate : minlengthval");

                    tempIsValid = tempIsValid && this.minCityLengthValidator(value, rules[rule]);
                    if (tempIsValid === false) {
                        console.log("setting true min error exists");
                        this.setStateTopLevel("cityTooShortError", true)
                    } else {
                        console.log("setting false min error does not exist");
                        this.setStateTopLevel("cityTooShortError", false)
                    }
                    isValid = isValid && tempIsValid;
                    break;
                }

                case 'cityValidator': {

                    let tempIsValid = true;

                    tempIsValid = isValid && this.cityValidator(value, rules[rule]);
                    if (tempIsValid === false) {
                        console.log("setting true cityBadCharError error exists");
                        this.setStateTopLevel("cityBadCharError", true)
                    } else {
                        console.log("setting false cityBadCharError error does not exist");
                        this.setStateTopLevel("cityBadCharError", false)
                    }
                    isValid = isValid && tempIsValid;
                    break;
                }

                case 'phoneValidator': {

                    let tempIsValid = true;

                    console.log("in case phone validator");

                    tempIsValid = isValid && this.phoneValidator(value, rules[rule]);
                    if (tempIsValid === false) {
                        console.log("setting true phoneNumberInvalidError error exists");
                        this.setStateTopLevel("phoneNumberInvalidError", true)
                    } else {
                        console.log("setting false phoneNumberInvalidError error does not exist");
                        this.setStateTopLevel("phoneNumberInvalidError", false)
                    }
                    isValid = isValid && tempIsValid;
                    break;
                }

                case 'emailValidator': {

                    let tempIsValid = true;

                    console.log("in case email validator");

                    tempIsValid = isValid && this.emailValidator(value, rules[rule]);
                    if (tempIsValid === false) {
                        console.log("setting true emailInvalidError error exists");
                        this.setStateTopLevel("emailInvalidError", true)
                    } else {
                        console.log("setting false emailInvalidError error does not exist");
                        this.setStateTopLevel("emailInvalidError", false)
                    }
                    isValid = isValid && tempIsValid;
                    break;
                }

            }

        }

        return isValid;
    }


//#####################################################################
//################### Smartystreets support functions #################
//#####################################################################


    //###################################### updateField ################################################
    updateField = (e) => {
        this.updateStateFromForm(e.target.id, e.target.value);
    }

    //##################################### updateCheckbox #################################################
    updateCheckbox = (e) => {
        this.updateStateFromForm(e.target.id, e.target.checked);
    }

    // this may be duplicate functionality
    //##################################### updateStateFromForm #################################################
    updateStateFromForm = (key, value) => {

        console.log( "In updatestateformfunction")
        const newState = {};
        newState[key] = value;

        this.setState({newState}, () => {
            console.log(this.state)
            console.log("done updating a field");});
    }


    //##################################### queryAutocompleteForSuggestions #################################################
    queryAutocompleteForSuggestions(query, hasSecondaries=false) {

        this.setState({showSuggestions:true}, () => {
            //console.log(this.state)
            console.log("done updating a field");});

        const lookup = new SmartyStreetsSDK.usAutocompletePro.Lookup(query);

        if (hasSecondaries) {
            lookup.selected = query;
        }
        //console.log( lookup);
        this.autoCompleteClient.send(lookup)
            .then(results => {
                //console.log( results.result.length);
                this.setState({
                    suggestions: results.result,
                }, () => { console.log(" suggestions are now updated");
                                   // console.log(this.state);
                    }
                )
            })
            .catch(console.warn);
    }
    //#################################### formatAutocompleteSuggestion ##################################################
    formatAutocompleteSuggestion(suggestion) {
        const street = suggestion.streetLine ? `${suggestion.streetLine} ` : "";
        const secondary = suggestion?.secondary ? `${suggestion.secondary} ` : "";
        const entries = suggestion?.entries > 1 ? `(${suggestion.entries} more entries) ` : "";
        const city = suggestion?.city ? `${suggestion.city} ` : "";
        const state = suggestion?.state ? `${suggestion.state}, ` : "";
        const zip = suggestion?.zipcode ? `${suggestion.zipcode}` : "";

        return street + secondary + entries + city + state + zip;
    }

    //##################################### selectSuggestion #################################################
    selectSuggestion=(suggestion)=> {

        console.log("In Select Suggestion " + suggestion )
        if (suggestion.entries > 1) {
            this.queryAutocompleteForSuggestions(this.formatAutocompleteSuggestion(suggestion), true);
        } else {
            this.useAutoCompleteSuggestion(suggestion)
                //.then(() => {
                    //this.validateUsAddress();})

        }
    }

    //##################################### useAutoCompleteSuggestion #################################################
    useAutoCompleteSuggestion = (suggestion) => {
        console.log("in use suggestion");

        this.setState({showSuggestions:false}, () => {
            console.log(this.state)
            //console.log("done updating a field");
        });

        this.handleChangeNoVal(suggestion);


    }


    //################################### validateUsAddress ###################################################
    validateUsAddress = () => {
        console.log("In Validate US Address");
        let lookup = new SmartyStreetsSDK.usStreet.Lookup();
        lookup.street = this.state.street;
        //lookup.street2 = this.state.address2;
        lookup.city = this.state.city;
        lookup.state = this.state.state;
        lookup.zipCode = this.state.zip;

        if (!!lookup.street) {
            this.usStreetClient.send(lookup)
                .then((response) => this.updateStateFromValidatedUsAddress(response, true))
                .catch(e => this.setState({error: e.error}));
        } else {
            this.setState({error: "A street address is required."});
        }
    }

    //################################### updateStateFromValidatedUsAddress ###################################################
    updateStateFromValidatedUsAddress(response, isAutocomplete = false) {
        const lookup = response.lookups[0];
        const isValid = sdkUtils.isValid(lookup);
        const isAmbiguous = sdkUtils.isAmbiguous(lookup);
        const isMissingSecondary = sdkUtils.isMissingSecondary(lookup);
        const newState = {
            error: "",
        };

        if (!isValid) {
            newState.error = "The address is invalid.";
        } else if (isAmbiguous) {
            newState.error = "The address is ambiguous.";
        } else if (isMissingSecondary && !isAutocomplete) {
            newState.error = "The address is missing a secondary number.";
        } else if (isValid) {
            const candidate = lookup.result[0];

            newState.street = candidate.deliveryLine1;
            newState.city = candidate.components.cityName;
            newState.state = candidate.components.state;
            newState.zip = `${candidate.components.zipCode}-${candidate.components.plus4Code}`;
            newState.error = "";
        }

        this.setState(newState);
    }


//#####################################################################
// #################### CODE FROM RANDO ###############################
//#####################################################################
    toggle = () => {

        //console.log(this.state.showmodal);
        this.setState({showmodal: !this.state.showmodal});// added for modal
    }

//#####################################################################
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
                this.setState({shownotokeedokee: true});

            });

            // Now all I need to do is pop a modal that says they have to fill in the missing info


            // } else if (this.state.formIsValid) {
        } else if (true) {


            console.log("valid form - post to server");

           // console.log(this.state.formControls);


            //axios.post('http://localhost:5000/api/riskratios', this.state.formControls).then(res =>{
            axios.post('/api/riskratios', this.state.formControls).then(res => {    // aws

                const newState = update(this.state, {
                    showArray: {
                        dependents: {$set: res.data[0]},
                        income: {$set: res.data[1]},
                        education: {$set: res.data[2]}

                    },
                });

                this.setState(newState);

                console.log(" State" + this.state);
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
               // console.log(this.state); // Note how the callback fixes the async issue with last character

            });

        }

    }


    //############################## handleChangeNoVal   helper change  - no validation #####
    handleChangeNoVal = (suggestion) => {

        const updatedControls = {
            ...this.state.formControls // gives you all of the form controls and all their ste elements
        };

        // all of the state for firstname (or whatever is the target) - particular form control
        const updatedFormElement = {
            ...updatedControls["street"]
        };

        updatedFormElement.value =suggestion.streetLine;
        updatedFormElement.touched = true; // we did enter something - may not be correct yet
        //updatedFormElement.valid = validate(suggestion.streetLine, updatedFormElement.validationRules); // goes though each rule in switch

        updatedControls["street"] = updatedFormElement;

        /////////////////////////////////////////////////////////////////////////////////////
        // all of the state for firstname (or whatever is the target) - particular form control
        const updatedFormElement2 = {
            ...updatedControls["city"]
        };

        console.log("in noval checkig city")

        updatedFormElement2.value =suggestion.city;
        updatedFormElement2.touched = true; // we did enter something - may not be correct yet
        updatedFormElement2.valid = this.validate(suggestion.city, updatedFormElement.validationRules); // goes though each rule in switch

        updatedControls["city"] = updatedFormElement2;

        // all of the state for firstname (or whatever is the target) - particular form control
        const updatedFormElement3 = {
            ...updatedControls["state"]
        };

        updatedFormElement3.value =suggestion.state;
        updatedFormElement3.touched = true; // we did enter something - may not be correct yet
        updatedFormElement3.valid = this.validate(suggestion.state, updatedFormElement.validationRules); // goes though each rule in switch

        updatedControls["state"] = updatedFormElement3;

        const updatedFormElement4 = {
            ...updatedControls["zip"]
        };

        updatedFormElement4.value =suggestion.zipcode;
        updatedFormElement4.touched = true; // we did enter something - may not be correct yet
        updatedFormElement4.valid = this.validate(suggestion.zipcode, updatedFormElement.validationRules); // goes though each rule in switch

        updatedControls["zip"] = updatedFormElement4;

        let formIsValid = true;


        for (let inputIdentifier in updatedControls) {

            if (updatedControls[inputIdentifier].visible) {
                formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
            }
        }




        this.setState({
            formControls: updatedControls,
        }, () => {
            console.log(this.state)
            console.log("done updating a field");



        });
        return(true);

    }
//##################################    handleChange    ###################################
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
        updatedFormElement.valid = this.validate(value, updatedFormElement.validationRules); // goes though each rule in switch

        updatedControls[name] = updatedFormElement;

        let formIsValid = true;


        // VALID FORM CHECK
        // dealing with the conditional display - there has got to be a better way to do this
        // only consider the fields that are visible.
        // we currently walk through all the fields but maybe there is a way to have a set of
        // fields that are in the form actively

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
            //console.log(this.state);


        });

    }

//########################### handleChange2 ##########################################
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


        if (name === "street") {

            console.log(" In street smartyquery section")
            this.queryAutocompleteForSuggestions(e.target.value);
        }



        updatedFormElement.value = value;
        updatedFormElement.touched = true; // we did enter something - may not be correct yet
        updatedFormElement.valid = this.validate(value, updatedFormElement.validationRules); // goes though each rule in switch

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
           // console.log(this.state);

        });

    }


    //#####################################################################
    printValue = e => {

        console.log(e.target.value);

    }

    //########################### Parse Income ##########################################
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

        const value = e.target.value;

        console.log("!!!!!!!!!!!in store income" + value);

        const updatedControls = {
            ...this.state.formControls // gives you all of the form controls and all their ste elements
        };

        // all of the state for firstname (or whatever is the target) - particular form control
        const updatedFormElement = {
            ...updatedControls[name]
        };


        updatedFormElement.value = value;
        updatedFormElement.touched = true; // we did enter something - may not be correct yet
        updatedFormElement.valid = this.validate(value, updatedFormElement.validationRules); // goes though each rule in switch

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

        let nameValid = this.state.formControls[(e.target.getAttribute('name'))].valid;

        // name length must match the validator rule
        //else if(e.target.getAttribute('value').length < this.state.formControls.firstname.minlength && nameValid === false ) {
        if((this.state.nameTooShortError === true || this.state.nameTooLongError === true) && this.state.lettersOnlyError === false  && nameValid === false) {

            console.log("in the name_PopoverLogic name too short if")
            this.setState({
                shownamewronglength: true
            }, () => {
                console.log("set shownamewronglength true");
            });

        }

         else if((this.state.nameTooShortError === true || this.state.nameTooLongError === true) && this.state.lettersOnlyError === true  && nameValid === false) {
                this.setState({
                    shownamewrong: true
                }, () => {
                    console.log("in the name_PopoverLogic name too short but also bad charaacter");
                });

            }

        // is there something there and its not letters only
        else if((this.state.nameTooShortError === false && this.state.nameTooLongError === false) && this.state.lettersOnlyError === true  && nameValid === false) {
            this.setState({
                shownamewrong:true
            }, () => {
                console.log("in the name_PopoverLogic - bad character present");
            });
        }


        else {this.setState({

        }, () => {
            console.log("no name errors detected");
        });

        }

        console.log("Long " + this.state.nameTooLongError + "  Short " + this.state.nameTooShortError  + "  LettersOnly  " + this.state.lettersOnlyError);

    }

    //#######################################################################################
    street_PopoverLogic = (e) => {  // streettooshorterror, street

        console.log("in street_PopoverLogic");

        let nameValid = this.state.formControls[(e.target.getAttribute('name'))].valid;

        //console.log(e.key + "  "+e.target.getAttribute('value').length+"  "+ nameValid + "  "+ e.target.getAttribute('name'));


        // is the field left blank?
        if(e.target.getAttribute('value').length === 0 && nameValid === false ) {  // this may not work  might be "" not zero

            console.log("checking for blank field");
            this.setState({
                showblankfield:true
            }, () => {
                this.handleChange();
                console.log("in the street_PopoverLogic blank field");
            });
        }

        // name length must match the validator rule
        else if(e.target.getAttribute('value').length < this.state.formControls.street.minlength && nameValid === false ) {

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
        else if(nameValid === false ) {
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

        let nameValid = this.state.formControls[(e.target.getAttribute('name'))].valid;

        //console.log(e.key + "  "+e.target.getAttribute('value').length+"  "+ nameValid + "  "+ e.target.getAttribute('name'));


        // is the field left blank?
        if(e.target.getAttribute('value').length === 0 && nameValid === false ) {  // this may not work  might be "" not zero

            console.log("checking for blank field");
            this.setState({
                showblankfield:true
            }, () => {
                this.handleChange();
                console.log("in the city_PopoverLogic blank field");
            });
        }

        // name length must match the validator rule
        else if(e.target.getAttribute('value').length < this.state.formControls.city.validationRules.minLengthValidator && nameValid === false ) {

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
        else if(nameValid === false ) {
            this.setState({
                showcitywrong:true
            }, () => {
                console.log("in the streetcity_PopoverLogic - bad character present");
            });
        }

        // name length limited to 25 characters per passport but it passes basic test
        else if(e.target.getAttribute('value').length > this.state.formControls.city.validationRules.cityLengthValidator && nameValid === true ) {

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

        let nameValid = this.state.formControls[(e.target.getAttribute('name'))].valid;

        //console.log( e.target.getAttribute('value').length+"  "+ nameValid + "  "+ e.target.getAttribute('name'));


        // is the field left blank?
        if(e.target.getAttribute('value').length === 0 && nameValid === false ) {  // this may not work  might be "" not zero

            console.log("checking for blank field");
            this.setState({
                showblankfield:true
            }, () => {
                this.handleChange();
                console.log("in the zip_PopoverLogic blank field");
            });
        }

        // zip is wrong  - small,big, or bad charcters
        else if(nameValid === false ) {



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

        let nameValid = this.state.formControls[(e.target.getAttribute('name'))].valid;

        console.log( "777777"  + nameValid + " " +( e.target.getAttribute('value').length));

        // is the field left blank?

        if(e.target.getAttribute('value').length === 0 ) {  // this may not work  might be "" not zero

            console.log("checking for blank field");
            this.setState({
                showblankfield:true
            }, () => {
                this.handleChange();
                console.log("in the age_PopoverLogic blank field");
            });
        }

        else if((e.target.getAttribute('value').length > 0 ) && (nameValid=== false) ) {
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

        let nameValid = this.state.formControls[(e.target.getAttribute('name'))].valid;

        console.log("6666666" + ((e.target.getAttribute('value').length !== 9) &&  nameValid === false ));

        // todo  special handling for demo cases!!!!

        if(e.target.getAttribute('value') === "123456789" ) {

            this.setState({
                showssnblacklist:true
            }, () => {
                console.log("in the ssn_PopoverLogic blacklist");
            });
        }

        else if(e.target.getAttribute('value') === "555061212" ) {

            // put up the ssn already in use modal
            this.setState({
                showssninuse:true
            }, () => {
                console.log("in the ssn_PopoverLogic ssninuse");
            });
        }


        else if((e.target.getAttribute('value').length === 0)) {

            this.setState({
                showblankfield:true
            }, () => {
                console.log("in the ssn_PopoverLogic function blank field");
            });
        }

        else if((e.target.getAttribute('value').length === 9) && (nameValid === false) ) {
            this.setState({
                showssnwrong:true
            }, () => {
                console.log("in the ssn_PopoverLogic length ok , char bad");
            });
        }

        //else if(e.key === && (e.target.getAttribute('value').length <9 || e.target.getAttribute('value').length >9) && this.valid === false ) {
        else if((e.target.getAttribute('value').length !== 9)&&  nameValid === false ) {

            this.setState({
                showssnwronglength:true
            }, () => {
                console.log("in the ssn_PopoverLogic length long");
            });
        }

        else {this.setState({

        }, () => {
            console.log("in the ssn_PopoverLogic function in else");
        });

        }

    }

    //#######################################################################################
    phone_PopoverLogic = (e) => {

        console.log("In phonepopoever logic");

        let nameValid = this.state.formControls[(e.target.getAttribute('name'))].valid;

        console.log("3333 "+ nameValid);

        if(e.target.getAttribute('value').length === 0 && nameValid === false ) {  // this may not work  might be "" not zero

            console.log("checking for blank field");
            this.setState({
                showblankfield:true
            }, () => {
                this.handleChange();
                console.log("in the phone_PopoverLogic blank field");
            });
        }

        // zip is wrong  - small,big, or bad charcters
        else if(nameValid === false ) {
            this.setState({
                showbadphonenumber: true
            }, () => {
                console.log("in the Phone_PopoverLogic phoneNumberInvalidError");
            });

        }


    }

    //#######################################################################################
    email_PopoverLogic = (e) => {

        let nameValid = this.state.formControls[(e.target.getAttribute('name'))].valid;

        console.log("3334 "+ nameValid);

        if(e.target.getAttribute('value').length === 0 && nameValid === false ) {  // this may not work  might be "" not zero

            console.log("checking for blank field");
            this.setState({
                showblankfield:true
            }, () => {
                this.handleChange();
                console.log("in the email_PopoverLogic blank field");
            });
        }

        // zip is wrong  - small,big, or bad charcters
        else if(nameValid === false ) {
            this.setState({
                showbademail: true
            }, () => {
                console.log("in the email_PopoverLogic emailInvalidError");
            });

        }
    }



    //#######################################################################################
    income_PopoverLogic = (e) => {

        console.log("in income_PopoverLogic");

        let nameValid = this.state.formControls[(e.target.getAttribute('name'))].valid;

        //console.log("income popover valid "+ e.target.getAttribute('name'));

        // is the field left blank?
        if(e.target.getAttribute('value').length === 0 && nameValid === false ) {  // this may not work  might be "" not zero

            console.log("checking for blank field");
            this.setState({
                showblankfield:true
            }, () => {
                this.handleChange();
                console.log("in the income_PopoverLogic blank field");
            });
        }


        else if((e.target.getAttribute('value').length > 0 ) && (nameValid === false) ) {
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
            showssnblacklist:false,
            showbadphonenumber: false,
            showbademail: false,
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

    // #############################################################

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

// ########################################################################

    showSpouse2 = e => {  // called from marital selector

        let fieldname1 = "spouse_firstname";

        const value = e.target.value;

        console.log("showspouse " + value);

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

//###############################################################
//######################  NEW CODE ##############################


    checkValidStateReset = (isValid) => {
        if(isValid == false){ isValid = true;}

    }



    setStateTopLevel = (stateVar, stateVal) => {
    this.setState({
    [stateVar]: stateVal
    }, () => {
        console.log("Setting State " +stateVar+":"+ stateVal); })
    }




    next_prev_select = () => {
        console.log("next_select " + this.state.currentStep)
        switch(this.state.currentStep){
            case 1:
                this.setState({pageName : "Start Here"});
                this.setState({breadcrumbImage: breadcrumb3})
                console.log("I am in case 1");
                break;
            case 2:
                this.setState({pageName : "About You"});
                this.setState({breadcrumbImage: breadcrumb4})
                console.log("I am in case 2");
                break;
        }
    }

    // manages what happens when you press the next button
    _next = () => {
        let currentStep = this.state.currentStep
        currentStep = currentStep >= numpages? numpages: currentStep + 1
        // console.log("In _next");
        //console.log(currentStep);
        this.setState({currentStep: currentStep},
            () => this.next_prev_select()

        )

        // console.log(this.state);
    }



    // manages what happens when you press the previous button
    // can use
    _prev = () => {
        //console.log("In _prev")
        let currentStep = this.state.currentStep
        currentStep = currentStep <= 1? 1: currentStep - 1
        //console.log(currentStep);
        this.setState({currentStep: currentStep},
            () => this.next_prev_select()
        )
    }

    /*
    * the functions for our button
    */


    buttons() {
        let currentStep = this.state.currentStep;

        if(currentStep !==1 && currentStep < numpages ){ // this
            return (
                <FormGroup  as={Row} >
                    <Col className = "text-left">
                        <Button variant="primary" className="mb-3" onClick={this._prev}>
                            Previous
                        </Button>
                    </Col>

                    <Col className="text-right">
                        <Button variant="primary" className="mb-3" onClick={this._next}>
                            Save and Next
                        </Button>
                    </Col>
                </FormGroup>
            )
        }

        else if(currentStep == 1){ // this will refer the first page only
            return (
                <FormGroup  as={Row} >
                    <Col className="text-right">
                        <Button variant="primary" className="mb-3" onClick={this._next}>
                            Save and Next
                        </Button>
                    </Col>
                </FormGroup>
            )
        }
        else if(currentStep == numpages) {  // this refers to the last page only
            return (
                <FormGroup as={Row}>
                    <Col className="text-left">
                        <Button variant="primary"
                                className="mb-3"
                                onClick={this._prev}
                                size='sm'>
                            Previous
                        </Button>
                    </Col>

                    <Col className="text-right">
                        <Button
                            variant="primary"
                            size='sm'
                            className="mb-3"
                            onClick={this.handleSubmit}
                            //disabled={!this.state.formIsValid}
                        > Submit
                        </Button>
                    </Col>
                </FormGroup>


            )
        }
        else {return null;}
    }



    render() {

        console.log( " 5555555"  + this.state.showagewrong );

        const {showFormMortgagePersonalInfoSpouseName, hideFormMortgagePersonalInfoSpouseName, showmodal,
            showssnwrong,showssnwronglength, showblankfield, shownamewrong, shownamewronglength,showstreetwrong,
            showstreetwronglength, showcitywrong, showcitywronglength, showzipwrong, showagewrong,showincomewrong,
            showokeedokee, shownotokeedokee,showssninuse,showssnblacklist,showSuggestions,showbadphonenumber, showbademail} = this.state;
        return (

            <Container className = "container">
                <Form className = "form" noValidate>

                    <Row className=" lheaderdemo  ">

                        <Col sm = {12}  className = "d-sm-block d-lg-none">

                            Data Twin Credit Application Demo R5 - flex
                        </Col>

                        <Col  lg = {12} className = "d-lg-block d-none text-lg-left">

                        Data Twin Credit Application Demo R5 - flex
                        </Col>



                    </Row>


                    <React.Fragment>



                            <displays.Breadcrumb
                                breadcrumbImage = {this.state.breadcrumbImage}
                            />

                            <displays.Page_Header
                                pageName = {this.state.pageName}
                            />

                            <displays.Page1_Name
                                currentStep={this.state.currentStep}
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

                            <displays.Page1_StreetCity
                                currentStep={this.state.currentStep}
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


                            <displays.Page1_StateZip
                                currentStep={this.state.currentStep}
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

                            <displays.Page1_AgeSsn
                                currentStep={this.state.currentStep}
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


                            <displays.Page1_PhoneEmail
                                currentStep={this.state.currentStep}
                                type="text"
                                firstplaceholder={this.state.formControls.phone.placeholder}
                                firstvalue={this.state.formControls.phone.value} // makes this a controlled component
                                firstonChange={this.handleChange2}
                                firstvalid={this.state.formControls.phone.valid}
                                firsttouched={this.state.formControls.phone.touched}
                                lastplaceholder={this.state.formControls.email.placeholder}
                                lastvalue={this.state.formControls.email.value} // makes this a controlled component
                                lastonChange={this.handleChange2}
                                lastvalid={this.state.formControls.email.valid}
                                lasttouched={this.state.formControls.email.touched}
                                firstonBlur = {this.phone_PopoverLogic}
                                lastonBlur = {this.email_PopoverLogic}
                                onFocus = {this.setTouchedOnFocus}
                            />

                            <displays.Page1_MaritalStatus
                                currentStep={this.state.currentStep}
                                maritalstatus={this.state.formControls.maritalstatus.value}
                                showSpouse={this.showSpouse2}
                                hideSpouse={this.hideSpouse2}
                                type="text"
                                value={this.state.formControls.maritalstatus.value} // makes this a controlled component
                                firstvalid={this.state.formControls.maritalstatus.valid}
                                firsttouched={this.state.formControls.maritalstatus.touched}
                                onFocus = {this.setTouchedOnFocus}
                            />

                            {showFormMortgagePersonalInfoSpouseName && !hideFormMortgagePersonalInfoSpouseName && (
                                <displays.Page1_SpouseName
                                    currentStep={this.state.currentStep}
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

                            {showFormMortgagePersonalInfoSpouseName && !hideFormMortgagePersonalInfoSpouseName && (

                                <displays.Page1_SpouseAgeSsn
                                    currentStep={this.state.currentStep}
                                    type="text"
                                    firstplaceholder={this.state.formControls.spouse_age.placeholder}
                                    firstvalue={this.state.formControls.spouse_age.value} // makes this a controlled component
                                    firstonChange={this.handleChange2}
                                    firstvalid={this.state.formControls.spouse_age.valid}
                                    firsttouched={this.state.formControls.spouse_age.touched}


                                    lastplaceholder={this.state.formControls.spouse_ssn.placeholder}
                                    lastvalue={this.state.formControls.spouse_ssn.value} // makes this a controlled component
                                    lastonChange={this.handleChange2}
                                    lastvalid={this.state.formControls.spouse_ssn.valid}
                                    lasttouched={this.state.formControls.spouse_ssn.touched}

                                    firstonBlur = {this.age_PopoverLogic}
                                    lastonBlur = {this.ssn_PopoverLogic}
                                    onFocus = {this.setTouchedOnFocus}

                                /> )}

                            <displays.Page1_bottominfo
                                currentStep={this.state.currentStep}
                            />

                            <displays.Page2_Income
                                currentStep={this.state.currentStep}
                                rawincome={this.state.formControls.rawincome.value}
                                storeIncome={this.storeIncome}
                                placeholder={this.state.formControls.income.placeholder}
                                firstvalid={this.state.formControls.rawincome.valid}
                                firsttouched={this.state.formControls.rawincome.touched}
                                value={this.state.formControls.rawincome.value}
                                onFocus = {this.setTouchedOnFocus}
                                firstonBlur = {this.income_PopoverLogic}

                            />

                            <displays.Page2_Education
                                currentStep={this.state.currentStep}
                                education={this.state.formControls.education.value}
                                handleChange={this.handleChange2}
                                type="text"
                                placeholder={this.state.formControls.education.placeholder}
                                value={this.state.formControls.education.value} // makes this a controlled component
                                firstvalid={this.state.formControls.education.valid}
                                firsttouched={this.state.formControls.education.touched}
                                onFocus = {this.setTouchedOnFocus}
                            />

                            <displays.Page2_Residence
                                currentStep={this.state.currentStep}
                                residence={this.state.formControls.residence.value}
                                handleChange={this.handleChange2}
                                type="text"
                                value={this.state.formControls.residence.value} // makes this a controlled component
                                firstvalid={this.state.formControls.residence.valid}
                                firsttouched={this.state.formControls.residence.touched}
                                onFocus = {this.setTouchedOnFocus}
                            />

                            <displays.Page2_Dependents
                                currentStep={this.state.currentStep}
                                numdependents={this.state.formControls.numdependents.value}
                                parseKids={this.parseKids}
                                type="text"
                                value={this.state.formControls.numdependents.value} // makes this a controlled component
                                firstvalid={this.state.formControls.numdependents.valid}
                                firsttouched={this.state.formControls.numdependents.touched}
                                onFocus = {this.setTouchedOnFocus}
                            />


                            {this.buttons()}


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

                            {showbadphonenumber && (

                                <displays.formfieldResponseModal
                                    show = {this.state.showbadphonenumber}
                                    closeModals = {this.closeModals}
                                    headertext = "The entered phone number is formatted incorrectly!"
                                    bodytext = "Make sure your phone number is formatted like 1-512-633-7777"
                                    width = "modal-70w"
                                />
                            )}

                            {showbademail && (

                                <displays.formfieldResponseModal
                                    show = {this.state.showbademail}
                                    closeModals = {this.closeModals}
                                    headertext = "The entered email is formatted incorrectly!"
                                    bodytext = "Make sure your email is correct"
                                    width = "modal-70w"
                                />
                            )}


                            {showmodal && (
                                <MyModal2
                                    currentStep={this.state.currentStep}
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


                            {showSuggestions && (
                            <Suggestions
                                suggestions={this.state.suggestions}
                                selectSuggestion={this.selectSuggestion}/>
                            )}




                    </React.Fragment>

                </Form>

                <Form>
                    <Col></Col>
                    <Col className=" lheaderdemo text-center">

                        How to use this Demo
                    </Col>
                    <Col>
                        The goal of this demo is to show various ways that verification and user guidance can prevent input errors
                        Verification is typically rudimentary and feedback even worse.  Try to enter a one letter name or enter
                        control characters where numbers usually are or a short or long social.  Try to make mistakes!  If you do
                        and I don't catch it, let me know!!!

                        On Page 2 I am demonstrating more advanced context sensitive error detection.  Try entering $100000 income
                        , 5 kids, and a high school education.  This combination is unusual and is flagged for review.  It may be
                        true but based on a large data base of answers is less likely and indicative of a entry error like an
                        extra zero in income.
                    </Col>
                </Form>

            </Container>

        );
    }
}


//ReactDOM.render(<MasterForm />, document.getElementById('root'))

export default MasterForm;




