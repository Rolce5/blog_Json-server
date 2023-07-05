import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Home = () => {
    const [postdata, postdatachange] = useState(null);
    const usenavigate = useNavigate()

    const show = (id) => {
        usenavigate("/post/" + id)
    }

    useEffect(() => {
        fetch("http://localhost:8000/posts").then((res) => {
            return res.json();
        }).then((resp) => {
            postdatachange(resp)
        }).catch((err) => {
            console.log(err.message)
        })
    })

    useEffect(() => {
        let username = sessionStorage.getItem('username');
        if(username=== '' || username === null){
            usenavigate('/');
        }
    },[]);

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary ">
                <div className="container-fluid ">
                    <button className="navbar-toggler" type="button" d ata-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse d-flex justify-content-between" id="navbarSupportedContent">
                        <ul className="navbar-nav  mb-2 mb-lg-0 ">
                            <li className="nav-item">
                                <Link to="/" className="nav-link"> Home</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav  mb-2 mb-lg-0 grid gap-3">
                            <li className="nav-item ">
                                <span class=" fw-bold uppercase">
                                    Welcome
                                </span>
                            </li>
                            <li className="nav-item">
                                {<Link to="/post/manage" className="nav-link"> <span> <i class="bi bi-gear"></i>
                                    Manage Post
                                </span></Link>}
                            </li>

                            <li className="nav-item ">
                                <Link to="/" className="nav-link"> <button type="submit" class="btn btn-light">
                                    <i class="bi bi-door-closed-fill"></i>Logout
                                </button></Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/login" className="nav-link"> <i class="bi bi-box-arrow-in-right"></i>Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/register" className="nav-link"> <i class="bi bi-box-arrow-in-right"></i>Register</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div class="container mt-5">
                {/* @foreach ($posts as $post) */}
                <div style={{flexDirection: 'column'}} class="container d-flex justify-content-center mb-4">
                    {
                        postdata &&
                        postdata.map(item => (
                            <div key={item.id}>
                                {/* <span className="text-body-tertiary">{item.diffForHumans()}</span> */}
                                <img src={item.image}></img>
                                <h1 class="my-2 heading"><a onClick={() => { show(item.id) }} className="text-decoration-none text-dark text-primary:hover " >{item.title}</a></h1>
                                <p>{item.body}</p>
                                {/* <p>{substr(item.body, 0, 1000)}</p> */}
                            </div>
                        ))
                    }
                </div><br></br>
                {/* @endforeach */}
            </div>
        </div>
    );
}

export default Home;