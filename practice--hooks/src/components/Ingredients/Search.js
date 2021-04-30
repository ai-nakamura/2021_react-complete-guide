import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';
import useHttp from '../../hooks/http';
import ErrorModal from '../UI/ErrorModal';

const Search = React.memo(props => {
  const [ enteredFilter, setEnteredFilter ] = useState('');
  const { onLoadIngredients } = props;
  const inputRef = useRef();
  const {
    isLoading,
    data,
    error,
    sendRequest,
    clear
  } = useHttp();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (enteredFilter === inputRef.current.value) {
        const query = enteredFilter.length === 0
          ? ''
          : `?orderBy="title"&equalTo="${enteredFilter}"`;
        sendRequest(
          'https://react-hooks-update-d72ef-default-rtdb.firebaseio.com/ingredients.json' + query,
          'GET'
        );
        // fetch('https://react-hooks-update-d72ef-default-rtdb.firebaseio.com/ingredients.json' + query)
        //   .then(response =>
        //     response.json()
        //   )
        //   .then(responseData => {
        //     const loadedIngredients = [];
        //     for (const ingredientKey in responseData) {
        //       loadedIngredients.push({
        //         id: ingredientKey,
        //         title:  responseData[ingredientKey].title,
        //         amount: responseData[ingredientKey].amount
        //       });
        //     }
        //     onLoadIngredients(loadedIngredients);
          // });
      }
    }, 500);
    // clean up: runs before the next useEffect
    return () => {
      clearTimeout(timer);
    };
  }, [enteredFilter, inputRef, sendRequest]);

  useEffect( () => {
    if (!isLoading && !error && data) {
      const loadedIngredients = [];

      for (const ingredientKey in data) {
        loadedIngredients.push({
          id: ingredientKey,
          title:  data[ingredientKey].title,
          amount: data[ingredientKey].amount
        });
      }
      onLoadIngredients(loadedIngredients);
    }
  }, [isLoading, error, data, onLoadIngredients])


  return (
    <section className="search">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          {isLoading && <span>Loading...</span>}
          <input
            ref={inputRef}
            type="text"
            value={enteredFilter}
            onChange={event => setEnteredFilter(event.target.value)} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
