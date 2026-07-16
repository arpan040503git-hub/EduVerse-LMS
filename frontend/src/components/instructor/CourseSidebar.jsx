import { NavLink, useParams } from "react-router-dom";

function CourseSidebar() {

    const { courseId } = useParams();

    return (

        <div
            style={{
                width: "250px",
                background: "#fff",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 2px 10px rgba(0,0,0,.1)",
            }}
        >

            <h3>Course Builder</h3>

            <nav>

                <NavLink to={`/dashboard/course/${courseId}`}>
                    Basic Information
                </NavLink>

                <br />
                <br />

                <NavLink to={`/dashboard/course/${courseId}/thumbnail`}>
                    Thumbnail
                </NavLink>

                <br />
                <br />

                <NavLink to={`/dashboard/course/${courseId}/sections`}>
                    Curriculum
                </NavLink>

                <br />
                <br />

                <NavLink to={`/dashboard/course/${courseId}/publish`}>
                    Publish
                </NavLink>

            </nav>

        </div>

    );
}

export default CourseSidebar;