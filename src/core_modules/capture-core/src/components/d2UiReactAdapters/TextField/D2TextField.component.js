// @flow
import * as React from 'react';
import defaultClasses from '../../d2Ui/textField/textField.mod.css';
import Input from '../internal/Input/Input.component';

type Classes = {
    input?: ?string,
    inputWrapper?: ?string,
};

type Props = {
    classes?: ?Classes,
    inputRef?: ?(ref: any) => void,
};

class D2TextField extends React.Component<Props> {
    render() {
        const { inputRef, classes: optionalClasses, ...passOnProps } = this.props;
        const classes = optionalClasses || {};

        return (
            <div
                className={defaultClasses.container}
            >
                <Input
                    classes={classes}
                    inputRef={inputRef}
                    {...passOnProps}
                />
            </div>
        );
    }
}

export default D2TextField;
