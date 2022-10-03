import React from 'react'
import CountUp from 'react-countup';


function Card(props) {
  return (
      <div className={`col-3 w-100 my-4 mx-2 border p-4 `}>
          <h6>{props.type}</h6>
          <h4> {props.total ? <CountUp separator="," start={0} end ={props.total} duration={2.5} />   : '0'} </h4> 
          <p> <span className='text-secondary'> Last Updated at :</span> <br /> <span className='h6'>{props.date}, {props.time} </span></p>
          <p className='text-secondary'> Number of {props.title} cases of COVID-19</p>
          <h6>{props.region !=null ? props.region : 'All World'}</h6>
          <div className={`border p-1 w-100 mt-3 ${props.addClass}`}></div>
      </div>
  )
}

export default Card