import React, { Component,} from 'react';
import TemplatePage from './TemplatePage';

export default class Home extends Component {
    render() {
        return (
            <React.Fragment>
                <TemplatePage>
                    I'm the child I guess
                </TemplatePage>

            </React.Fragment>
        )
    }
}
