import { useContext } from "react";
import { ProjContext } from "./projContext";
import Parts from "./parts";
import "./App.css"

import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  const{data, 
    Layout,
    Continents,
    Blogs,
    Contact,
    NoPage,
    Popular,
    Message} = useContext(ProjContext);

  // console.log('xxxxxxxxxx')
  // console.log('data arrived at App.jsx', data);
  // console.log('yyyyyyyyyy')
  if (data.length) {
    // arrange in alphabetical o.
    let dta = [];
    data[0].map((item) => dta.unshift(item))
    console.log('dta unshift', dta)
    return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Continents />} />
          <Route path={`continents`} element={<Continents />}/>              
          {dta.map(item => {
            const path=`continents/${item.name}`
            const element = <Parts key={item.name.substring(0,4)} content={item}/>;
            return (
            <Route path={path} element={element} />
            )
          })}

          {/* <Route path={`continents/Africa/Egypt`} element={<Parts key={'Egyp'} content={dta[0].selected[0][0]}/>} /> */}
          {dta.map((item, idxx) => {
            let dtaIn = [];
            item.selected[0].map(itm => dtaIn.unshift(itm));
            console.log('dtaInnnnnn', dtaIn)
            return (
              dtaIn.map(itm => {
                const path=`continents/${item.name}/${itm.name}`
                const element = <Parts key={itm.name.substring(0,4)} content={itm}/>;
                
                return <Route path={path} element={element}/>
              })
            )
            
          })}

          {/* {item.selected[0].map(itm => {
              // console.log('itmmmmmmmmm', itm);
              return <Route path={`continents/${item.name}/${itm.name}`} element={<Parts key={itm.name.substring(0,4)} content={itm}/>} />
            })} */}

          <Route path="blogs" element={<Blogs />} />
          <Route path="blogs/popular" element={<Popular />} />
          <Route path="contact" element={<Contact />} />
          <Route path="contact/message" element={<Message />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
      // <div>
      //   {/* {cont.map((content, index) => (
      //               <Parts key={index} content={content} />
      //             ))} */}
      //   <div>
      //     {cont.map((content, index) => (
      //       <Parts key={index} content={content} />
      //     ))}
      //   </div>
      // </div>

    );
  }

}

export default App;