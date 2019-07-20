import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function CheckBox(props) {
	const { member, handleCheckBox,index,item} = props;
	return (
		<React.Fragment>
			<FormGroup row>
				<FormControlLabel
					control={
						<Checkbox
							// checked={checked}
							onChange={(e)=>handleCheckBox(e,index)}
							value={member+','+item}
						/>
					}
					label={member}
					
				/>
			</FormGroup>
	
		</React.Fragment>
		
		
	);
}
