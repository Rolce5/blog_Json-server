import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
const PostCreate = () => {
    const [title, titlechange] = useState("");
    const [body, bodychange] = useState("");
    const [image, setImage] = useState("");

    const [validation, valchange] = useState("");
    const navigate = useNavigate();

    // handle image change
    const handleChange = (e) => {
        const file  = e.target.files[0]
        const reader = new FileReader();
        const filePath = reader.readAsDataURL(file)

        reader.onloadend = function(e) {
            setImage([reader.result])
            console.log("reader.result 1", reader.result)
        }
       
       console.log("Image", image)
       console.log("reader.result", reader.result)
       console.log("Filepath", filePath)
    }
    
    const handlesubmit = (e) => {
        e.preventDefault();
        const postdata = {title,body, image};
        
        fetch("http://localhost:8000/posts", {
            method:"POST",
            headers:{"content-type":"application/json"},
            body:JSON.stringify(postdata)
        }).then((res) => {
            alert('Saved successfully.')
            navigate('/post/manage')
        }).catch((err) => {
            console.log(err.message)
        })
    }
    return (
        <div className="container col-xl-10 col-xxl-8 px-4 py-5">
            <div className="col-md-10 mx-auto col-lg-7">
                <form className="p-4 p-md-5 border  bg-light" onSubmit={handlesubmit}>
                    <header className="text-center">
                        <h2 className="text-2xl font-bold uppercase mb-1">Create a Post</h2>
                    </header>
                    <div className="mb-3">
                        <label className="form-label">Title</label>
                        <input className="form-control" onMouseDownCapture={e => valchange(true)} onChange={e => titlechange(e.target.value)} value={title} required placeholder=""></input>
                        {title.length===0 && validation && <span className="text-danger">title is required</span>}
                    </div>

                    <div className="mb-3">
                        <label htmlForfor="image" className="form-label">Image</label>
                        <input type="file" accept="image/png, image/jpeg" className="form-control" onMouseDownCapture={e => valchange(true)} onChange={handleChange} />
                    </div>

                    <div className="mb-3">
                        <label htmlForfor="body" className="form-label">Body</label>
                        <textarea className="form-control" onMouseDownCapture={e => valchange(true)} onChange={e => bodychange(e.target.value)} value={body} required rows="10" placeholder=""></textarea>
                        {body.length===0 &&  validation && <span className="text-danger">this field is required</span>}

                    </div>
                    <div className="mb-6">
                        <button type="submit" className="btn btn-success">Create</button>
                        <Link to="/post/manage" className="text-black ml-4">Back</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PostCreate;