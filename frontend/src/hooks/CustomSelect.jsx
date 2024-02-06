import { useState, useEffect } from "react"
import { RiArrowDownSLine } from "react-icons/ri";
import { RiArrowDropUpLine } from "react-icons/ri";

function CustomSelect({DropdownList, ReturnValue}){
    const [isActive, setIsActive] = useState(false)
    const [value, setValue] = useState("")


    const toggleDropdown =( e ) =>{
        setIsActive( !isActive)
    }

    const handleSelectItem = (menuItem) => {
        setValue(menuItem.text)
        setIsActive(false)
        ReturnValue(menuItem.value)
    }
   
    return(
        <div className="Dropdown" onClick={toggleDropdown}>
            <span>{value || "select"}</span>
            { isActive ?   <RiArrowDropUpLine />: <RiArrowDownSLine/>}
        {isActive ? (
            <ul className="menu">
                {DropdownList.map((menuItem, index) => (
                    <li key={index} className="menu-item" onClick={()=> handleSelectItem(menuItem)}>{menuItem.text}</li>
                ))}
            </ul>
        ):null}
        </div>
    )
}

export default CustomSelect