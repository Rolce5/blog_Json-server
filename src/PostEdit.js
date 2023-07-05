import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom"

const PostEdit = () => {
    const { postid } = useParams();
    // const [postdate, postdatachange] = useState({});

    useEffect(() => {
        fetch("http://localhost:8000/post/" + postid).then((res) => {
            return res.json();
        }).then((resp) => {
            // titlechange(resp.title)
        }).catch((err) => {
            console.log(err.message);
        })
    }, []);

    const [title, titlechange] = useState("");
    const [body, bodychange] = useState("");

    const [validation, valchange] = useState("");  
    const navigate = useNavigate();
    
    const handlesubmit = (e) => {
        e.preventDefault();
        const postdata = {title,body};
        
        fetch("http://localhost:8000/posts/"+postid, {
            method:"PUT",
            headers:{"content-type":"application/json"},
            body:JSON.stringify(postdata)
        }).then((res) => {
            alert('Updated successfully.')
            navigate('/post/manage')
        }).catch((err) => {
            console.log(err.message)
        });
    }
    return (
        <div className="container col-xl-10 col-xxl-8 px-4 py-5">
            <div className="col-md-10 mx-auto col-lg-7">
                <form className="p-4 p-md-5 border  bg-light" onSubmit={handlesubmit}>
                    <header className="text-center">
                        <h2 className="text-2xl font-bold uppercase mb-1">Edit Post</h2>
                    </header>
                    <div className="mb-3">
                        <label className="form-label">Title</label>
                        <input className="form-control" onMouseDownCapture={e => valchange(true)} onChange={e => titlechange(e.target.value)} value={title} required placeholder=""></input>
                        {title.length == 0 && validation && <span className="text-danger">title is required</span>}
                    </div>

                    {/* <div class="mb-3">
                    <label for="image" class="form-label">Image</label>
                    <input type="file" class="form-control" name="image">
                </div> */}

                    <div className="mb-3">
                        <label for="body" className="form-label">Body</label>
                        <textarea className="form-control" onMouseDownCapture={e => valchange(true)} onChange={e => bodychange(e.target.value)} value={body} required rows="10" placeholder=""></textarea>
                        {body.length == 0 && validation && <span className="text-danger">this field is required</span>}

                    </div>
                    <div className="mb-6">
                        <button type="submit" className="btn btn-success">Edit Post</button>
                        <Link to="/post/manage" className="text-black ml-4">Back</Link>
                    </div>
                </form>
            </div>
        </div>
    );

}

export default PostEdit;