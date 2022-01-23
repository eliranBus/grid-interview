import React, {useState, useEffect} from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';


export default function Grid({ config, data }) {
  
  const [configField, setConfigField] = useState([]);
  
  let titles = [];
  let rowsData = [];

  useEffect(() => {
    config.forEach(title => {
      titles.push(title.field);
    });

    data.forEach(obj => {
      Object.keys(obj).forEach((key, value) => {
        if(titles.includes(key)){
          rowsData.push(obj[key]);
        }
      })
    });
    
    setConfigField(titles);
  }, [config, data])


  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {configField.map(title => (
              <TableCell key={title} align="left">{title}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((element, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {config.map((obj, index) => {
                if('component' in obj) {
                    const TagName = obj.component;
                    return (
                      <TableCell key={index} component="th" scope="row">
                          <TagName data={element[obj.field]}/>
                      </TableCell>
                    )
                  } else {
                     return (
                      <TableCell key={index} component="th" scope="row">
                        {element[obj.field]}
                      </TableCell>
                     ) 
                  }
                })
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}