import React from 'react';
//import backgroundImage from '../../assets/images/7197355.png';
import image5 from '../../assets/images/7197355.jpg';

const Home = () => {

    // const backgroundStyle = {
    //     backgroundImage: 'url(/images/7197355.jpg)',  // Using relative path from public folder
    //     backgroundSize: 'cover',
    //     backgroundPosition: 'center',
    //     height: '100vh', // Ensures it takes full height of the viewport
    // };

    return (
        <div className="container mt-5" style={{  backgroundImage: `url(${image5})`, backgroundSize: 'cover', backgroundPosition:'center', height: '80vh',  textAlign: 'center', display: 'flex',justifyContent: 'center' }}>
            <h1>Welcome to the Car Rental System!</h1>
            {/* <p>This is the home page. You can proceed with making reservations here.</p> */}
        </div>
    );

}

export default Home;
