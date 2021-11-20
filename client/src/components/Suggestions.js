import React from "react";
import Suggestion from "./Suggestion";

export default function Suggestions(props) {

		if (props.suggestions.length > 1) {
		console.log("In suggestions" + props.suggestions.length)

		const suggestionList = props.suggestions;

		return <div className={"autocomplete--suggestions"}>

			My Suggestions:



				{suggestionList.map((suggestion, key) => <Suggestion
						key={key}
						suggestion={suggestion}
						selectSuggestion={() => props.selectSuggestion(suggestion)}
					/>)}


		</div>;
	}

	else {return(null);}
}

