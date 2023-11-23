import axios from "axios";
import pageloader from '../images/spinner.gif';

const url = process.env.REACT_APP_API_URL

const AxiosService = axios.create({
    baseURL: url,
    headers: {
        "Content-Type": "application/json"
    }
});

AxiosService.interceptors.request.use(
    config => {
  
      let div = document.createElement('div')
      div.setAttribute('class','pageLoader')
      div.setAttribute('id','loader')
  
      let image = document.createElement('img')
      image.setAttribute('src',pageloader)
  
      div.appendChild(image)
      document.body.appendChild(div)
  
      return config;
    },
    error => {
      const element = document.getElementById("loader");
      element.remove();
      return Promise.reject(error)
    }
  );
  
  AxiosService.interceptors.response.use(
    response => {
      const element = document.getElementById("loader");
      element.remove();
      return response;
    },
    error => {
      const element = document.getElementById("loader");
      element.remove();
     return Promise.reject(error)
    }
  );

export default AxiosService;