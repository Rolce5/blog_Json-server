import {Link, useNavigate} from "react-router-dom"
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
const Login = () => {
    const[email,emailupdate] = useState('');
    const[password,passwordupdate] = useState('');

    const navigate = useNavigate();


    // const getUser = async () => {
    //    try{ const res = await fetch("http://localhost:8000/user/"+email).then(users  = > {
                // users.filter((user) => (user.email === email))
            // });
            // if(Object.keys(resp).length===0){
            //     toast.error('Please enter valid credentials');
            // } else{
            //     if(resp.password===password){
            //         navigate('/post/manage')
            //         toast.success('Success')
            //         // sessionStorage.setItem('username',username)
            //     }else{
            //         toast.error('Password is incorrect');
            //     }
            // }
    // } catch (e) {
        // toast.error('login failed :'+err.message)
    // }
    //     const posts = await res.json()
    //     postdatachange(posts)
    
    // }

    useEffect(() => {
        sessionStorage.clear();
    })
    const ProceedLogin = (e) =>{
        e.preventDefault();
        if(validate()){
 
/* 
            fetch("http://localhost:8000/user/"+email).then(users  = > {
                users.filter((user) => (user.email === email))
            })
            const res = await  fetch("")
            const users = awiat res.json() //  [{1}, {2} ]
            const thisUser = users.filter((user) => (user.email === email))
            console.log(thisUser[0])

            const currentUser = thisUser[0]

            if(currentser.password === p)


*/
            fetch("http://localhost:8000/user/"+email).then((res)=>{
                return res.json();
            }).then((resp)=>{
                // console.log(resp)
                if(Object.keys(resp).length===0){
                    toast.error('Please enter valid email');
                } else{
                    if(resp.password===password){
                        navigate('/post/manage')
                        toast.success('Success')
                        // sessionStorage.setItem('username',username)
                    }else{
                        toast.error('Please enter valid credentials');
                    }
                }
            }).catch((err)=>{
                toast.error('login failed :'+err.message)
            })
        }
    }

    const validate=()=>{
        let result = true;
        if(email === '' || email === null){
            result = false; 
            toast.warning('Please enter username')
        }
        if(password === '' || password === null){
            result = false; 
            toast.warning('Please enter password')
        }
        return result;
    }
    return (
        <div className="container col-xl-10 col-xxl-8 px-4 py-5 ">
            <div className="col-md-10 mx-auto col-lg-7">
                <form className="p-4 p-md-5 border  bg-light" onSubmit={ProceedLogin}>
                    <header className="text-center">
                        <h2 className="text-2xl font-bold uppercase mb-1">Login</h2>
                        <p className="mb-4">Log into your account create to post</p>
                    </header>
                    <div className="mb-3">
                        <label htmlfor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" value={email} onChange={e=>emailupdate(e.target.value)}></input>
                    </div>
                    <div className="mb-3">
                        <label htmlfor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" value={password} onChange={e=>passwordupdate(e.target.value)}></input>
                    </div>
                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary">LogIn</button>
                    </div>
                    <div className="mb-3">
                        <p>Don't have an account?
                            <Link to="/register" > Register</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;