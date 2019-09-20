import React from 'react';
import { FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';

export default function CheckBox(props) {
	const { digsMate, handleCheckBox, index, item } = props;
	return (
		<React.Fragment>
			<FormGroup row>
				<FormControlLabel
					control={
						<Checkbox
							onChange={e => handleCheckBox(e, index)}
							value={digsMate + ',' + item}
							key={digsMate + ',' + item}
						/>
					}
					label={digsMate}
				/>
			</FormGroup>
		</React.Fragment>
	);
}
