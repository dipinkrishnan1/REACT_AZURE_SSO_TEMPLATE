import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import * as React from 'react';
import PropTypes from 'prop-types';
import EnumeratedCertificationComponent from '../EnumeratedCertificationComponent';


const myList = [
  { label: 'DIM', year: 1994 },
  { label: 'Data Activation', year: 1972 },
  { label: 'Data as an Asset', year: 1974 },
  { label: 'Others', year: 2008 }
];
LandDDate.propTypes = {
  handleSelectedChartData: PropTypes.func,
  fromDate: PropTypes.any,
  setFromDate: PropTypes.func,
  toDate: PropTypes.any,
  setToDate: PropTypes.func,
  selectedItem: PropTypes.any,
  setSelectedItem: PropTypes.func
};
export default function LandDDate({handleSelectedChartData,fromDate,setFromDate,toDate,setToDate,selectedItem,setSelectedItem}) {
  // const [fromDate, setFromDate] = useState();
  // const [toDate, setToDate] = useState();
  // const [selectedItem, setSelectedItem] = useState(null);
  const [fieldValidation, setfieldValidation] = useState('');

  const validateDateRange = (start, end) => {
    if (start && end && start > end) {
      setfieldValidation('To date must be on or after the from date.');
    } else {
      setfieldValidation('');
    }
  };

  function handleCertification() {
    console.log("lets get get date and certification", fromDate.format('YYYY-MM-DD'),
      toDate.format('YYYY-MM-DD'), selectedItem);
    const response = {
      "certificate": {
        "name": "Others",
        "data": [
          30,
          25,
          36,
          30,
          45,
          35,
          64,
          52,
          59,
          36,
          39
        ]
      }

    }
    handleSelectedChartData(response);

  }

  return <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Box
      display="flex"
      sx={{ marginLeft: '2%',marginRight: '2%',marginTop: '2%', width: '90%', justifyContent: 'space-between' }}>
      <EnumeratedCertificationComponent myList={myList} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
      <DatePicker
        slotProps={{ textField: { size: 'small' } }}
        sx={{ marginRight:'1%' }}
        format="YYYY-MM-DD"
        label="From Date"
        onChange={(newValue) => {
          setFromDate(newValue);
          validateDateRange(newValue, toDate);
        }}
      />
      <DatePicker
        label="To Date"
        minDate={fromDate}
        format="YYYY-MM-DD"
        onChange={(newValue) => {
          setToDate(newValue);
          validateDateRange(fromDate, newValue);
        }}
        slotProps={{
          textField: {
            helperText: fieldValidation,
            size: 'small'
          }
        }}
      />
       <Button
        disabled={!(fromDate && toDate && selectedItem && !fieldValidation)}
        sx={{ marginLeft: '2%'}}
        onClick={() => { handleCertification(); }}
        variant="contained"
        size="small">
        <SearchIcon />
       </Button>
    </Box>
  </LocalizationProvider>
}