import { Container, TextField } from '@material-ui/core';
import React from 'react'

const Article4 = () => {
    const [result, setResult] = React.useState(false); 
    const chkBucket = (data) => {
        const ck1 = check({str: data, data1: "{", data2: "}"});
      const ck2 = check({str: data, data1: "[", data2: "]"});
      const ck3 = check({str: data, data1: "(", data2: ")"});
      setResult(ck1 && ck2 && ck3);
    } 
    
    const check = ({str, data1, data2}) => {
        var data = str.split('');
      var count1 = 0;
      var count2 = 0;
      
      data.map(d => {
          if(d === data1){
            count1++;
        }
        if(d=== data2){
            count2++;
        }
      });
        if(str.includes(data1) || str.includes(data2)){
          if(str.includes(data1) || str.includes(data2)){
            if(count1 === count2){
              return true;
          }else{
              return false;
          }
        }else{
            return false;
        }
      }else{
          return true;
      }
    }
    return <Container>
        <div style={{display: "flex", flexDirection: "column", justifyContent: "center", marginTop: 10}}>
            <TextField id="checkBK" onInput={e => chkBucket(e.target.value)} label="กรอกข้อมูล" variant='outlined'/>
            <label>Result: {result.toString()}</label>
        </div>
    </Container>
}

export default Article4;