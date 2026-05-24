import { useState, useEffect } from 'react';
import portfolioDataDefault from '../data/portfolio.json';

export const usePortfolioData = () => {
  const [portfolioData, setPortfolioData] = useState(null);

  useEffect(() => {
    // Check if there's saved data in localStorage
    const savedData = localStorage.getItem('portfolioData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setPortfolioData(parsedData);
      } catch (error) {
        console.error('Error parsing saved portfolio data:', error);
        setPortfolioData(portfolioDataDefault);
      }
    } else {
      // Use default data
      setPortfolioData(portfolioDataDefault);
    }
  }, []);

  const updatePortfolioData = (newData) => {
    setPortfolioData(newData);
    localStorage.setItem('portfolioData', JSON.stringify(newData));
  };

  return { portfolioData, updatePortfolioData };
};
