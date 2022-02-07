/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import Axios, { AxiosError } from 'axios';

export type RequestMethod = 'GET' | 'POST' | 'DELETE' | 'PUT';

export interface RequestObject {
  url: string;
  data?: any;
  contentType?: string;
  method: RequestMethod;
  dataType?: any;
  cache?: boolean;
  header: any;
  params?: any;
}

export function catchAxiosError(err: AxiosError) {
  let message = 'Something happened in setting up the request that triggered an Error';
  console.log(err.response);
  if (err.response) {
    return err.response.data;
  }
  if (err.request) {
    message = 'The request was made, but no response was received';
  }

  return {
    message,
    status: '404',
    path: '',
    subErrors: undefined,
    timestamp: new Date(),
  };
}

export const ApiCallService = (function () {
  const api = Axios.create({
    baseURL: 'http://localhost:8080/api',
  });

  function request(requestObj: RequestObject) {
    return api({
      method: requestObj.method,
      params: requestObj.params,
      url: requestObj.url,
      data: requestObj.data,
      headers: requestObj.header,
    })
      .then(response => response.data)
      .catch(error => {
        throw catchAxiosError(error);
      });
  }

  return { request };
})();
