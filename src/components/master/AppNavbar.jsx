"use client";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Link from "next/link";
import {useEffect, useState} from "react";
import Cookies from "js-cookie";

function AppNavBar(props) {

    let [Keyword, SetKeyword] = useState(" ");
    let [login,SetLogin] = useState(false);

    useEffect(() => {
        if(Cookies.get('token')){
            SetLogin(true);
        }
        else {
            SetLogin(false);
        }
    }, []);

    return (
        <div>
            <div className="py-2 bg-dark text-white container-fluid">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-md-4">
                         
                            <h6>
                                <i className="bi bi-calendar2-check"></i> Today:
                                <span>
                                    {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'numeric', year: 'numeric' })}
                                </span>
                            </h6>

                        </div>
                        <div className="col-md-4">
                            <span className="float-end">
                                <a target="_blank" className="text-white" href={props.data['socials']['facebook']}><i className="mx-2 bi bi-facebook"></i></a>
                                <a target="_blank" className="text-white" href={props.data['socials']['youtube']}><i className="mx-2 bi bi-youtube"></i></a>
                                <a target="_blank" className="text-white" href={props.data['socials']['twitter']}><i className="mx-2 bi bi bi-twitter"></i></a>
                                <a target="_blank" className="text-white" href={props.data['socials']['linkedin']}><i className="mx-2 bi bi-linkedin"></i></a>                            
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <Navbar expand="lg" className="bg-white sticky-top shadow-sm">
                <div className="container">
                    <div className="navbar-brand">
                        <Link href="/">
                            <img className="nav-logo" src={"/images/logo.svg"} alt="img"/>
                        </Link>                  
                    </div>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto ms-3 my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                            <Link className="nav-link f-13" href="/">Home</Link>
                            {
                                props.data['categories'].map((Item,i)=>{
                                    return (
                                        <Link key={i} className="nav-link f-13"  href={"/category?id="+Item['id']} >{Item['name']}</Link>
                                    )
                                })
                            }
                        </Nav>
                        <div className="d-flex ms-3">
                            <div className="input-group">
                                <input onChange={(e)=>{SetKeyword(e.target.value)}} type="text" className="form-control" placeholder="Search..."/>
                                <Link href={Keyword === ""?('/') : (`/search?keyword=${Keyword}`)} className="btn btn-danger" type="button"><i className="bi bi-search"></i></Link>
                            </div>
                        </div>
              
                        {
                            props.isLogin?(
                                <>
                                    <div className="float-right mx-3 h-auto d-flex">
                                        <div className="user-dropdown">
                                            <img className="icon-nav-img icon-nav" src="/images/profile.png" alt=""/>
                                            <div className="user-dropdown-content ">
                                                <div className="mt-2 text-center">
                                                    <img className="icon-nav-img" src="/images/profile.png" alt=""/>                                                  
                                                </div>
                                                <Link href="/profile" className="side-bar-item">
                                                    <span className="side-bar-item-caption">Profile</span>
                                                </Link>
                                                <Link href="/comments" className="side-bar-item">
                                                    <span className="side-bar-item-caption">Comments</span>
                                                </Link>
                                                <a href="/api/user/login" className="side-bar-item">
                                                    <span className="side-bar-item-caption">Logout</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </>

                            ) : (
                                <>
                                    <Link href="/user/login" className="btn ms-3 btn-outline-danger">Login</Link>
                                </>
                            )
                        }



                    </Navbar.Collapse>
                </div>
            </Navbar>

        </div>
    );
}
export default AppNavBar;