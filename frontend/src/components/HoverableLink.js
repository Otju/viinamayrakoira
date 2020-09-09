import React from 'react'
import { Route } from 'react-router-dom'
import Hoverable from './Hoverable'


const HoverableToLink = ({ children, link,zIndex }) =>
  (<>
    <Route render={({ history }) => (
      <>
        <Hoverable zIndex={zIndex} handleClick={() => history.push(`/${link}`)} id="Cool">
          {children}
        </Hoverable>
      </>
    )} />
  </>)


export default HoverableToLink