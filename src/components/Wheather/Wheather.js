import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './Wheather.scss';
import { withRouter } from "react-router-dom";

function LoginForm(props) {
    const [responseData,setResponseData]=useState({})

useEffect(()=>{

    axios.get('http://www.7timer.info/bin/astro.php?lon=113.2&lat=23.1&ac=0&unit=metric&output=json&tzshift=0')
        .then(function (response) {
            if(response.status === 200){
                setResponseData(response.data)
                console.log(response.data.dataseries,"response")
            }

        })
        .catch(function (error) {
            console.log(error);
        });

},[])
var count=0;
console.log(responseData,"responseData")
    return(
        <>
    <nav className="navbar navbar-dark bg-primary" style={{width: '100%',marginTop: 50}}> 
            <div className="row col-12 d-flex justify-content-center text-white">

                Wheather Report
            </div>
        </nav>
        <div class="main container">
            <div class="row">
            <div class="col-xs-12">
                <div class="col-xs-12 col-sm-12 col-sm-offset-12 col-lg-12 col-lg-offset-12 weather-panel">
                <div class="col-xs-6">
                    <h2>Chennai<br/><small>May 24, 2016</small></h2>
                    <p class="h3"><i class="mi mi-fw mi-lg mi-rain-heavy"></i> Rainy</p>
                </div>
                <div class="col-xs-12 text-center">
                    <div class="h1 temperature">
                    <span>12°</span>
                    <br/>
                    <small>8° / 13°</small>
                    </div>
                </div>
                <div >
                    
                    <ul class="list-inline forecast">
                        
                   {
                   responseData!=={}&&responseData.dataseries&&responseData.dataseries.map((data)=>{
                    count++
                     if(count===1){data.day='Sunday'}else if(count===2){data.day='Monday'}else if(count===2){data.day='Tuesday'}else if(count===3){data.day='Wednesday'}
                     else if(count===4){data.day='Thursday'}else if(count===5){data.day='Friday'}else if(count===6){data.day='Saturday';count=0}

                   return(
                   <li className="row">
                        <div className="row">
                     
                        <div style={{ width: '75px'}}><h3 class="h5" >{data.day}</h3></div>
                        <p><i class="mi mi-fw mi-2x mi-sun"></i></p>{data.cloudcover}/{data.temp2m}°
                        <h3 class="h5">{data.prec_type}</h3>
                        <h3 class="h5">{data.wind10m.direction}</h3>
                        <h3 class="h5">{data.wind10m.speed}</h3>
                        </div>
                    </li>
               )})
                 } 
                   
                    </ul>
                
                </div>
                
                </div>
            </div>
            </div>
         </div>
      </>
    )
}

export default withRouter(LoginForm);