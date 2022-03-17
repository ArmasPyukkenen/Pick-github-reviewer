import React, { useEffect, useState } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import { VerifiableInputData } from '../../types/verifiable-input-types';

interface VerifiableInputProps {
  data: VerifiableInputData;
  updateValue: any;
  fetchValue: any;
  label: string;
  inputId: string;
}

const VerifiableInput: React.FC<VerifiableInputProps> = ({data, updateValue, fetchValue, label, inputId}) => {
  //const {currentUser} = useTypedSelector(state => state.settings);
  //const {updateCurrentUser, fetchCurrentUser} = useActions();
  useEffect(() => {
    const timer = setTimeout(() => {
      if(data.status === 'typing') {
        fetchValue(data.value)
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [data.value]);
  return (
    <div style={{
      padding: "0.5rem",
      border: "1px solid #bbb",
      backgroundColor: (data.status === 'verified' ? "#afa" : (data.status === 'failed' ? "#faa" : "inherit"))
    }}>
      <label htmlFor={inputId}>{label}</label>
      <input type="text" id={inputId} value={data.value} onChange={(e) => updateValue(e.target.value)} />
      <div style={{fontSize: "0.8rem"}}>
        {
          data.status === 'typing' && <p>...</p>
        }
        {
          data.status === 'failed' && <p style={{color: "red"}}>{data.error}</p>
        }
        {
          data.status === 'loading' && <p>checking the value</p>
        }
        {
          data.status === 'verified' && <p style={{color: "green"}}>Entered value is valid</p>
        }
      </div>
    </div>
  )
}

export default VerifiableInput;