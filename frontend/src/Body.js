import { Link } from "react-router-dom";
import Header from "./Header"
import Footer from "./Footer";






function Body() {
    return (
     
      <div className="Body">
        <Header/>

  <section id="hero" class="d-flex align-items-center">
    <div class="container position-relative" data-aos="fade-up" data-aos-delay="500">
      <h1>Welcome to DirectHire</h1>
      <h2>Unlocking Expertise, Where Skilled Workers Meet Quality Work</h2>
      <a href="#about" class="btn-get-started scrollto">Get Started</a>
    </div>
  </section>


  


<section id="about" class="about">
  <div className="about-body">
  <div class="container">

  <h1>What is Direct Hire</h1>
  <p>DirectHire is  online portal that connects people and work, 24/7. For businesses, DirectHire connects with qualified and motivated workers when and where you need them most. For job seekers, DirectHire helps you find short-term, flexible jobs in your area that match your skills and fit your schedule.</p>
  <p>Experience the DirectHire difference today.

</p>


    <div class="row rowabout">
      <div class="col-lg-6 order-1 order-lg-2" data-aos="fade-left">
    
        <div class="icon-box-about">
          {/* <div class="icon"><i class="bx bx-world"></i></div> */}
          <h4><b>FIND WORKER</b></h4>
          <br/>
          <h4>REQUEST TEMPORARY STAFF WITH
          DIRECTHIRE | FIND WORKERS</h4>
        

          <Link to="Display">
          <button>WORKER SEARCH</button>
          </Link>
        </div>
      
      </div>

      <div class="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content" data-aos="fade-right">
      
        <div class="icon-box-about">
          {/* <div class="icon"><i class="bx bx-world"></i></div> */}
          <h4> <b> FIND A JOB </b></h4>
          <br/>
          <h4>REQUEST YOUR NEEDS WITH   <br/>
           DIRECTHIRE | FIND JOBS</h4>

        

          <Link to="Workdisplay">
          <button>JOB SEARCH</button>
          </Link>
         
        </div>
      
      </div>

    </div>

  </div>
  </div>
</section>

  

 
 

    <Footer/>
  
      </div>
    );
  }
  
  export default Body;
  