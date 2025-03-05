import './home.css'
function Home(){
    return (
        <div className="home">
        <div>
            <nav>
                <div>
                    <img src="./tringapps-copy-2.png" alt="tringappsLogo" />
                </div>
                <div className='navigate-next'>
                    <a href="/login">Login</a>
                    <a href="/signup">Signup</a>
                </div>
            </nav>
        </div>
        </div>
    );
}

export default Home;