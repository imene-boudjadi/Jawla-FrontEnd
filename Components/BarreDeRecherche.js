import React from 'react'
import Image from 'next/image'
import boutonRecherche from '../public/boutonRecherche.png'
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';



import SearchIcon from '@mui/icons-material/Search';
import {  Position, SideSheet, Pane, Heading, Paragraph, Tablist, Tab, Card, Button } from 'evergreen-ui'

import RechercheAutoComplete from './RechercheAutoComplete'

import { makeStyles } from '@mui/styles';
import { BorderAllTwoTone } from '@mui/icons-material';
import FilterListIcon from '@mui/icons-material/FilterList';

import { Listbox, Transition } from '@headlessui/react'

import { useState,Fragment } from 'react';

const useStyles = makeStyles((theme) => ({
  autocomplete: {
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#00BFA4', // Couleur de la bordure lorsqu'il est en état de focus
    },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#00BFA4', // Couleur de la bordure lorsqu'il est survolé
    },
    '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]': {
      backgroundColor: 'white', // Couleur de fond souhaitée
      borderRadius : '15px',
      '& fieldset': {
        borderColor: '#00BFA4', // Couleur de la bordure souhaitée
        borderRadius: '15px',
        borderWidth: '2px'
      },
    },
  },
}));

export const BarreDeRecherche = ({data, sendDataToParent}) => {
  const classes = useStyles();
  
  const [isShown, setIsShown] = React.useState(false)
  const [inputValue, setInputValue] = useState(null);


  const categories = ["Monument historique", "Musée", "Parcs et jardins",null];
  const themes = ["Art et culture", "Histoire et patrimoine culturel", "Sciences et technologie",null];

  const [filtrage, setFiltrage] = useState({
    term :"",
    category :"",
    theme:"",
    etatOuverture:""
  });

  const [selectedCateg, setSelectedCateg] = useState(categories[0])
  const [selectedTheme, setSelectedTheme] = useState(null)
  const handleChange = (event, value) => {
    console.log(inputValue)
    setInputValue(value);
    console.log(inputValue)
    console.log(inputValue)
  };

  async function filtrer (selectedCateg,selectedTheme)  { 
      setIsShown(false);
      try {
        const response = await axios.post('http://localhost:4000/lieu/RechercheLieu', {term : null, category : selectedCateg, theme : selectedTheme, etatOuverture:null});
        console.log(response.data)
        sendDataToParent(response.data);
        return response.data;
      } catch (error) {
        console.error('Une erreur s\'est produite lors de la récupération des données de l\'API :', error);
        return null;
      }
    }
    async function filtrerTexte (input)  { 
      setIsShown(false);
      try {
        const response = await axios.post('http://localhost:4000/lieu/RechercheLieu', {term : input, category : null, theme : null, etatOuverture:null});
        console.log(response.data)
        sendDataToParent(response.data);
        return response.data;
      } catch (error) {
        console.error('Une erreur s\'est produite lors de la récupération des données de l\'API :', error);
        return null;
      }
    }

    async function annuler ()  { 
      setIsShown(false);
      try {
        const response = await axios.get('http://localhost:4000/lieu');
        console.log(response.data)
        sendDataToParent(response.data);
        return response.data;
      } catch (error) {
        console.error('Une erreur s\'est produite lors de la récupération des données de l\'API :', error);
        return null;
      }
    }


  

  

  return (
    <div className='flex items-center flex-row justify-center space-x-4 '>
      <Stack spacing={2} sx={{ width: 400}} >
        <Autocomplete
          className={classes.autocomplete}
          id="free-solo-demo"
          size="medium"
          freeSolo
          options={data.map((option) => option.titre)}
          renderInput={(params) => <TextField {...params} label="Rechercher" />}
          value={inputValue}
          onChange={handleChange}
        />
        
      </Stack>
      <button className='mx-15 bg-myCustomColor  p-3 rounded-full' onClick={()=>{filtrerTexte(inputValue)}}>
          <SearchIcon style={{ color: 'white' }}/> {/* Icône de recherche */}
      </button>
      <button className='mx-15 bg-myCustomColor  p-3 rounded-full' onClick={()=>setIsShown(true)}>
      <FilterListIcon style={{ color: 'white' }}  />
      </button>



      <div className="slido">
        <React.Fragment >
        <SideSheet
          position={Position.LEFT}
          isShown={isShown}
          onCloseComplete={() => setIsShown(false)}
          containerProps={{
            display: 'flex',
            flex: '1',
            flexDirection: 'column'
          }}
        >
          <Pane zIndex={111111111111} flexShrink={0} elevation={1111111111} backgroundColor="white">
            <Pane padding={16} borderBottom="muted">
              <Heading size={600}>Filtrage</Heading>
              <Paragraph size={400} color="muted">
                Recherchez les lieux avec précision
              </Paragraph>
            </Pane>
          </Pane>
          <Pane flex="1" overflowY="scroll" background="tint1" padding={16}>
            <Card
              backgroundColor="white"
              elevation={0}
              height={240}
            >
              
              <h1 className='mx-5 pt-5'>Categorie :</h1>
              <div className='w-1/2 h-50 m-5'>
      <Listbox value={selectedCateg} onChange={setSelectedCateg}>
        <div className="relative mt-1">
          <Listbox.Button className="relative z-0 w-full max-h-60 cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{selectedCateg}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              {/* <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              /> */}
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-111111111111111111111 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {categories.map((categ, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={categ}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {categ}
                      </span>
                      {/* {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null} */}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
          
          
          
          
          
          </div>


              <h1>Thèmes :</h1>
              <div className='w-1/2 h-50px m-5'>
      <Listbox value={selectedTheme} onChange={setSelectedTheme}>
        <div className="relative mt-1 h-100">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{selectedTheme}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              {/* <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              /> */}
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {themes.map((categ, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={categ}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {categ}
                      </span>
                      {/* {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null} */}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
          
          
          
          
          
          </div>
            </Card>
            
          <div className='flex align-center w-150 x-space-50'>
            
            <Button className='my-5 mr-5' onClick={()=>{filtrer(selectedCateg,selectedTheme)}} variant="contained">Filtrer</Button>
            <Button className='my-5' onClick={()=>{annuler()}} variant="outlined">Annuler</Button>

            
          </div>
          </Pane>
        </SideSheet>
        
      </React.Fragment>
        </div>



    </div>
    
    
  )
}



