import { Box } from '@chakra-ui/react';
import React, { Component } from 'react';
import SliderButtons from './SliderButtons';

export default class Slider extends Component {
    constructor() {
        super();
        this.state = {
            sources: [
                'https://image.shutterstock.com/image-vector/check-back-soon-hand-lettering-600w-1379832464.jpg',
                'https://image.shutterstock.com/image-vector/crazy-vibes-modern-hand-lettering-600w-1369665122.jpg',
                'https://image.shutterstock.com/image-vector/happy-hour-lettering-phrase-postcard-600w-1384196654.jpg',
                'https://image.shutterstock.com/image-vector/hand-drawn-summer-illustration-vector-600w-427761994.jpg',
                'https://image.shutterstock.com/image-vector/thank-you-text-vector-illustration-600w-1900962022.jpg',
            ],
            item: 0,
        };
    }
    previous = () => {
        console.log('previous');
        let item = this.state.item;
        if (item > 0) {
            item = item - 1;
            this.setState({ item });
        } else {
            item = this.state.sources.length - 1;
            this.setState({ item });
        }
    };
    next = () => {
        console.log('next');
        let item = this.state.item;
        if (item < this.state.sources.length - 1) {
            item = item + 1;
            this.setState({ item });
        } else {
            item = 0;
            this.setState({ item });
        }
    };
    render() {
        return (
            <div>
                <Box
                    boxSize='sm'
                    marginTop={'50px'}
                    marginLeft={'30%'}
                    marginRight={'32%'}
                    padding={'50px'}
                    border={'2px solid'}>
                    <img
                        src={this.state.sources[this.state.item]}
                        alt={this.state.item}
                        border={'2px solid'}
                    />
                </Box>
                <Box boxSize={'sm'} marginLeft={'45%'} marginTop={'50px'}>
                    <SliderButtons next={this.next} previos={this.previous} />
                </Box>
            </div>
        );
    }
}
