import React from 'react'
import { Preview, print } from "react-html2pdf";


const Example = () => {
  
    return (
        <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{ width: "21cm", "background": "white" }}>
                <Preview id={"template"}>

                    
                        <table>
                            <tr>
                                <td style={{}}><h1 style={{padding:"20px",fontFamily:" Inter, sans-serif",fontSize: "2.25rem",height:"0.8rem",fontWeight: "700" ,paddingBottom:"0px"}} >Event proposal</h1>
          <div style={{paddingLeft:"20px"}}>
          <div style={{paddingLeft:"20px", width:"12rem",height:"0.3rem",backgroundColor:"rgb(252 163 17 / 1)",border:"none",borderRadius:"0px",boxShadow:"var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)"}}>
          </div>
                </div>
                <div style={{padding:"20px",fontFamily:"sans-serif",fontSize: "1.25rem",height:"0.8rem" }}>Sample Club</div>
                </td>
                                <td><img style={{ height:"6.5rem" ,width:"5rem",paddingLeft:"23.3rem",paddingTop:"1.5rem"}} className="image" src={"https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/PSG_College_of_Technology_logo.png/220px-PSG_College_of_Technology_logo.png"}></img></td>
                            </tr>

                        </table>
                        <div style={{padding:"10px"}}></div>
        <table className='table1' style={{padding:"20px",fontSize:"17px",width:"750px"}}>

          <tr>
            <td style={{padding:"10px",width:"100px"}}>Id :</td>
            <td style={{padding:"10px",width:"200px"}}>001</td>
          </tr>
          <tr>
            <td style={{padding:"10px"}}>Event name :</td>
            <td style={{padding:"10px",width:"200px"}}>Lorem Ipsum</td>
          </tr>
          <tr>
            <td style={{padding:"10px"}}>Start date :</td>
            <td style={{padding:"10px",width:"200px"}}>10-10-2001</td>
          </tr>
          <tr>
            <td style={{padding:"10px"}}>End-date :</td>
            <td style={{padding:"10px",width:"200px"}}>12-10-2001</td>
          </tr>
          <tr>
            <td style={{padding:"10px"}}>Venue :</td>
            <td style={{padding:"10px",width:"200px"}}>G Block 1st Floor</td>
          </tr>
          <tr>
            <td style={{padding:"10px"}}>Count :</td>
            <td style={{padding:"10px",width:"200px"}}>150</td>
          </tr>
          <tr>
            <td style={{padding:"10px"}}>Guest :</td>
            <td style={{padding:"10px",width:"200px"}}>Prakasan</td>
          </tr>
          <tr>
            <td style={{padding:"10px"}}>Expected expense :</td>
            <td style={{padding:"10px",width:"200px"}}>9000</td>
          </tr>
          <tr>
            <td style={{padding:"10px"}}>Allocated Budget:</td>
            <td style={{padding:"10px",width:"200px"}}>10000</td>
          </tr>
          <tr>
            <td style={{padding:"10px"}}>Amount Spent :</td>
            <td style={{padding:"10px",width:"200px"}}>6000</td>
          </tr>
          <tr>
            <td style={{padding:"10px"}}>Faculty Name :</td>
            <td style={{padding:"10px", width:"200px",textAlign:"justify"}}>Mr. Some guy</td>
          </tr>
          <tr>
            <td style={{padding:"10px"}}>Faculty Dept :</td>
            <td style={{padding:"10px",width:"200px",textAlign:"justify"}}>Electrical & Electronics Engineering</td>
          </tr>
          <tr>
            <td style={{padding:"10px"}}>Description :</td>
            <td style={{padding:"10px",width:"200px",textAlign:"justify"}}>\ngdfghdf hasn't posted latelygdfghdf hasn't posted lately\ngdfghdf’s recent posts and comments will be displayed here after some time.the time it takes cannot be predicted.</td>
          </tr>
          <tr>
            <td style={{padding:"10px"}}>Comments :</td>
            <td style={{padding:"10px",width:"200px",textAlign:"justify"}}>\ngdfghdf hasn't posted latelygdfghdf hasn't posted lately\ngdfghdf’s recent posts and comments will be displayed here</td>
          </tr>
          <tr>
            <td style={{padding:"10px"}}>Status :</td>
            <td style={{padding:"10px",width:"200px"}}>Pending</td>
          </tr>
        </table>
                </Preview>
                <div style={{padding:"10px"}}></div>
                <div style={{padding:"22px"}}><button style={{ width:"20.5rem",height:"2.5rem",color:"rgb(20 33 61 / 1)",
                backgroundColor:"rgb(252 163 17 / 1)",fontFamily:" Inter, sans-serif",
                fontSize: "1.125rem",
                lineHeight: "1.75rem",
                fontWeight: "550",border:"none",borderRadius:"8px",boxShadow:"var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)"}} onClick={() => print('a', 'template')}>Print</button></div>
            </div>
        </div>
    )
}

export default Example