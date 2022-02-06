import { Container } from '@material-ui/core';
import React from 'react'

const Article3 = () => {
    const [data,setData] = React.useState({});
    const [countrys, setCountrys] = React.useState([]);
    const [regions, setRegions] = React.useState([]);
    const getCountry =async () => {
        const data = [
            {name:'Thailand', addr: 'th', remark: '', regionld: 1},
            {name:'Singapore', addr: 'sg', remark: 'This is sg', regionld: 1},
            {name:'United State', addr: 'US', remark: '', regionld: 7}
          ]
          return data;
    }
    const getRegion = async() => {
        const data = [
            {id: 1, name: 'Asia'},
            {id: 2, name: 'South America'},
            {id: 7, name: 'North America'},
        ]
        return data;
    }
    

    console.log(data);
    React.useEffect(()=>{
        const getData = async () => {
            const country =await getCountry();
            const region = await getRegion();
            setCountrys(country);
            setRegions(region);
            var result = {};
            const test = country.map(ct => {
                const d = {[`"${ct.addr.toUpperCase()}"`]: region.find(f=>f.id === ct.regionld).name};
                result = {...result,...d};
              });
            setData(result);
          }
        getData();
    },[]);
    return <Container>
            <div style={{display: "flex",marginTop: 10,flexDirection: "column", justifyContent: 'center'}}>
                <div>
                    <h3>Country:</h3> {countrys.map(c => <p key={c.name}>Name: {c.name}, addr: {c.addr}, remark: {c.remark}, regionld: {c.regionld}</p>)}
                </div>
                <div>
                    <h3>Regions:</h3> {regions.map(r => <p key={r.id}>id: {r.id}, name: {r.name}</p>)}
                </div>
                <div>
                    <h3>Result: </h3> {JSON.stringify(data)}
                </div>
            </div>
        </Container>
}

export default Article3;