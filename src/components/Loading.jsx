import React, { useState, useEffect } from 'react';
import { LoadingProgress, LoadingArt,
  LoadingQuotes, LoadingLogo } from '../styles/loading';
import { QUOTES_DATA } from '../data';
import logoHeader2 from '../images/logoHeader2.svg';

function Loading() {
  const [quote, setQuote] = useState('...');
  useEffect(() => {
    const quotes = Object.values(QUOTES_DATA);
    const number = quotes[Math.floor((Math.random() * quotes.length))];
    setQuote(number);
  }, []);

  return (
    <LoadingProgress>
      <LoadingLogo src={ logoHeader2 } alt="logo-app" />
      <LoadingQuotes>
        {quote}
      </LoadingQuotes>
      <LoadingArt className="material-icons-outlined">
        restart_alt
      </LoadingArt>
    </LoadingProgress>
  );
}

export default Loading;
