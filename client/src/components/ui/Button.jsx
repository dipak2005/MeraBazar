import React from 'react';

function Button({type="button",className="" ,children, onClick ,...rest }) {
    return ( 
       <button  type={type} className={className} {...rest} onClick={onClick}>{children}</button>
        
     );
}

export default Button;