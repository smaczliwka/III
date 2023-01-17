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
    Stack,
    Center,
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

    validateForm() {
        if (!this.state.from) alert('Proszę uzupełnić stację początkową');
        else if (!this.state.to) alert('Proszę uzupełnić stację końcową');
        else if (this.state.from === this.state.to) alert("Stacja początkowa i końcowa muszą się różnić");
        else if (!this.state.date) alert("Proszę wybrać datę przejazdu")
        else return true;
        return false;
    }

    sendRequest() {
        console.log(JSON.stringify(this.state));
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state),
          }
        console.log(requestOptions)
        fetch('http://localhost:4000/', requestOptions)
        .then(res => res.json())
        .then(res => console.log(res));
    }

    handleForm() {
        if (this.validateForm()) {
            this.sendRequest();
        }
    }

    render() {
        return(
            <Box className='search-bar'>

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
            
            <Box>
                <Button
                    size="lg"
                    onClick={() => this.handleForm()}
                    className='search-button'
                >
                    Szukaj
                </Button>
            </Box>

            </Box>
        )
    }
}

class Connection extends React.Component {
    buyTicket() {
        alert('Ta funkcja nie jest jeszcze dostępna');
    }
    render() {
        // const listStations = this.props.stations.map((station) =>  <li>{station}</li>);
        return(
            <Flex as='button' borderRadius='md' className='connection'>
                <Stack direction={['column', 'row']} spacing='24px' className='station-list'>
                {this.props.stations.map((station) => <Center className='station'>{station}</Center>)} 
                </Stack>
                <Center>{this.props.price} zł</Center>
                <Button bg='green' onClick={() => this.buyTicket()}>Kup bilet</Button>
            </Flex>
        )
    }
}

class Connections extends React.Component {
    render() {
        return(
            <Box className='connection-list'>
                {this.props.info.map((info) => <Connection stations={info.stations} price={info.price}></Connection>)}
            </Box>
        )

    }
}

class App extends React.Component {
    // 2. Wrap ChakraProvider at the root of your app
    render() {
        const info = [
            {
            stations: ['Warszawa Centralna', 'Opoczno Południe', 'Miechów', 'Kraków Główny'],
            price: 57.98
            },
            {
            stations: ['Warszawa Centralna', 'Włoszczowa Północ', 'Kraków Główny'],
            price: 48.65
            },
            {
            stations: ['Warszawa Centralna', 'Kraków Główny'],
            price: 37.95
            }
        ]
        return (
            <ChakraProvider>
            <Flex>
                <SearchBar />
                <Connections info={info}></Connections>
            </Flex>
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
  