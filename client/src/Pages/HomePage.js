import React from "react";

export default class HomePage extends React.Component {
  render() {
    return (
    <div>
      <div style={{padding: "100px", "text-align": "center", background: "#9393A6", "color": "white"}}>
        <h1>JobZ</h1>
        <p>
          <small>
            A virtual career for students, recruiters, and organizers.
          </small>
        </p>
      </div>
      <div style={{padding: "100px", "text-align": "center", background: "#84849A", "color": "white"}}>
        <h1>STUDENTS</h1>
        <p>
          <small>
            Students can upload their resumes, search and attend career fairs, and join interviews with recruiters.
          </small>
        </p>
        <p>
            Log In
        </p>
      </div>
      <div style={{padding: "100px", "text-align": "center", background: "#75758D", "color": "white"}}>
        <h1>RECRUITERS</h1>
        <p>
          <small>
            Recruiters can add or add jobs they make available through the fair once the organizer grants the company access. Once  the  event  is  live,  recruiters  can  see  all  the  students and their resumes in  the  company  queue  and join meetings with them.
          </small>
        </p>
        <p>
            Log In
        </p>
      </div>
      <div style={{padding: "100px", "text-align": "center", background: "#666681", "color": "white"}}>
        <h1>ORGANIZERS</h1>
        <p>
          <small>
            Organizers view their live, upcoming, or past career fairs. They can edit existing careers fairs or create a new career fair by filling out a form with details for the event.
          </small>
        </p>
        <p>
            Log In
        </p>
      </div>
    </div>
    );
  }
}
