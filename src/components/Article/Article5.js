import { Button, Container, TextField } from '@material-ui/core';
import React from 'react'

const Article5 = () => {
    const [result, setResult] = React.useState('');
    const [inputData, setInputData] = React.useState({
        inputN: 0,
        inputM: 0
    });
    const setDataResult = (e) => {
        const value = e.target.value;
        const id = e.target.id;
        console.log(!isNaN(parseInt(value)))
        if(!isNaN(value)){
            setInputData({...inputData, [id]: parseInt(value)});
        }else{
            setInputData({...inputData, [id]: 0})
        }
        
        
    }
    const sum = ({n,m}) =>{
        console.log(n,m)
        const nn = m-(n-1);
        var step1 = n+m;
        console.log(step1)
        var step2 = step1/2
        var step3 = step2*nn;
        const r = ((n+m)/2)*nn;
        console.log(r,step3)
        return r.toString();
    }
    const cal =() => {
        var re = "";
        if(inputData.inputN >= inputData.inputM){
            re = 'Not Calculate.';
        }else{
            if(inputData.inputN >=0 && inputData.inputM >= 0)
            re = sum({n: inputData.inputN, m: inputData.inputM});
            else re='Not Calculate.';
        }
        setResult(re);
    }
    
    return <Container>
        <div style={{display: "flex", flexDirection: "column", justifyContent: "center", marginTop: 10, padding: 20, gap: 20}}>
            <TextField id="inputN" onInput={setDataResult} label="กรุณากรอกค่า n" variant='outlined'/>
            <TextField id="inputM" onInput={setDataResult} label="กรุณากรอกค่า m" variant='outlined'/>
            <Button variant="contained" color="primary" onClick={() => cal()}>Calculate</Button>
            <label>Result: {result}</label>
        </div>
    </Container>
}

export default Article5;