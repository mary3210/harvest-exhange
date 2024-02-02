import React from "react";
import myStyles from "../styles/About.css"
function About() {
    return (
        <div className="aboutContainer">
            <div className="about">
            <div className="aboutHeaderImage" id="aboutImage">
                <img src="https://res.cloudinary.com/rent-blogs/images/f_auto,q_auto/v1678287865/vegetable_garden_hero/vegetable_garden_hero.jpg?_i=AA" alt="seedling" >
                </img>
            </div>
            <div className="aboutHeader">
         
            <p>About Us</p>
            </div>

            <div className="aboutContents">
            <div className="aboutImage">
            <img src="https://oldworldgardenfarms.com/wp-content/uploads/2021/06/grow-cucumber-plants.jpg" alt="cucumber" />
            </div>
            <div className="textContents">
            <p>
                    Harvest Exchange stands out as a cutting-edge app committed to
                addressing the pressing issues of food waste while
                simultaneously nurturing community, sustainability, and
                wellness. Specifically designed for enthusiastic gardeners
                grappling with surplus produce. Whether faced with an
                abundance that surpasses household needs or an eagerness to
                share or sell their harvest, Harvest Exchange serves as the
                ultimate solution. <br/><br/>
                    Our platform functions as an exclusive space
                for individuals to flaunt the outcomes of their gardening
                endeavors, effectively minimizing food waste and empowering
                local communities. Rather than resorting to conventional grocery
                stores, users can seamlessly connect with neighbors,
                facilitating the exchange, sale, or sharing of produce. <br/><br/>This not
                only contributes to a significant reduction in food waste but
                also champions healthier choices within the community, promoting
                awareness and enhancing accessibility to fresh, locally grown
                options. 
            </p>
            </div>
            </div>
            </div>
        </div>
    );
}

export default About;
