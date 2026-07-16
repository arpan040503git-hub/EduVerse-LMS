import { Link } from "react-router-dom";

function CourseCard({ course }) {
    return (
        <div className="course-card">

            <img
                src={course.thumbnail}
                alt={course.title}
                width="250"
            />

            <h3>{course.title}</h3>

            <p>{course.subtitle}</p>

            <p>₹ {course.price}</p>

            <Link to={`/courses/${course._id}`}>
                View Details
            </Link>

        </div>
    );
}

export default CourseCard;