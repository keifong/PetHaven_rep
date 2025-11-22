import '../App.css';
import logo from '../assets/petHaven_logo_rmbg.png'
import doggy from '../assets/doggy.png'

// to be used in home page and adopt page
function AboutUs({index}) {
    const toPopulate = [
        {
            imagePath:logo,
            title:"",
            content:"At Pet Haven, we believe every pet deserves a loving home and a second chance at happiness. Our mission is to create a safe sanctuary where abandoned and rescued pets can find hope, care, and their forever families.\n\nWe offer three core services: our adoption program carefully matches animals with compassionate families our pet release service provides a judgment-free solution for owners facing difficult circumstances and our shelter provides nurturing care, medical attention, and love to every resident.\n\nWe're not just finding homes, we're building families and giving every pet the brighter, safer future they deserve."
        },
        {
            imagePath:doggy,
            title:'What Every Future Pet Owner Should Know:',
            content:'Adopting a dog or cat is a rewarding journey, but it comes with important responsibilities. New owners should be prepared to provide daily care, including proper nutrition, exercise, training, and regular vet checkups. Building trust, offering patience, and creating a safe, loving environment are essential for a smooth transition. Understanding these needs ensures your adopted dog or cat thrives and becomes a cherished part of your family.'
        }
    ]
    return (
        <div className='section_div_column'>
            <div className='putRow'>
                <img src={toPopulate[index].imagePath} alt=''/>
            <h2>{toPopulate[index].title}</h2>
            </div>
            <p>{toPopulate[index].content}</p>
        </div>
    );
}

export default AboutUs;