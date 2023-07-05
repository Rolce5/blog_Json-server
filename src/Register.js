import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"


const Register = () => {
    const[username,usernamechange] = useState("");
    const[email,emailchange] = useState("");
    const[password,passwordchange] = useState("");

    const navigate = useNavigate()

    const IsValidate=()=>{
        let isproceed = true;
        let errorMessage = 'Please enter the value in ';
        if(username ===null || username===''){
            isproceed=false;
            errorMessage += 'Username '
        }
        if(password===null || password===''){
            isproceed=false;
            errorMessage += 'password '
        }
        if(email===null || email===''){
            isproceed=false;
            errorMessage += 'email '
        }
        if(!isproceed){
          toast.warning(errorMessage)
        } 
        return isproceed;
    }
    const handlesubmit=(e)=>{
        e.preventDefault();
        let user = {username, email, password}; 
        if (IsValidate()){
        // console.log(user);

        fetch("http://localhost:8000/user", {
            method:"POST",
            headers:{'content-type':'application/json'},
            body:JSON.stringify(user)
        }).then((res) => {
            toast.success('Registered successfully.')
            navigate('/post/manage')
        }).catch((err) => {
            toast.error('Failed :'+err.message);
        });
    }
    }
    return (
        <div className="container col-xl-10 col-xxl-8 px-4 py-5 ">
            <div className="col-md-10 mx-auto col-lg-7">
                <form className="p-4 p-md-5 border  bg-light" onSubmit={handlesubmit}>
                    <header className="text-center">
                        <h2 className="text-2xl font-bold uppercase mb-1">Register</h2>
                        <p className="mb-4">Create an account </p>
                    </header>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">User Name</label>
                        <input type="text" className="form-control"  value={username} onChange={e=>usernamechange(e.target.value)}></input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="text" className="form-control" value={email} onChange={e=>emailchange(e.target.value)} ></input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" value={password} onChange={e=>passwordchange(e.target.value)} ></input>
                    </div>
                    {/* <div class="mb-3">
                        <label htmlFor="password_confirmation" class="form-label">Confirm Password</label>
                        <input type="password" class="form-control" name="password_confirmation" value={password_confirmation}></input>
                    </div> */}
                    <div className="mb-3">
                        <button className="btn btn-primary">Sign Up</button>
                    </div>

                    <div className="mb-3">
                        <p>Already have an account?
                            <Link to="/login" > Login</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>

    );
}

export default Register;