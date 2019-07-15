import React, { Component,} from 'react';
import Typography from '@material-ui/core/Typography';

import CustomButton from '../components/Button';



export default class Home extends Component {

   
    
    handlesClick=ButtonEvent=>{
        console.log("You clicked the signin button");
    }

    
    render() {

        const styles={
            
        }
        
        return (
            <React.Fragment>
                
                    <Typography variant="h4" gutterBottom style={{color:"White",textShadow: "2px 1px 2px rgba(0, 0, 0, 0.98)"}}>
                        SPLIT BILLS WITH YOUR DIGSMATES
                    </Typography>

                    <CustomButton text={"LOG IN/SIGN UP"} onClick={this.handlesClick} ></CustomButton>


            </React.Fragment>
        )
    }
}
