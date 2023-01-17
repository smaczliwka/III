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
    Center,
} from '@chakra-ui/react'


class SearchBar extends React.Component {
    render() {
        return(
            <Box className='search-bar'>

            <Box className='form'>
            <FormLabel>Z</FormLabel>
            <Select
                placeholder='Stacja początkowa'
                name='from'
                onChange={(event) => this.props.handleChange(event)}
            >
                <option>Gdańsk Główny</option>
                <option>Tczew</option>
                <option>Malbork</option>
                <option>Prabuty</option>
                <option>Susz</option>
                <option>Iława Główna</option>
                <option>Działdowo</option>
                <option>Mława</option>
                <option>Ciechanów</option>
                <option>Nowy Dwór Mazowiecki</option>
                <option>Legionowo</option>
                <option>Warszawa Wschodnia</option>
                <option>Warszawa Centralna</option>
                <option>Warszawa Zachodnia</option>
                <option>Grodzisk Mazowiecki</option>
                <option>Żyrardów</option>
                <option>Skierniewice</option>
                <option>Koluszki</option>
                <option>Tomaszów Mazowiecki</option>
                <option>Opoczno Południe</option>
                <option>Włoszczowa Północ</option>
                <option>Miechów</option>
                <option>Kraków Główny</option>
            </Select>
            </Box>

            <Box className='form'>
            <FormLabel>Do</FormLabel>
            <Select
                placeholder='Stacja końcowa'
                name='to'
                onChange={(event) => this.props.handleChange(event)}
            >
                <option>Gdańsk Główny</option>
                <option>Tczew</option>
                <option>Malbork</option>
                <option>Prabuty</option>
                <option>Susz</option>
                <option>Iława Główna</option>
                <option>Działdowo</option>
                <option>Mława</option>
                <option>Ciechanów</option>
                <option>Nowy Dwór Mazowiecki</option>
                <option>Legionowo</option>
                <option>Warszawa Wschodnia</option>
                <option>Warszawa Centralna</option>
                <option>Warszawa Zachodnia</option>
                <option>Grodzisk Mazowiecki</option>
                <option>Żyrardów</option>
                <option>Skierniewice</option>
                <option>Koluszki</option>
                <option>Tomaszów Mazowiecki</option>
                <option>Opoczno Południe</option>
                <option>Włoszczowa Północ</option>
                <option>Miechów</option>
                <option>Kraków Główny</option>
            </Select>
            </Box>

            <Box className='form'>
            <FormLabel>Klasa</FormLabel>
            <RadioGroup
                defaultValue='2'
                name='class'
                onChange={(event) => this.props.handleValue('class', event)}
            >
                <HStack spacing='24px'>
                <Radio value='1'>1</Radio>
                <Radio value='2'>2</Radio>
                </HStack>
            </RadioGroup>
            </Box>

            <Box className='form'>
            <FormLabel>Maksymalna liczba zmian miejsc</FormLabel>
            <NumberInput
                min={0}
                max={3}
                defaultValue={0}
                onChange={(event) => this.props.handleValue("changes", event)}
            >
                <NumberInputField />
                <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
            </Box>

            <Box className='form'>
            <DatePicker
                name='date'
                size='sm'
                onChange={(event) => this.props.handleValue("date", event)}
            />
            </Box>

            <Box className='form'>
            <FormLabel>Godzina odjazdu</FormLabel>
            <NumberInput
                min={0}
                max={23}
                defaultValue={12}
                onChange={(event) => this.props.handleValue("hour", event)}
            >
                <NumberInputField />
                <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
            </Box>
            
            <Box className='form'>
                <Button
                    size="lg"
                    onClick={() => this.props.handleForm()}
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
        const depDate = new Date(Date.parse(this.props.depTime));
        const arrDate = new Date(Date.parse(this.props.arrTime));
        return(
            <Flex borderRadius='md' className='connection'>
                <Flex direction={['column', 'row']} spacing='24px' className='station-list'>
                {this.props.stations.map((station, index) => <Center className='station' key={index}>{station}</Center>)} 
                </Flex>
                <Center>Odjazd: {depDate.toLocaleString('pl-PL')}</Center>
                <Center>Przyjazd: {arrDate.toLocaleString('pl-PL')}</Center>
                <Button bg='green' onClick={() => this.buyTicket()}>Kup bilet</Button>
            </Flex>
        )
    }
}

class Connections extends React.Component {
    render() {
        return(
            <Box className='connection-list'>
                {this.props.info.map((info, index) =>
                    <Connection
                        stations={info.stations}
                        depTime={info.depTime}
                        arrTime={info.arrTime}
                        key={index}
                    />)}
            </Box>
        )

    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                from: null,
                to: null,
                changes: '0',
                class: '2',
                date: null,
                hour: '12',
            },
            connections: [],
        };
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            form: {
                ...this.state.form,
                [name]: value,
            }
        });
    }

    handleValue(name, value) {
        this.setState({
            form: {
                ...this.state.form,
                [name]: value,
            }
        });
        console.log(this.state);
    }

    validateForm() {
        if (!this.state.form.from) alert('Proszę uzupełnić stację początkową');
        else if (!this.state.form.to) alert('Proszę uzupełnić stację końcową');
        else if (this.state.form.from === this.state.form.to) alert("Stacja początkowa i końcowa muszą się różnić");
        else if (!this.state.form.date) alert("Proszę wybrać datę przejazdu")
        else return true;
        return false;
    }

    sendRequest() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state.form),
          }
        fetch('http://localhost:4000/', requestOptions)
        .then(res => res.json())
        .then(res => this.setState({connections: res}));
    }

    handleForm() {
        if (this.validateForm()) {
            this.sendRequest();
        }
    }

    render() {
        return (
            <ChakraProvider>
            <Flex>
                <SearchBar
                    handleChange={(event) => this.handleChange(event)}
                    handleValue={(name, value) => this.handleValue(name, value)}
                    handleForm={() => this.handleForm()}
                />
                <Connections info={this.state.connections}></Connections>
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
  