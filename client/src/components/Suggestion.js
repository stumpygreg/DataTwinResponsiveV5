import React, {Component} from "react";
import * as PropTypes from "prop-types";
import "./Suggestion.css";

export default class Suggestion extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isHovered: false,
		};

		this.setIsHovered = this.setIsHovered.bind(this);
		this.buildResultHoverClass = this.buildResultHoverClass.bind(this);
	}

	formatAutocompleteSuggestion(suggestion) {
		const street = suggestion.streetLine ? `${suggestion.streetLine} ` : "";
		const secondary = suggestion?.secondary ? `${suggestion.secondary} ` : "";
		const entries = suggestion?.entries > 1 ? `(${suggestion.entries} more entries) ` : "";
		const city = suggestion?.city ? `${suggestion.city} ` : "";
		const state = suggestion?.state ? `${suggestion.state}, ` : "";
		const zip = suggestion?.zipcode ? `${suggestion.zipcode}` : "";

		return street + secondary + entries + city + state + zip;
	}

	setIsHovered(isHovered) {
		this.setState({isHovered});
	}

	buildResultHoverClass() {
		const className = "autocomplete--suggestion";
		return this.state.isHovered ? className + " autocomplete--suggestion-hover" : className;
	}

	render() {
		//console.log(this.props.suggestion)
		return (
			<div
				className={this.buildResultHoverClass()}
				onClick={this.props.selectSuggestion}
				onMouseEnter={() => this.setIsHovered(true)}
				onMouseLeave={() => this.setIsHovered(false)}
			>
				{this.formatAutocompleteSuggestion(this.props.suggestion)}
			</div>
		);
	}
}

// This is only used during development
Suggestion.propTypes = {
	suggestion: PropTypes.any,
	selectSuggestion: PropTypes.func.isRequired,
};