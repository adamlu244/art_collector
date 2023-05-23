import React, { useEffect, useState } from 'react';

/**
 * Don't touch these imports!
 */
import { 
  fetchAllCenturies,
  fetchAllClassifications,
  fetchQueryResults
} from '../api';

const Search = (props) => {
  // Make sure to destructure setIsLoading and setSearchResults from the props
  const { setIsLoading, setSearchResults } = props;

  /**
   * We are at the Search component, a child of app. This has a form, so we need to use useState for
   * our controlled inputs:
   * 
   * centuryList, setCenturyList (default should be an empty array, [])
   * classificationList, setClassificationList (default should be an empty array, [])
   * queryString, setQueryString (default should be an empty string, '')
   * century, setCentury (default should be the string 'any')
   * classification, setClassification (default should be the string 'any')
   */

    const [centuryList, setCenturyList] = useState([]);
    const [classificationList, setClassificationList] = useState([]);
    const [queryString, setQueryString] = useState("");
    const [century, setCentury] = useState("any");
    const [classification, setClassification] = useState("any");
    const updateSearchQuery = (event) => setQueryString(event.target.value);
    const updateClassification = (event) => setClassification(event.target.value);
    const updateCentury = (event) => setCentury(event.target.value); 

  /**
   * Inside of useEffect, use Promise.all([]) with fetchAllCenturies and fetchAllClassifications
   * 
   * In the .then() callback pass the returned lists to setCenturyList and setClassificationList
   * 
   * Make sure to console.error on caught errors from the API methods.
   */
  useEffect(() => {
    try {
      Promise.all([fetchAllCenturies(), fetchAllClassifications()]).then((results) => {
        setCenturyList(results[0])
        setClassificationList(results[1])
      })
    } catch(error) {
        console.error(error);
    }
    console.log(centuryList);
    console.log(classificationList);
  }, []);

  /**
   * This is a form element, so we need to bind an onSubmit handler to it which:
   * 
   * calls event.preventDefault()
   * calls setIsLoading, set it to true
   * 
   * then, in a try/catch/finally block:
   * 
   * try to:
   * - get the results from fetchQueryResults({ century, classification, queryString })
   * - pass them to setSearchResults
   * 
   * catch: error to console.error
   * 
   * finally: call setIsLoading, set it to false
   */
  return <form id="search" onSubmit={async (event) => {
    // write code here
    event.preventDefault();
    setIsLoading(true);
    try {
      const results = await fetchQueryResults({ century, classification, queryString });
      setSearchResults(results);
      console.log(results);
    } catch(error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }}>

    <fieldset>
      <label htmlFor="keywords">Query</label>
      <input 
        id="keywords" 
        type="text" 
        placeholder="enter keywords..." 
        value={/* this should be the query string */queryString} 
        onChange={/* this should update the value of the query string */updateSearchQuery}/>
    </fieldset>

    <fieldset>
      <label htmlFor="select-classification">Classification <span className="classification-count">({ classificationList.length })</span></label>
      <select 
        name="classification"
        id="select-classification"
        value={/* this should be the classification */classification} 
        onChange={/* this should update the value of the classification */updateClassification}>
        <option value="any">Any</option>
        {
          /* map over the classificationList, return an <option /> */
          classificationList.map(classification => <option classification-id="classification-id">{classification.name}</option>)
        }
      </select>
    </fieldset>

    <fieldset>
      <label htmlFor="select-century">Century <span className="century-count">({ centuryList.length })</span></label>
      <select 
        name="century" 
        id="select-century"
        value={/* this should be the century */century} 
        onChange={/* this should update the value of the century */updateCentury}>
        <option value="any">Any</option>
        {
          /* map over the centuryList, return an <option /> */
          centuryList.map(century => <option century-id="century-id">{century.name}</option>)
        }
      </select>
     </fieldset>

    <button>SEARCH</button>

  </form>
}

export default Search;