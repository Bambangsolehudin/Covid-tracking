import React, {useState,useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios'
import moment from 'moment'
import 'moment/locale/id'


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Card from './component/Card';
import Select from 'react-select'


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);




function App() {

  moment.locale('id')

  // Data
  const [datas, setdatas] = useState({})
  const [countries, setcountries] = useState([])
  const [country, setcountry] = useState([])
  // Chart
  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: `Current state in ${country ? country : 'All World'}` },
    },
  };
  const dataChart = {
    labels: ['Infected', 'Recovered', 'Deaths'],
    datasets: [
      {
        label: 'People',
        backgroundColor: ['orange', 'blue', 'rgba(255, 0, 0, 0.5)'],
        data: [datas.confirmed, datas.recovered, datas.deaths],
      },
    ],
  };
  // End Chart


  // Function
  function getCountries() {
    axios.get('https://covid19.mathdro.id/api/countries')
    .then(function (response) {
      setcountries(response.data.countries)
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  function getData(e) {
   let api = ''
   if(e != null){
    setcountry(e.value)
    api = `https://covid19.mathdro.id/api/countries/${e.value}`
   }else{ 
    setcountry(null)
    api =`https://covid19.mathdro.id/api`
   }
   
   axios.get(api)
    .then(function (res) {
      console.log('ss',res.data);
      let coba = {
        confirmed : res.data.confirmed.value,
        deaths : res.data.deaths.value,
        recovered : res.data.recovered.value, 
        lastUpdate: res.data.lastUpdate, 
        }
      setdatas(coba)
    }).catch(function (error) {
      console.log(error);
    })
  }


  // Lifecycle
  useEffect(() => {
    getCountries()
    getData(null)
  }, []);


  return (
    <div className='container'>
      <div className="row justify-content-center my-5">
        <img src="image.png" alt="" width={370} />
      </div>

      {/* CARD */}
      <div className="d-flex justify-content-center">
        <Card region={country} type="Confirmed" title="Confirmed" total={datas.confirmed} date={moment(datas.lastUpdate).format('LL')} time={moment(datas.lastUpdate).format('LT')} addClass="border-warning bg-warning" />
        <Card region={country} type="Recovered" title="Recovered" total={datas.recovered} date={moment(datas.lastUpdate).format('LL')} time={moment(datas.lastUpdate).format('LT')} addClass="border-primary bg-primary" />
        <Card region={country} type="Deaths" title="Deaths" total={datas.deaths} date={moment(datas.lastUpdate).format('LL')} time={moment(datas.lastUpdate).format('LT')} addClass="border-danger bg-danger" />
      </div>

      {/* Dropdown Menu */}
      <div className="row justify-content-center my-5">
        <div className="col-8">
          <Select options={countries.map(e=> {return{value:e.name,label:e.name}})} onChange={getData} />
        </div>
      </div>

      {/* Chart */}
      <div className="row justify-content-center my-5">
        <div className="col-9">
          <Bar options={options} data={dataChart} />; 
        </div>
      </div>
    
    </div>
  );
}

export default App;
