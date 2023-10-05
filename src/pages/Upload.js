import logo from '../logo.svg';
import '../App'
import '../style.css'
import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx'
import upload_img from '../cloud-computing.png'
import file from '../file.png'


function Upload() {
  const [excelFile, setExcelFile] = useState(null);
  const [TypeError, setTypeError] = useState(null);

  const [excelData, setExcelData] = useState(null);
  const [fileName, setfileName] = useState('');

  // on change event

  const handleFile = (e) => {
    let fileTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
    let selectedFile = e.target.files[0];
    setfileName(e.target.files[0].name)
    if (selectedFile) {
      if (selectedFile && fileTypes.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          console.log("Read as Array Buffer", e.target.result);
          setExcelFile(e.target.result);
        }
      }
      else {
        setTypeError('Please select excel file types');
        setTypeError(null);
      }
    }
    else {
      console.log('Please select your file')
    }
  }

  const handleFileSubmit = (e) => {
    console.log('khdfdsab', excelFile);
    if (excelFile != null) {
      console.log("inside if ");
      const workbook = XLSX.read(excelFile, { type: 'buffer' })
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      console.log(data, "asdhasdsakdkhsa");

      // let tempData=[]
      // data.map((val)=>{
      //  delete val?.__EMPTY
      //   // tempData.push({...val})


      // })
      setExcelData(data);

    } else {
      // console.log("inside else ");
    }


  }

  useEffect(() => {
    console.log("asdsadsa", excelData);
  }, [])

  return (
    <>
      <div className='MainContainer'>
        <div className='wrapper'>
          <div className='upload'>
            <h3>Upload & View Excel sheets  </h3>
            <img className="uploadImg" src={upload_img}></img>
          </div>
          <div className='container'>
            <div className='input'>

              <label for="fileInput">
                <img src={file} className='fileInput' />
              </label>
              <input id="fileInput" type="file" hidden onChange={(e) => {
                handleFile(e);
              }} />
              <p>{fileName}</p>
              <button type='submit' className='btn' onClick={() => { handleFileSubmit() }}>UPLOAD</button>
            </div>

            {TypeError && (
              <div className='alert alert-danger' style={{
                backgroundColor: "red"
              }} role='alert'>{TypeError}</div>
            )}
            <div className='viewer'>
              {excelData ? (
                <div className='table-responsive'>
                  <table className='table'>
                    <thead className='table_header'>
                      <tr className='table_row'>
                        {Object.keys(excelData[0]).map((key) => {
                          console.log(key, "Excel Data");
                          return (
                            <th className='table_head' key={key}>{key}</th>
                          )
                        })}
                      </tr>
                    </thead>
                    <tbody className='table_body'>
                      {excelData.map((individualExcelData, key) => {
                        console.log("individualExcelData",individualExcelData,individualExcelData[Object.keys(individualExcelData)],Object.keys(individualExcelData)[0],Object.keys(individualExcelData).length);
                        return(

                          <tr key={key}>
                          <td className='table_data' key={key}>{individualExcelData[Object.keys(individualExcelData)[0]]}</td>
                        {
                          
                        }
                          <td className='table_data' key={key}><input value={individualExcelData?.__EMPTY} /></td>
                          </tr>

                          // Object.keys(individualExcelData).map((key,i) => 
                          //   {
                          //     console.log("kjasnkjdnsa",key)
                          //     return(
                          //       <tr key={index}>
                          //       <td className='table_data' key={key}><input value={individualExcelData[key]} /></td>
                          //       <td className='table_data' key={key}><input value={individualExcelData[key]} /></td>
                          //       </tr>
                          //       )
                          //   }
                          // )
                      )})}
          {/* {
            excelData.map((val)=>{
              console.log("ahsdsahjsa", val);
              return(
                <tr>
                  <td>
                  <input value={val} />
                  </td>
                </tr>
              )
            })
          } */}

                      {/* {excelData.map((val)=>{
                           console.log("individualExcelDataasd",val);
                           return(
                            <
                           )
                      })} */}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className='message'>No file is uploaded yet!</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Upload;

// import React, { useState } from 'react';
// import * as XLSX from 'xlsx';

// function Upload() {
//   const [data, setData] = useState([]);
  
//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();

//     reader.onload = (event) => {
//       const binaryData = event.target.result;
//       const workbook = XLSX.read(binaryData, { type: 'binary' });
//       const sheetName = workbook.SheetNames[0];
//       const sheet = workbook.Sheets[sheetName];
//       const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

//       setData(jsonData);
//     };

//     reader.readAsBinaryString(file);
//   };

//   return (
//     <div>
//       <input type="file" accept=".xlsx" onChange={handleFileUpload} />
//       <form>
//         {data.map((row, rowIndex) => (
//           <div key={rowIndex}>
//             {row.map((cell, cellIndex) => {

//               console.log("bsdhbsadbsakhd",cell,);
//               return(
//                 <div key={cellIndex}>
//                   <label>{cell}</label>
//                   <input type="text" value={cell} readOnly />
//                 </div>
//               )

//             })}
//           </div>
//         ))}
//       </form>
//     </div>
//   );
// }

// export default Upload;

