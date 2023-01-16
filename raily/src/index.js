import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { DatePicker } from 'chakra-datetime-picker';

import {
    Button,
    ChakraProvider,
    Select,
    Box,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    RadioGroup,
    Radio,
    HStack,
    FormLabel,
    Flex,
    Spacer,
} from '@chakra-ui/react'


class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            from: null,
            to: null,
            changes: '0',
            class: '2',
            date: null,
            hour: '12',
        };
    }

    handleChange(event) {
        console.log(event);
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value,
        });
        console.log(this.state);
    }

    handleValue(name, value) {
        console.log(value);
        this.setState({
            [name]: value,
        });
        console.log(this.state);
    }

    sendRequest() {
        console.log('dupa');
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state),
          }
        fetch('/', requestOptions);
    }

    render() {
        return(
            <Box className='search-bar'>

            <Box>
                <Button
                    size="lg"
                    onClick={() => this.sendRequest()}
                    className='search-button'
                >
                    Szukaj
                </Button>
            </Box>

            <Box>
            <FormLabel>Z</FormLabel>
            <Select
                placeholder='Stacja początkowa'
                name='from'
                onChange={(event) => this.handleChange(event)}
            >
                <option>Warszawa Centralna</option>
                <option>Kraków Główny</option>
            </Select>
            </Box>

            <Box>
            <FormLabel>Do</FormLabel>
            <Select
                placeholder='Stacja końcowa'
                name='to'
                onChange={(event) => this.handleChange(event)}
            >
                <option>Warszawa Centralna</option>
                <option>Kraków Główny</option>
            </Select>
            </Box>

            <Box>
            <FormLabel>Klasa</FormLabel>
            <RadioGroup
                defaultValue='2'
                name='class'
                onChange={(event) => this.handleValue('class', event)}
            >
                <HStack spacing='24px'>
                <Radio value='1'>1</Radio>
                <Radio value='2'>2</Radio>
                </HStack>
            </RadioGroup>
            </Box>
            <Box>
            <FormLabel>Maksymalna liczba zmian miejsc</FormLabel>
            <NumberInput
                min={0}
                max={3}
                defaultValue={0}
                onChange={(event) => this.handleValue("changes", event)}
            >
                <NumberInputField />
                <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
            </Box>
            <Box>
            <DatePicker
                name='date'
                size='sm'
                onChange={(event) => this.handleValue('date', event)}
            />
            </Box>
            <Box>
            <FormLabel>Godzina odjazdu</FormLabel>
            <NumberInput
                min={0}
                max={23}
                defaultValue={12}
                onChange={(event) => this.handleValue("hour", event)}
            >
                <NumberInputField />
                <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
            </Box>
            
            </Box>
        )
    }
}

class App extends React.Component {
    // 2. Wrap ChakraProvider at the root of your app
    render() {
        return (
            <ChakraProvider>
            <SearchBar />
            </ChakraProvider>
        )        
    }
}
  
// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
    <App />
    </React.StrictMode>
);
  