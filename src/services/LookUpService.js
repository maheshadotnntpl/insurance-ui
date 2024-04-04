import axios from "axios";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const GetOccupations = () => {
    let url = "LookUp/GetOccupations";
    let configContentTypeText = {
        headers: { 'Content-Type': 'application/json' },
    };
     
    return axios.get(baseUrl + url,  configContentTypeText);
 
  };

  const LookUpService = {
    GetOccupations,
  }

  export default LookUpService;