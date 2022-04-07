import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Button, ButtonGroup } from '@chakra-ui/react';
import React, { Component } from 'react';

export default class SliderButtons extends Component {
    render() {
        return (
            <div>
                <ButtonGroup variant='outline' spacing='6' colorScheme='blue'>
                    <Button
                        leftIcon={<ArrowBackIcon />}
                        onClick={this.props.previos}
                        colorScheme='teal'
                        variant='solid'>
                        Previous
                    </Button>
                    <Button
                        rightIcon={<ArrowForwardIcon />}
                        onClick={this.props.next}
                        colorScheme='teal'
                        variant='outline'>
                        Next
                    </Button>
                </ButtonGroup>
            </div>
        );
    }
}
