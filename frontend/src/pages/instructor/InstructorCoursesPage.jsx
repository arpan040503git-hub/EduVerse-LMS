import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getMyCourses } from "../../api/instructorApi";

function InstructorCoursesPage() {

    const [courses, setCourses] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchCourses = async () => {

            try {

                const response = await getMyCourses();

                setCourses(response.data.courses);

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);

            }

        };

        fetchCourses();

    }, []);

    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <div>

            <h1>My Courses</h1>

            <Link to="/dashboard/create-course">
                Create New Course
            </Link>

            <hr />

            {
                courses.length === 0
                    ? <h3>No Courses Found</h3>
                    : courses.map((course) => (

                        <div key={course._id}>

                            <h3>{course.title}</h3>

                            <p>{course.category}</p>

                            <Link to={`/dashboard/course/${course._id}`}>
                                Edit
                            </Link>

                        </div>

                    ))
            }

        </div>
    );
}

export default InstructorCoursesPage;