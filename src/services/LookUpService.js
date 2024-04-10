import axios from "axios";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const GetOccupations = () => {
    let url = "LookUp/GetOccupations";    
    let accessToken = localStorage.getItem('token');

    let configContentTypeText = {
        headers: { 'Content-Type': 'application/json', 'authorization': `Bearer ${accessToken}` },
    };
     
    return axios.get(baseUrl + url,  configContentTypeText);
  };

  const LookUpService = {
    GetOccupations,
  }

  export default LookUpService;