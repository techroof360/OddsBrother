import React, { useState, useEffect } from "react";
import Autosuggest from "react-autosuggest";
import AutosuggestHighlightMatch from "autosuggest-highlight/match";
import AutosuggestHighlightParse from "autosuggest-highlight/parse";
import "../AutoSuggest.css";

function renderSuggestion(suggestion, { query }) {
  //console.log(suggestion);
  const suggestionText = `${suggestion.name}`; //`${suggestion.first} ${suggestion.last}`;
  const matches = AutosuggestHighlightMatch(suggestionText, query);
  const parts = AutosuggestHighlightParse(suggestionText, matches);

  return (
    <span className={"suggestion-content " + suggestion.name}>
      <span className="name">
        {parts.map((part, index) => {
          const className = part.highlight ? "highlight" : null;

          return (
            <span className={className} key={index}>
              {part.text}
            </span>
          );
        })}
      </span>
    </span>
  );
}
//const renderSuggestion = suggestion => <div>{suggestion.name}</div>;

class AutosuggestField extends React.Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: "",
      suggestions: []
    };
  }

  escapeRegexCharacters = str => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  };

  getSuggestions = value => {
    const escapedValue = this.escapeRegexCharacters(value.trim());

    if (escapedValue === "") {
      return [];
    }

    const regex = new RegExp("\\b" + escapedValue, "i");
    return this.props.list.filter(bookie =>
      regex.test(this.getSuggestionValue(bookie))
    );
  };

  getSuggestionValue = bookie => {
    return `${bookie[this.props.label]}`;
  };

  onChange = (event, { newValue, method }) => {
    if (method == "click") {
      this.props.list.filter(bookie => {
        if (bookie.name.trim() === newValue.trim()) {
          this.props.onChange(bookie[this.props.id]);
        }
      });
    }

    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { id, value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Type for suggestions",
      value,
      onChange: this.onChange
    };

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}

export default AutosuggestField;
