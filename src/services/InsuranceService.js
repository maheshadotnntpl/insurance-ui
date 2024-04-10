import axios from "axios";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const CalculatePremium = (customer) => {
    let url = "Insurance/CalcPremium";
    let accessToken = localStorage.getItem('token');    

    let configContentTypeText = {
        headers: { 'Content-Type': 'application/json', 'authorization': `Bearer ${accessToken}` },
    };
     
    return axios.post(baseUrl + url, customer, configContentTypeText);
  };

  const InsuranceService = {
    CalculatePremium,
  }

  export default InsuranceService;