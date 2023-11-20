import React, { useState }  from 'react'

function DelQuestBox({onConfirm, onCancel}) {
    const [ selectedOption, setSelectedOption] = useState("")

    const handleOptionChange = (event) =>{
        setSelectedOption(event.target.value);
    }

    const handleConfirm = () => {
        onConfirm()
    }

    const handleCancel = () => {
        onCancel()
    }
  return (
    <div id="modalOverlay">
        <div id="modalOverlayBackground"></div>
        <div id="deleteBox">
            <p>Are you sure you would like to delete this listing?</p>
            <div>
                <input type="button" name="deleteOption" value="Cancel" onClick={handleCancel}/>
                <input type="button" name="deleteOption" value="Confirm" onClick={handleConfirm}/>
            </div>
        </div>
    </div>
  )
}

export default DelQuestBox