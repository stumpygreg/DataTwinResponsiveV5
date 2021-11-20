
import React from 'react';
import Masterform from '../../src/App.js'

class Validate extends React.Component {

    constructor(props) {
        super(props);
    };


//https://www.codeproject.com/Articles/651609/Validating-Social-Security-Numbers-through-Regular
    const
    basicSSNValidator = (value) => {
        //strip hyphens out of string
        var newValue = value.replace(/-/g, "");
        // basic check that you only have 9 numbers
        let re = /^\d{9}$/;
        console.log("basic test :" + re.test(String(newValue)));
        return re.test(String(newValue));
    }


    const
    minLengthValidator = (value, minLength) => {

        Masterform.setStateTopLevel('nameTooShortError', true);
        //console.log("in min length validator " + value.length + "  " + minLength);
        return (value.length >= minLength);
    }

    const
    requiredValidator = (value, comp) => {
        //console.log("in required validator");
        return ((value.trim() !== '') === comp);
    }

// actually name validator
// https://stackoverflow.com/questions/2385701/regular-expression-for-first-and-last-name
// Alexander Burakevych
    const
    lettersOnlyValidator = (value, comp) => {
        //console.log("in letters only validator");
        let re = /^[a-zA-Z'.-]*$/;
        return ((re.test(String(value).toLowerCase())) === comp);
    }

    const
    emptyTextFieldValidator = (value, comp) => {
        //console.log("in empty field validator");
        //console.log("value  " + (value.length === 0));
        //console.log("comp  " + (comp));
        //console.log("emptyfield evaluator results  " + ((value.length == 0) == comp));


        return ((value.length === 0) === comp);

    }

//https://stackoverflow.com/questions/19715303/regex-that-accepts-only-numbers-0-9-and-no-characters
//Michael Liu
//
    const
    numbersOnlyValidator = (value, comp) => {

        //console.log("in numbers only validator");
        //accept one or more digits
        let re = /^[0-9]+$/;
        //console.log(re.test(Number(value)));
        return (re.test(Number(value)) === comp);


    }


    const
    streetValidator = (value, comp) => {

        //console.log("in street validator");
        let re = /\d+[ ](?:[A-Za-z0-9.-]+[ ]?)+(?:Avenue|Lane|Road|Boulevard|Drive|Street|Ave|Dr|Rd|Blvd|Ln|St)\.?/;
        return (re.test(String(value).toLowerCase()) === comp);

    }


    const
    cityValidator = (value, comp) => {

        console.log("in city validator");
        let re = /^[a-zA-Z]+(?:(?:\\s+|-)[a-zA-Z]+)*$/;
        //console.log("retest" + re.test(String(value).toLowerCase()));
        return (re.test(String(value).toLowerCase() === comp));

    }

    const
    cityLengthValidator = (value, comp) => {

        console.log("in city length validator");
        //console.log("retest" + re.test(String(value).toLowerCase()));
        return (value.length < (comp + 1));
    }


    const
    zipValidator = (value, comp) => {

        //console.log("in zip validator");

        //let re = /^[0-9]{5}$/
        let re = /^[0-9]{5}(?:-[0-9]{4})?$/;

        //console.log("in the zipp " + (re.test(String(value))));
        return (re.test(String(value)) === comp);
    }


    const
    ageValidator = (value, comp) => {


        //console.log("in age validator");
        let re = /^(?:1[01][0-9]|120|1[7-9]|[2-9][0-9])$/;
        return (re.test(Number(value)) === comp);


    }

    const
    validate = (props, value, rules) => {

        let isValid = true;

        for (let rule in rules) {

            switch (rule) { // has to have every rule from every target !
                case 'minLengthValidator':
                    console.log("In minlengthval");
                    isValid = isValid && this.minLengthValidator(value, rules[rule]);
                    if (!isValid) {
                        Masterform.setStateTopLevel("nameTooShortError", true)
                    } else {
                        Masterform.setStateTopLevel(props.nameTooShortError, false)
                    }
                    break;
                case 'requiredValidator':
                    isValid = isValid && this.requiredValidator(value, rules[rule]);
                    break;
                case 'lettersOnlyValidator':
                    isValid = isValid && this.lettersOnlyValidator(value, rules[rule]);
                    if (!isValid) {
                        this.setState({lettersOnlyError: true}, () => {
                            console.log(this.state)
                        })
                    } else {
                        this.setState({lettersOnlyError: false}, () => {
                            console.log(this.state)
                        })
                    }
                    break;
                case 'basicSSNValidator':
                    isValid = isValid && this.basicSSNValidator(value);
                    break;
                case 'emptyTextFieldValidator':
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
                case 'numbersOnlyValidator':
                    isValid = isValid && this.numbersOnlyValidator(value, rules[rule]);
                    break;
                case 'zipValidator':
                    isValid = isValid && this.zipValidator(value, rules[rule]);
                    break;
                case 'ageValidator':
                    isValid = isValid && this.ageValidator(value, rules[rule]);
                    break;
                case 'cityValidator':
                    isValid = isValid && this.cityValidator(value, rules[rule]);
                    break;
                case 'streetValidator':
                    isValid = isValid && this.streetValidator(value, rules[rule]);
                    break;
                case 'cityLengthValidator':
                    isValid = isValid && this.cityLengthValidator(value, rules[rule]);
                    break;


                //default: isValid = true;
            }

        }


        //console.log( "isvalid " + isValid)
        return isValid;
    }

}

export default Validate;