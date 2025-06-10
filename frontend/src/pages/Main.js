import React,{useEffect} from 'react';
import '../main1.css';
import team1Image from '../images/team-1.jpg';
import team2Image from '../images/team-2.jpg';
import team3Image from '../images/team-3.jpg';
import team4Image from '../images/team-4.jpg';
import team5Image from '../images/team-5.jpg';
import team6Image from '../images/team-6.jpg';
import team7Image from '../images/team-7.jpg';
import team8Image from '../images/team-8.jpg';
import logo from '../images/logo.png';
function Main() {
    useEffect(() => {
        (function () {
            (function () {
                const select = (el, all = false) => {
                    el = el.trim()
                    if (all) {
                        return [...document.querySelectorAll(el)]
                    } else {
                        return document.querySelector(el)
                    }
                }

                const onscroll = (el, listener) => {
                    el.addEventListener('scroll', listener)
                }
                let navbarlinks = select('#navbar .scrollto', true)
                const navbarlinksActive = () => {
                    let position = window.scrollY + 200
                    navbarlinks.forEach(navbarlink => {
                        if (!navbarlink.hash) return
                        let section = select(navbarlink.hash)
                        if (!section) return
                        if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
                            navbarlink.classList.add('active')
                        } else {
                            navbarlink.classList.remove('active')
                        }
                    })
                }
                window.addEventListener('load', navbarlinksActive)
                onscroll(document, navbarlinksActive)
                let selectHeader = select('#header')
                if (selectHeader) {
                    const headerScrolled = () => {
                        if (window.scrollY > 100) {
                            selectHeader.classList.add('header-scrolled')
                        } else {
                            selectHeader.classList.remove('header-scrolled')
                        }
                    }
                    window.addEventListener('load', headerScrolled)
                    onscroll(document, headerScrolled)
                }

            })()
        })();
    }, []);
    return (
        <div>
            <header id="header" className="fixed-top d-flex align-items-center header-transparent">
                <div className="container d-flex justify-content-between align-items-center">

                    <div id="logo">
                        <a href="/Main"><img src={logo} alt="" className='logo-size'></img></a>
                    </div>
                    <nav id="navbar" className="navbar">
                        <ul >
                            <li><a className="nav-link scrollto active" href="#hero">Home</a></li>
                            <li><a className="nav-link scrollto" href="#about">About</a></li>
                            <li><a className="nav-link scrollto" href="#services">Services</a></li>
                            <li><a className="nav-link scrollto" href="#team">Doctors</a></li>
                            <li><a className="nav-link" href="./login">Login</a></li>
                            <li><a className="nav-link-border" href="./register">signup</a></li>
                        </ul>
                        <i className="bi bi-list mobile-nav-toggle"></i>
                    </nav>
                    {/* <!-- .navbar --> */}
                </div>
            </header>
            {/* <!-- End Header --> */}
            {/* <!-- ======= Hero Section ======= --> */}
            <section id="hero">
                <div className="hero-container"  >
                    <h1>Welcome to HealthHub</h1>
                    <h2>Seamless Hospital Appointment Booking</h2>
                    <a href="/login" className="btn-get-started">Book Appointment</a>
                </div>
            </section>
            {/* <!-- End Hero Section --> */}
            <main id="main">
                {/* <!-- ======= About Section ======= --> */}
                <section id="about">
                    <div className="container" >
                        <div className="row about-container">

                            <div className="col-lg-12 content order-lg-1 order-1">
                                <h2 className="title">Few Words About Us</h2>
                                <p>Welcome to HealthHub, your trusted online platform for hassle-free medical
                                    appointment booking. We're dedicated to connecting you with the best healthcare
                                    providers, making your health a top priority.
                                </p>

                                <div className="icon-box" >
                                    <div className="icon"><i className="ri-focus-2-line"></i></div>
                                    <h4 className="title"><p>Our Mission</p></h4>
                                    <p className="description">Our mission is to empower individuals to take control of their
                                        health by providing a user-friendly platform for booking medical appointments. We are
                                        committed to delivering a seamless and efficient healthcare booking experience</p>
                                </div>

                                <div className="icon-box"  >
                                    <div className="icon"><i className="ri-search-eye-line"></i></div>
                                    <h4 className="title"><p>OUR VISION</p></h4>
                                    <p className="description">At HealthHub, we envision a future where accessing quality
                                        healthcare is simple and accessible to all. Our goal is to revolutionize the way
                                        individuals engage with their healthcare providers, promoting better health outcomes
                                        and improved well-being.
                                    </p>
                                </div>

                                <div className="icon-box"  >
                                    <div className="icon"><i className="ri-medal-line"></i></div>
                                    <h4 className="title"><p>CORE VALUES</p></h4>
                                    <p className="description">Our core values drive our commitment to excellence. We
                                        prioritize integrity, patient-centric care, and continuous improvement. These values
                                        guide every decision and action we take, ensuring that your health and satisfaction
                                        remain at the forefront of our platform's purpose.
                                    </p>
                                </div>

                            </div>

                            <div className="col-lg-12 background order-lg-6 order-2"></div>
                        </div>

                    </div>
                </section>
                {/* <!-- End About Section --> */}
                {/* <!-- ======= Services Section ======= --> */}
                <section id="services">
                    <div className="container" >
                        <div className="section-header">
                            <h3 className="section-title">Services</h3>
                            <p className="section-description">Discover Our Comprehensive Services for Your Health and Wellness</p>
                        </div>
                        <div className="row">
                            <div className="col-lg-4 col-md-4" >
                                <div className="box">
                                    <div className="icon"><p><i className="bi bi-briefcase"></i></p></div>
                                    <h4 className="title"><p>Appointment Scheduling</p></h4>
                                    <p className="description">Conveniently book healthcare appointments online in just a few clicks.</p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4" >
                                <div className="box">
                                    <div className="icon"><p><i className="bi bi-card-checklist"></i></p></div>
                                    <h4 className="title"><p> Doctor Search and Selection</p></h4>
                                    <p className="description">Find the right healthcare provider based on specialty, location, and reviews.</p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4" >
                                <div className="box">
                                    <div className="icon"><p><i className="bi bi-bar-chart"></i></p></div>
                                    <h4 className="title"><p>Appointment Notifications</p></h4>
                                    <p className="description">Stay on top of your health with timely SMS and email reminders for your appointments.</p>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-4" >
                                <div className="box">
                                    <div className="icon"><p><i className="bi bi-binoculars"></i></p></div>
                                    <h4 className="title"><p> Telehealth Consultations</p></h4>
                                    <p className="description">Virtual appointments with healthcare professionals for remote consultations</p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4" >
                                <div className="box">
                                    <div className="icon"><p><i className="ri-health-book-line"></i></p></div>
                                    <h4 className="title"><p> Medical Records Access</p></h4>
                                    <p className="description">Securely access and manage your medical records in one place</p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4" >
                                <div className="box">
                                    <div className="icon"><p><i className="bi bi-calendar4-week"></i></p></div>
                                    <h4 className="title"><p>Wellness Resources</p></h4>
                                    <p className="description">Stay informed with our health resources. Access articles, videos, and tips for a healthier, happier life.</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>
                {/* <!-- End Services Section --> */}
                {/* <!-- ======= Call To Action Section ======= --> */}
                <section id="call-to-action">
                    <div className="container">
                        <div className="row" >
                            <div className="col-lg-9 text-center text-lg-start">
                                <h3 className="cta-title">Call in Case of Emergency</h3>
                                <p className="cta-text">If you are experiencing a medical emergency, please call 108 immediately.
                                    For non-life-threatening medical concerns or to reach our healthcare professionals, you can contact our emergency hotline
                                    We are available 24/7 to assist you with any urgent healthcare needs. Your health and safety are our top priority.
                                </p>
                            </div>
                            <div className="col-lg-3 cta-btn-container text-center">
                                <a className="cta-btn align-middle" href="tel:+7013672574">Emergency Hotline</a>
                            </div>
                        </div>

                    </div>
                </section>
                {/* <!-- End Call To Action Section --> */}
                {/* <!-- ======= Team Section ======= --> */}
                <section id="team">
                    <div className="container" >
                        <div className="section-header">
                            <h3 className="section-title">Meet Our Top Doctors</h3>
                            <p className="section-description">Explore their qualifications and dedication to your well-being</p>
                        </div>
                        <div className="row">
                            <div className="col-lg-3 col-md-4">
                                <div className="member"  >
                                    <div className="pic"><img src={team1Image} alt=""></img></div>
                                    <h4>Dr. Sarah Johnson</h4>
                                    <span>Pediatrician</span>
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-4">
                                <div className="member" data-aos-delay="200">
                                    <div className="pic"><img src={team2Image} alt=""></img></div>
                                    <h4>Dr. William Anderson</h4>
                                    <span> Cardiologist</span>
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-4">
                                <div className="member"  >
                                    <div className="pic"><img src={team3Image} alt=""></img></div>
                                    <h4>Dr. Amanda Jepson</h4>
                                    <span>Dermatologist</span>
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-4">
                                <div className="member" data-aos-delay="400">
                                    <div className="pic"><img src={team4Image} alt=""></img></div>
                                    <h4>Dr. John Smith</h4>
                                    <span>Orthopedic Surgeon</span>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col-lg-3 col-md-4">
                                <div className="member"  >
                                    <div className="pic"><img src={team5Image} alt=""></img></div>
                                    <h4>Dr. Robert Lee</h4>
                                    <span>Gynecologist</span>
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-4">
                                <div className="member" data-aos-delay="200">
                                    <div className="pic"><img src={team6Image} alt=""></img></div>
                                    <h4>Dr. James Miller</h4>
                                    <span>Psychiatrist</span>
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-4">
                                <div className="member"  >
                                    <div className="pic"><img src={team7Image} alt=""></img></div>
                                    <h4>Dr. Michael Davis</h4>
                                    <span>Ophthalmologist</span>
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-4">
                                <div className="member" data-aos-delay="400">
                                    <div className="pic"><img src={team8Image} alt=""></img></div>
                                    <h4>Dr. Laura Wilson</h4>
                                    <span>Dentist</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>
                {/* <!-- End Team Section --> */}
            </main>
            {/* <!-- End #main --> */}

            {/* <!-- ======= Footer ======= --> */}
            <footer id="footer">
                <div className="footer-top">
                    <div className="container">

                    </div>
                </div>

                <div className="container row ">
                    <div className='col-lg-1'>

                    </div>
                    <div className="footer-content col-lg-5 ">
                        <h3>Contact Information</h3>
                        <p>If you have any questions or need assistance, please feel free to reach out to us:</p>
                        <ul>
                            <li>Email: contact@yourhealthcare.com</li>
                            <li>Phone: +1 (555) 123-4567</li>
                            <li>Address: 123 Medical Way, Your City, ST 12345</li>
                        </ul>
                    </div>
                    <div className="footer-links col-lg-3">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><a href="#hero">Book an Appointment</a></li>
                            <li><a href="#services">Our Services</a></li>
                            <li><a href="#team">Meet Our Doctors</a></li>
                        </ul>
                    </div>
                </div>

            </footer>
            <script src="assets/js/main.js"></script>
        </div>
    );
}

export default Main;