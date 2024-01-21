import axios, { AxiosResponse } from 'axios';

const fetchSearchResults = async (): Promise<AxiosResponse<any>> => {
  const response = await axios.get(`${process.env.wikiBaseURL}`);
  console.log(response.data);
  return response.data;
};

export { fetchSearchResults };
