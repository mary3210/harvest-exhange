import { useState, useEffect, useRef } from "react"
import { RiArrowDownSLine } from "react-icons/ri";
import { RiArrowDropUpLine } from "react-icons/ri";

function CustomSelect({DropdownList, ReturnValue}){
    const [isActive, setIsActive] = useState(false)
    const [value, setValue] = useState("")
    const dropdownRef= useRef(null)

    const toggleDropdown =( e ) =>{
        setIsActive( !isActive)
    }

    const handleSelectItem = (menuItem) => {
        setValue(menuItem.text)
        setIsActive(false)
        ReturnValue(menuItem.value)
    }
   
    const handleblurItem = (e) => {
        setIsActive(false)
    }

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)){
                setIsActive(false)
            }
        }
    })
    return (
        <div className="Dropdown" onClick={toggleDropdown}>
           <div className="DropdownSelect searchinput"> <span>{value || DropdownList[0]?.text }</span>
            { isActive ?   <svg width="64px" height="64px" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(180)"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z" fill="#000000"></path> </g></svg>: <svg width="64px" height="64px" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z" fill="#000000"></path> </g></svg>} 
            {/* { isActive ?   <RiArrowDropUpLine size= {30}/>: <RiArrowDownSLine/>}  */}
            </div>
        {isActive ? (
            <ul className="menu" onBlur={handleblurItem}>
                {DropdownList.map((menuItem, index) => (
                    <li key={index} className="menu-item" onClick={()=> handleSelectItem(menuItem)}>{menuItem.text}</li>
                ))}
            </ul>
        ):null}
        </div>
    )
}

export default CustomSelect