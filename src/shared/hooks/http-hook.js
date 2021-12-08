import { useState, useCallback, useRef, useEffect } from 'react';

//this hook will do what we manually do in each component for us.
//hooks start with 'use' 
export const useHttpClient = () => {
//1.manage loading and error state
  const[isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

//14. useRef here is reference of a piece of data which will not change/not be reinitialized when this function runs again. and, this function does run again whenever the component which uses this hook rerenders. Stores data across rerender cycles.
  const activeHttpRequests = useRef([])

//2. this is now a reusable function 
//11. to avoid infinite loops, wrap sendRequest function in useCallback so that this function never gets recreated when the component that uses this hook re-renders. This function has on specific dependencies so second argument is an empty array. Ensures we dont have inefficient rerender cycles or infinite loops. 
  const sendRequest = useCallback(async (url, method = 'GET', body=null, headers= {}) => {
//7. manage loading state
    setIsLoading(true);
//15. abortController() is an API supported in modern browsers
    const httpAbortCtrll = new AbortController();
//16. add this to activeHttpRequests. useRef always wraps the data you store in it in an object which has a current property 
    activeHttpRequests.current.push(httpAbortCtrll);

//6. wrap inside try/catch; set error to error message
    try {
//3. call fetch, send it to url and pass configuration listed above
      const response = await fetch(url, {
        method, 
        body, 
        headers,
//17. assign abortController to request. this links abortController to this request
        signal: httpAbortCtrll.signal
       });
//4. extract response data and check status code 
       const responseData = await response.json();
//20. 
       activeHttpRequests.current = activeHttpRequests.current.filter(
         reqCtrl => reqCtrl !== httpAbortCtrll
       );
       
//5. throw error if 400/500 response code 
       if(!response.ok) {
        throw new Error(responseData.message);
      }
 

//9. if make to success case-> need to return responseData so that the component which uses this hook and uses this function can handle the data because we need the data in that component
      setIsLoading(false);
      return responseData;

    } catch(err) {
      setError(err.message);
      setIsLoading(false);
//19. so that component using this hook knows that somethings wrong
      throw err;
    }
  }, []);

//13. 
  const clearError = () => {
    setError(null);
  };

//18. useEffect() to make sure we dont continue w request thats on its way out if we switch away from the component that triggered the request. when you return a function then the returned function is executed as clean up function before the next time useEffect runs again OR when the component that uses useEffect (the component that uses this custom hook) unmounts. This is added logic to make sure that we never continue with a request that is on its way out if we then switch away from the component that triggers the request.
  useEffect( () => {
    return () => {
      let activeReqs = activeHttpRequests.current;
      activeReqs.forEach(abortCtrl => {
        abortCtrl.abort();
      })
    };
  }, []) 
//10. the component that uses this hook will need access to the state managed & the functions, so return them in an object.
  return { isLoading, error, sendRequest, clearError }
};