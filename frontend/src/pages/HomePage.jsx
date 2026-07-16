import { useEffect, useState } from "react";
import { getCourses } from "../api/publicCourseApi";
import CourseCard from "../components/CourseCard";

function HomePage() {

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchCourses = async () => {

            try {

                const response = await getCourses();

                setCourses(response.data.courses);

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);

            }

        };

        fetchCourses();

    }, []);

    if (loading)
        return <h2>Loading...</h2>;

    return (
        <div>

            <h1>Latest Courses</h1>

            {
                courses.length === 0 ? (
                    <h3>No Courses Found</h3>
                ) : (

                    courses.map((course) => (
                        <CourseCard
                            key={course._id}
                            course={course}
                        />
                    ))

                )
            }

        </div>
    );
}

export default HomePage;