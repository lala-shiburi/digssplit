import React from 'react';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import Downshift from 'downshift';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';

function renderInput(inputProps) {
	const { InputProps, classes, ref, classesUnderline, ...other } = inputProps;

	return (
		<TextField
			required
			InputProps={{
				inputRef: ref,
				classes: {
					underline: classesUnderline.underline,
					root: classes.inputRoot,
					input: classes.inputInput
				},
				...InputProps
			}}
			{...other}
		/>
	);
}

function renderSuggestion(suggestionProps) {
	const {
		suggestion,
		index,
		itemProps,
		highlightedIndex,
		selectedItem
	} = suggestionProps;
	const isHighlighted = highlightedIndex === index;
	const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;

	return (
		<MenuItem
			{...itemProps}
			key={suggestion.label}
			selected={isHighlighted}
			component="div"
			style={{
				fontWeight: isSelected ? 500 : 400
			}}
		>
			{suggestion.label}
		</MenuItem>
	);
}
renderSuggestion.propTypes = {
	highlightedIndex: PropTypes.number,
	index: PropTypes.number,
	itemProps: PropTypes.object,
	selectedItem: PropTypes.string,
	suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired
};

function getSuggestions(value, suggestions, { showEmpty = false } = {}) {
	const inputValue = deburr(value.trim()).toLowerCase();
	const inputLength = inputValue.length;
	let count = 0;

	return inputLength === 0 && !showEmpty
		? []
		: suggestions.filter(suggestion => {
				const keep =
					count < 5 &&
					suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

				if (keep) {
					count += 1;
				}

				return keep;
		  });
}

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1
	},
	container: {
		flexGrow: 1,
		position: 'relative'
	},
	paper: {
		position: 'absolute',
		width: '100%',
		zIndex: 1,
		marginTop: theme.spacing(1),
		// left: '18%',
		right: 0
	},
	inputRoot: {
		flexWrap: 'wrap',
		width: '100%'
		// left: '18%'
	},
	inputInput: {
		width: 'auto',
		flexGrow: 1
	}
}));

export default function IntegrationDownshift(props) {
	const { handleAutoComplete, suggestions, classesUnderline } = props;
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Downshift
				id="downshift-simple"
				// onStateChange={state => }
				onChange={selection => {
					handleAutoComplete(selection);
				}}
			>
				{({
					clearSelection,
					getInputProps,
					getItemProps,
					getLabelProps,
					getMenuProps,
					highlightedIndex,
					inputValue,
					isOpen,
					selectedItem
				}) => {
					const { onBlur, onFocus, ...inputProps } = getInputProps({
						onChange: event => {
							if (event.target.value === '') {
								clearSelection();
							}
						},
						placeholder: 'Search for a Digs'
					});

					return (
						<div className={classes.container}>
							{renderInput({
								fullWidth: true,
								classes,
								classesUnderline,
								InputLabelProps: getLabelProps({ shrink: true }),
								InputProps: { onBlur, onFocus },
								inputProps
							})}

							<div {...getMenuProps()}>
								{isOpen ? (
									<Paper className={classes.paper} square>
										{getSuggestions(inputValue, suggestions).map(
											(suggestion, index) =>
												renderSuggestion({
													suggestion,
													index,
													itemProps: getItemProps({ item: suggestion.label }),
													highlightedIndex,
													selectedItem
												})
										)}
									</Paper>
								) : null}
							</div>
						</div>
					);
				}}
			</Downshift>
		</div>
	);
}
