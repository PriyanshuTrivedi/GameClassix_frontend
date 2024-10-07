import React from 'react'
import { PieChart } from 'react-minimal-pie-chart';

const Pie_Chart = ({myData}) => {
    console.log(myData);
  return (
    <div>
        <PieChart
        data={myData}
        label={({ dataEntry }) => dataEntry.value>0?`${dataEntry.title}: ${dataEntry.value}`:""}
        labelStyle={{
            fontSize: '5px',
            fontFamily: 'sans-serif',
            fill: '#000', // Label text color
        }}
        labelPosition={50} // Adjust position of the label (can change as needed)
        lineWidth={35} // Thickness of the pie slices
        />
    </div>
  )
}

export default Pie_Chart