import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function EnumeratedCertificationComponent({myList,selectedItem,setSelectedItem}) {
  const handleItemSelection = (event, newValue) => {
    if (newValue) {
      // console.log("my newVAlue",newValue);
      setSelectedItem(newValue);
    }
  };

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={myList}
      sx={{ width: 300, marginRight:'1%' }}
      value={selectedItem}
      onChange={handleItemSelection}
      isOptionEqualToValue={(option, value) => {
        // console.log("lets print option", option);
        // console.log("lets print value", value);
        return option.label === value.label;
      }}
      renderInput={(params) => <TextField {...params} size="small" label="Certification" />}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
