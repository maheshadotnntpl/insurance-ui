import axios from "axios";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const CalculatePremium = (customer) => {
    let url = "Insurance/CalcPremium";
    let configContentTypeText = {
        headers: { 'Content-Type': 'application/json' },
    };
     
    return axios.post(baseUrl + url, customer, configContentTypeText);
 
  };

  const InsuranceService = {
    CalculatePremium,
  }

  export default InsuranceService;