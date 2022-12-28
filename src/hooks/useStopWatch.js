import {useEffect, useState} from 'react';

const useStopWatch = initialDate => {
  //console.log('initialDate: ', initialDate);
  const countDownDate = new Date().getTime() - new Date(initialDate).getTime();

  const getReturnValues = countDown => {
    // calculate time left
    const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countDown % (1000 * 60)) / 1000);
    return [days, hours, minutes, seconds];
  };

  return getReturnValues(countDownDate);
};

export {useStopWatch};
