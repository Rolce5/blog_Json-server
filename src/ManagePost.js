import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom"
const ManagePost = () => {
    const [postdata, postdatachange] = useState(null);
    const navigate = useNavigate();

    const LoadEdit = (id) => {
        navigate("/post/edit/" + id)
    }
    const deleteFunction = (id) => {
        if (window.confirm('Confirm delete'));

        fetch("http://localhost:8000/posts/" + id, {
            method: "DELETE",
        }).then((res) => {
            toast.success('Deleted successfully.');
            window.location.reload();
        }).catch((err) => {
            console.log(err.message)
        });
    }

    useEffect(() => {

        fetch("http://localhost:8000/posts").then((res) => {
            return res.json();
        }).then((resp) => {
            console.log(resp)
            postdatachange(resp)
        }).catch((err) => {
            console.log(err.message)
        })
    }, [])

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
                                <span className=" fw-bold uppercase">
                                    Welcome
                                </span>
                            </li>
                            <li className="nav-item">
                                {<Link to="/post/manage" className="nav-link"> <span> <i className="bi bi-gear"></i>
                                    Manage Post
                                </span></Link>}
                            </li>

                            <li className="nav-item ">
                                <Link to="/" className="nav-link"> <button type="submit" className="btn btn-light">
                                    <i className="bi bi-door-closed-fill"></i>Logout
                                </button></Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/login" className="nav-link"> <i className="bi bi-box-arrow-in-right"></i>Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/register" className="nav-link"> <i className="bi bi-box-arrow-in-right"></i>Register</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container px-4 py-5">
                <div className="col-md-10 mx-auto col-lg-10">
                    <div className="d-flex justify-content-end text-right mb-3">
                        <Link to="/post/create" className="btn btn-success"> Create Post</Link>
                    </div>
                    <div className="table-responsive position-relative">
                        <table className="table  table-hover">

                            <tr>
                                <th>Title</th>
                                <th>Body</th>
                            </tr>

                            <tbody>

                                {
                                    postdata &&
                                    postdata.map(item => (
                                        <tr key={item.id}>
                                            <td>{item.title}</td>
                                            <td>{item.body}</td>
                                            <td>
                                                <a onClick={() => { LoadEdit(item.id) }} className="btn btn-success">edit</a>
                                                <a onClick={() => { deleteFunction(item.id) }} className="btn btn-danger">Delete</a>
                                            </td>
                                        </tr>
                                    ))
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManagePost;