import React, {useState} from 'react'
import { QrReader } from 'react-qr-reader'
import { useNavigate } from 'react-router-dom';

export const Qr=()=>{
    const navigate = useNavigate();
    
    const handleScan = data => {
        if (data==="machine1") {
            navigate('/Machine1')
        }
        if (data==="machine2") {
            navigate('/machine2')
        }
        
    }
    const handleError = err => {
    console.error(err)
    }

    return (
      <div>
            
            <span>QR Scanner</span>
            
            <center>
            <div style={{marginTop:30}}>
                <QrReader
                    delay={300}
                    onError={handleError}
                    onScan={handleScan}
                    style={{ height: 150, width: 100 }}
                />
            </div>
            </center>


      </div>
    );
  }
  

  