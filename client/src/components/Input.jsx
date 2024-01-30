import React from 'react';


function FormRow({fieldName, fieldType, labelText, defaultValue, onChange}) {

    return (
        <div className="form-row">

         <label htmlFor={fieldName} className='form-label'>
             {labelText || fieldName}
         </label>
            <input id={fieldName} type={fieldType}  name={fieldName} onChange={onChange} className='form-input' defaultValue={ defaultValue || '' }  required/>
        </div>

    );
}

export default FormRow;