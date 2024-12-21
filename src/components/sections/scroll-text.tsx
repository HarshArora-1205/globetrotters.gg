import React from 'react'
import Paragraph from '../common/character';

const paragraph = `TRIP PLANNING HAS NEVER BEEN THIS EASY. 
JUST SET YOUR BUDGET, TRIP DURATION, PICK A DREAM DESTINATION, PACK YOUR BAGS AND LEAVE EVERYTHING ELSE TO OUR AI POWERED ENGINE.

\n\nFROM MUST VISIT SPOTS TO BUDGET FRIENDLY OPTIONS, YOUR NEXT COORDINATES ARE JUST A CLICK AWAY.`;

const ScrollText = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center font-bold">
      <Paragraph paragraph={paragraph} />
    </div>
  )
}

export default ScrollText