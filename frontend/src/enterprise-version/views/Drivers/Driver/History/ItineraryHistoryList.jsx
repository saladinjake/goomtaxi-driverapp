import React from 'react';
const PlanRenderer = () => {
  const items = [{

  },{

  }];
  const showItems = () => {
    return items.map((item, i) => {
      return (
        
<tr key={i}>
  <td>Allen avenue, Ikeja </td>
  <td>Lekki Phase II</td>
  <td>24-Nov-2019 9:30am</td>
  <td>Driver</td>
                                                   
 </tr>



      );
    });



  };

  return <div>{showItems()}</div>;
};


export default PlanRenderer;