import axios from "axios";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const Authenticate = (data) => {
    let url = "Account/login";
    let configContentTypeText = {
        headers: { 'Content-Type': 'application/json' },
    };
     
    return axios.post(baseUrl + url, JSON.stringify({ username: data.get('username'), password: data.get('password') }), configContentTypeText);
  };

  const AccountService = {
    Authenticate,
  }

  export default AccountService;