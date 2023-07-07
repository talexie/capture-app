// @flow
import React from 'react';
import { withTextFieldFocusHandler } from '../TextInput/withFocusHandler';
import { TextInput } from '../TextInput/TextInput.component';

type Props = {
    onBlur: (value: any) => void,
    onChange?: ?(value: any) => void,
}

class DateInputPlain extends React.Component<Props> {
    handleBlur = (event) => {
        this.props.onBlur(event);
    }

    handleChange = (event) => {
        this.props.onChange && this.props.onChange(event.currentTarget.value);
    }

    render() {
        // $FlowFixMe[prop-missing] automated comment
        const { onBlur, onChange, value, ...passOnProps } = this.props;
        const newValue = value ? new Date(value).toLocaleDateString('sv', { calendar: 'ethiopic' })?.replace(/ERA\d+\s*/g, '')?.trim() : value;
        return (
            // $FlowFixMe[cannot-spread-inexact] automated comment
            <TextInput
                value={newValue || ''}
                onBlur={this.handleBlur}
                onChange={this.handleChange}
                {...passOnProps}
            />
        );
    }
}

export const DateInput = withTextFieldFocusHandler()(DateInputPlain);
