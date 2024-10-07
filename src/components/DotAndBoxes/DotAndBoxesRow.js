import React, { useContext } from 'react'
import { contextData } from '../../AllStates'
import Dot from './Dot';
import HoriLine from './HoriLine';
import VertLine from './VertLine';
import Box from './Box';
import './DotAndBoxesRow.css'

const DotAndBoxesRow = ({row}) => {
    const {n,horiLineMatrix,setHoriLineMatrix,vertLineMatrix,setVertLineMatrix}=useContext(contextData);
  return (
    <div className='dotAndBoxesRow'>
        <div className="horiLinesAndDotsDiv">
            {
                horiLineMatrix[row].map((el,index)=>{
                    return (
                        <>
                            <Dot row={row} col={index}/>
                            <HoriLine row={row} col={index}/>
                        </>
                    )
                })
            }
            <Dot row={row} col={n}/>
        </div>
        <div className="vertLinesAndBoxesDiv">
            {
                row<n
                ?
                vertLineMatrix[row].map((el,index)=>{
                    return (
                        <>
                            <VertLine row={row} col={index}/>
                            {
                                index<n
                                ?
                                <Box row={row} col={index}/>
                                :
                                <></>
                            }
                        </>
                    )
                })
                :
                <></>
            }
        </div>
    </div>
  )
}

export default DotAndBoxesRow
