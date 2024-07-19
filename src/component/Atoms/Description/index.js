import React from 'react';
import './style.css';

function Description({description}) {
  return (
    <div className='description'><p><span className='system'>System</span><span className='dot'>.</span><span className='out'>out</span><span className='dot'>.</span><span className='println'>println</span><span className='kurung'>("</span>{description}<span className='kurung'>")</span>;</p></div>
  )
}

export default Description