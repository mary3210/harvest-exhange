import { useState, useEffect, useRef } from "react"

function CustomSelect({DropdownList, ReturnValue}){
    const [isActive, setIsActive] = useState(false);
    const [value, setValue] = useState("");
    const[highlightedValue, setHighlightedValue] = useState("")
    const dropdownRef = useRef(null);
    const dropSelect = useRef(null)

    const toggleDropdown =( e ) =>{
        setIsActive(!isActive);
    }

    const handleSelectItem = (menuItem) => {
        setValue(menuItem.text);
        setHighlightedValue(menuItem.value)
        setIsActive(false);
        ReturnValue(menuItem.value);
    }
   
    const handleblurItem = (e) => {
        setIsActive(false);
    }


    useEffect(function() {
        if (isActive) {
            dropdownRef.current.focus();
            dropSelect.current.focus();
            dropSelect.current.classList.add('select');
        }
        if(!isActive){
            dropSelect.current.classList.remove('select');
        }

        // DropdownList.map((menuItem, index) =>(
        //     (menuItem.value === value){
        //         index
        //     }
        // ))

    }, [isActive, value]);
    
    return(
        <div className="Dropdown" onClick={toggleDropdown} >
           <div className="DropdownSelect searchinput" ref={dropSelect}> <span>{value || DropdownList[0]?.text }</span>
            { isActive ?   <svg width="64px" height="64px" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(180)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z" fill="#000000"></path> </g></svg>: <svg width="64px" height="64px" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z" fill="#000000"></path> </g></svg>} 
            </div>
        {isActive ? (
            <ul className="menu" tabIndex={0} onBlur={handleblurItem} ref={dropdownRef}>
                {DropdownList.map((menuItem, index) => (
                    <li key={index} className={`menu-item ${menuItem.value === highlightedValue ? 'dropdownItemActive': ''} `} onClick={()=> handleSelectItem(menuItem)}>{menuItem.text}</li>
                ))}
            </ul>
        ):null}
        </div>
    )
}

export default CustomSelect