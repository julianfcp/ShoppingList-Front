import React, {useState} from "react";


export default (props) => {

    const [descText, setDescText] = useState('');
    const handleOnChange = (e) => {
        setDescText(e.target.value);
        alert(descText);
    }


    return (
        <div>
            <b>Description</b>
            <p contentEditable={true} onChange={handleOnChange}>Descripcion de la lista lorep isumo asad hejgpp elorem eahroashejgpp elorem eahroashejgpp elorem eahroas
            hejgpp elorem eahroashejgpp elorem eahroashejgpp elorem eahroashejgpp elorem eahroas
            hejgpp elorem eahroashejgpp elorem eahroashejgpp elorem eahroashejgpp elorem eahroashejgpp elorem eahroas
            </p>
            
        </div>
    )

}
