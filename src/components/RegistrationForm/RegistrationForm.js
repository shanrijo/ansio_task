import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './RegistrationForm.css';
import { withRouter } from "react-router-dom";

function RegistrationForm(props) {
    const [Result , setResult] = useState([])

const [Validation,setValidation]=useState({

      first_name: {
        value: "",
        validation: [
            { name: "required" },
            { name: "alphabetsOnly" },
          ],
        error: null,
        errmsg: null,
      },
      last_name: {
        value: "",
        validation: [
          { name: "required" },
          { name: "alphabetsOnly" },
        ],
        error: null,
        errmsg: null,
      },
      gender: {
        value: "",
        validation: [],
        error: null,
        errmsg: null,
      },
      address: {
        value: "",
        validation: [{ name: "required" }],
        error: null,
        errmsg: null,
      }, 
      age: {
        value: "",
        validation: [{ name: "required" },{ name: "above15" },{ name: "allowNumaricOnly1" }],
        error: null,
        errmsg: null,
      },
      marital_status: {
        value: "",
        validation: [{ name: "required" }],
        error: null,
        errmsg: null,
      },
      children: {
        value: "",
        validation: [{ name: "required" }],
        error: null,
        errmsg: null,
      },
      termsAndcondition: {
        value: "",
        validation: [{ name: "required" }],
        error: null,
        errmsg: null,
      }, 
})

function checkValidation(textValue, validatorsArray) {
    for (var valid in validatorsArray) {//check validations through array

      if (textValue == "") {//check value is empty
        if (validatorsArray[valid].name == 'required') {
          return { msg: "Field required", state: false };//validation occurs break the loop & throw the error
        }
      } else if (validatorsArray[valid].name == "alphabetsOnly") {
        var re = /^[A-Za-z]+$/;
        if (re.test(textValue) == false) {
          return { msg: "Please Enter Alphabets only", state: false };
        }
      } else if (validatorsArray[valid].name == "alphabetwithspace") {
        var re = /^[a-zA-Z ]*$/;
        if (re.test(textValue) == false) {
          return { msg: "Please Enter Alphabets only", state: false };
        }
      }else if (validatorsArray[valid].name == "above15") {
        // var re = /^[a-zA-Z ]*$/;
        if (textValue<16) {
          return { msg: "Age must be above 15", state: false };
        }
      }else if (validatorsArray[valid].name == "allowNumaricOnly1") {
        var re = /^[0-9]*\.?[0-9]*$/;
        if (re.test(textValue) == false ) {
          return { msg: "Please Enter Numeric Value only", state: false };
        }
      }
    }
    return { msg: "", state: true };//if no error throw empty message
  }

  useEffect(()=>{
if(Validation.marital_status.value!=='Married'){
    Validation.children.validation=[]
}else{
    Validation.children.validation=[{ name: "required" }]  
}
  },[Validation.marital_status.value])

   
  const handleValidation=(e)=>{
    let {id , value} = e.target   

  if(id==='termsAndcondition'&&document.getElementById("termsAndcondition").checked===true){
      value='checked'
  }else if(id==='termsAndcondition'&&document.getElementById("termsAndcondition").checked===false){
      value=''
  }
        var errorcheck = checkValidation(
            value,
            Validation[id].validation
          );
   
        let dynObj = {
            value: value,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: Validation[id].validation,
          };
      
          setValidation((prevState) => ({
            ...prevState,
            [id]: dynObj,
          }));
    console.log(value,"valueee")

   }


    const handleSubmitClick = (e) => {
        e.preventDefault();
        var mainvalue = {};
        var targetkeys = Object.keys(Validation);
        for (var i in targetkeys) {
          var errorcheck = checkValidation(
            Validation[targetkeys[i]].value,
            Validation[targetkeys[i]].validation
          );
          Validation[targetkeys[i]].error = !errorcheck.state;
          Validation[targetkeys[i]].errmsg = errorcheck.msg;
          mainvalue[targetkeys[i]] = Validation[targetkeys[i]].value;
        }
        let filtererr = targetkeys.filter((obj) => Validation[obj].error == true);


        if (filtererr.length > 0) {
          setResult([])
        }else{
            const register_details=[{
                first_name : Validation.first_name.value,
                last_name: Validation.last_name.value,
                gender : Validation.gender.value,
                address : Validation.address.value,
                age:Validation.age.value,
                marital_status: Validation.marital_status.value,
                children: Validation.children.value,
                termsAndcondition: Validation.termsAndcondition.value

            }]
            setResult({register_details})
          
        }

        setValidation((prevState) => ({
            ...prevState,
          }));
    }
    console.log(Result,"Validation")
    return(
        <div style={{width:' 100%',display: 'flex'}}>
        <div className="card col-12 col-lg-6 login-card mt-2 hv-center" >
            <form>
                <div className="form-group text-left">

      
            <label htmlFor="exampleInputEmail1">First Name</label>
                <input type="text" 
                       className="form-control" 
                       id="first_name" 
                       placeholder="Enter First Name" 
                       value={Validation.first_name.value}
                       onChange={(e)=>handleValidation(e)} 
                />
                <span style={{color: "red"}}>{Validation.first_name.errmsg}</span>
                <br/>

                <label htmlFor="exampleInputEmail1">Last Name</label>
                <input type="text"  
                       className="form-control" 
                       id="last_name" 
                       placeholder="Enter Last Name" 
                       value={Validation.last_name.value}
                       onChange={(e)=>handleValidation(e)} 
                />
                <span style={{color: "red"}}>{Validation.last_name.errmsg}</span>
                <br/>

                    
                <label htmlFor="exampleInputEmail1">Gender</label>
                <select  type="select"  
                       className="form-control" 
                       id="gender" 
                       placeholder="Enter Gender" 
                       value={Validation.gender.value}
                       onChange={(e)=>handleValidation(e)} 
                >
                  <option >Select </option>
                <option value={'Male'}>Male </option>
                <option value={'Female'}>Female</option>
                </select>
                <span style={{color: "red"}}>{Validation.gender.errmsg}</span>
                <br/>

                    
                <label htmlFor="exampleInputEmail1">Full Address</label>
                <input type="text"  
                       className="form-control" 
                       id="address" 
                       placeholder="Enter Address" 
                       value={Validation.address.value}
                       onChange={(e)=>handleValidation(e)} 
                />
                <span style={{color: "red"}}>{Validation.address.errmsg}</span>
                <br/>

                <label htmlFor="exampleInputEmail1">Age</label>
                <input type="text"  
                       className="form-control" 
                       id="age" 
                       placeholder="Enter Age" 
                       value={Validation.age.value}
                       onChange={(e)=>handleValidation(e)} 
                />
                <span style={{color: "red"}}>{Validation.age.errmsg}</span>
                <br/>
                    
                <label htmlFor="exampleInputEmail1">Marital Status</label>
                <select  type="select"  
                       className="form-control" 
                       id="marital_status" 
                       placeholder="Enter Marital Status" 
                       value={Validation.marital_status.value}
                       onChange={(e)=>handleValidation(e)} 
                >
                <option >Select </option>
                <option value={'Married'}>Married </option>
                <option value={'Un Married'}>Un Married </option>
                </select>
                <span style={{color: "red"}}>{Validation.marital_status.errmsg}</span>
                <br/>

                    
                {Validation.marital_status.value==='Married'&&<><label htmlFor="exampleInputEmail1">Children</label>
                <input type="text"  
                       className="form-control" 
                       id="children" 
                       placeholder="Enter Children" 
                       value={Validation.children.value}
                       onChange={(e)=>handleValidation(e)} 
                />
                <span style={{color: "red"}}>{Validation.children.errmsg}</span></>
                }
                <br/>
                <input type="checkbox" 
                id="termsAndcondition" 
                value={Validation.termsAndcondition.value}
                onClick={(e)=>handleValidation(e)} 
                />&nbsp;
                <label style={{fontSize: '0.7rem'}} htmlFor="exampleInputEmail1">Terms and condition</label>
                <span style={{color: "red"}}>{Validation.termsAndcondition.errmsg}</span>
                <br/>
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
                    style={{marginTop: -35}}
                >
                    Register
                </button>
            </form>
            {/* <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div> */}
 
        </div>
        {Result.register_details&&<div className="card col-12 col-lg-6 login-card mt-2 hv-center" >
            {Result.register_details&&JSON.stringify(Result)}

        </div> }
        </div>
    )
}

export default withRouter(RegistrationForm);