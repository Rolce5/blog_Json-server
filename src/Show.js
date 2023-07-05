import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
const Show = () => {
    const [author, authorchange] = useState("");
    const [email, emailchange] = useState("");
    const [text, textchange] = useState("");

    const [comment, commentchange] = useState(null);

    const [validation, valchange] = useState("");

    const { postid } = useParams();

    const [postdata, postdatachange] = useState({})



const getPost = async () => {
    const res = await fetch("http://localhost:8000/posts/" + postid);
    const posts = await res.json()
    postdatachange(posts)

}

const getAllComments = async () => {
   try{ const res = await fetch("http://localhost:8000/comment" );
    const comments = await res.json()
    commentchange(comments)
} catch (e) {
    console.log(e.message)
}
}


useEffect(()=>{
    getAllComments()
    getPost()

},[])
    





    const handlesubmit = (e) => {
        e.preventDefault();
        const commentdata = { author, email, text };

        // upload 
        fetch("http://localhost:8000/comment", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(commentdata)
        }).then((res) => {
            toast.success('Your comment has been posted.')
            getAllComments()
        }).catch((err) => {
            console.log(err.message)
        })

        emailchange("")
        textchange("")
        authorchange("")
    }


    return (
        <div>
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
            </div>
            {
                postdata &&
            
                <div className="container d-flex justify-content-center">
                    <div className="mb-3">
                        {/* <span className="text-body-tertiary m-3">{{$post->created_at->diffForHumans()}}</span> */}
                        <h1 style={{color: 'black'}} className="my-3 text-center">{postdata.title} +  This is the title</h1>
                        <div className="d-flex justify-centent-center my-5 pb-3">
                            <img className="mx-auto" src="C:\\fakepath\\IMG_1539.MOV" alt="post"/>  
                        </div>

                        <p>{postdata.body} </p>
                        <div className="container">
                            <h2 className="mt-5 mb-2 text-4xl font-bold text-center text-gray-900">Comments</h2>
                            <form onSubmit={handlesubmit}>
                                <div className="form-group">
                                    <label htmlFor="author" className="text-sm font-medium text-gray-700">Author</label>
                                    <input type="text" className="form-control"  onChange={e => authorchange(e.target.value)} value={author} required/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email" className="text-sm font-medium text-gray-700"  >Email</label>
                                    <input type="email"  className="form-control" onChange={e => emailchange(e.target.value)} value={email} required/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="text" className="text-sm font-medium text-gray-700 mt-4">Text</label>
                                    <textarea className="form-control" onChange={e => textchange(e.target.value)} value={text} required></textarea>
                                </div>

                                <button type="submit" className="btn btn-primary mt-2">Post</button>
                            </form>
                        </div>
                    
                        {
                            comment &&
                            <>
                            
                           { comment.map(comment => (
                              <div className="mt-4">
                              <div className="mb-3 bg-white p-4 rounded shadow">
                                  <div className="d-flex align-items-center">
                                      <div className="flex-grow-1 ms-2">
                                          <p className="mb-0 font-weight-bold">{comment.author}</p>
                                      </div>
                                  </div>
                                  <div className="mt-3 ms-2">
                                      <p className="text-danger">{comment.text}</p>
                                  </div>
                              </div>
                          </div>
                                ))}
                            </>
                        }
                    </div>
                </div>
                
            }
        </div>
    );
}

export default Show;