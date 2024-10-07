import React, { useState, useEffect } from 'react';
import './OTPInput.css'

const OTPInput = ({ length = 6, onChangeOTP }) => {
  const [otp, setOTP] = useState(Array(length).fill(''));
  const [focusedIndex, setFocusedIndex] = useState(0);

  // Effect to focus on the current input field
  useEffect(() => {
    const input = document.getElementById(`otp-input-${focusedIndex}`);
    if (input) {
      input.focus();
    }
  }, [focusedIndex]);

  // Handle change in OTP fields
  const handleChange = (value, index) => {
    if (/^[a-zA-Z0-9]$/.test(value)) {
      const newOTP = [...otp];
      newOTP[index] = value;
      setOTP(newOTP);
      onChangeOTP(newOTP.join(''));

      // Move to the next input if not the last one
      if (index < length - 1) {
        setFocusedIndex(index + 1);
      }
    }
  };

  // Handle key down for backspace and arrow navigation
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (otp[index] === '') {
        if (index > 0) {
          setFocusedIndex(index - 1);
        }
      } else {
        const newOTP = [...otp];
        newOTP[index] = '';
        setOTP(newOTP);
        onChangeOTP(newOTP.join(''));
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      setFocusedIndex(index - 1);
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      setFocusedIndex(index + 1);
    }
  };

  // Handle paste event
  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').split('');
    if (pasteData.length <= length) {
      const newOTP = pasteData.slice(0, length);
      for (let i = 0; i < newOTP.length; i++) {
        otp[i] = newOTP[i];
      }
      setOTP([...otp]);
      onChangeOTP(otp.join(''));

      // Focus on the last field with a value
      setFocusedIndex(pasteData.length - 1);
    }
  };

  return (
    <div className='otpBox'>
      {otp.map((digit, index) => (
        <input
          className='otpInput'
          key={index}
          id={`otp-input-${index}`}
          type="text"
          value={digit}
          maxLength="1"
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={index === 0 ? handlePaste : undefined}
        />
      ))}
    </div>
  );
};

export default OTPInput;
