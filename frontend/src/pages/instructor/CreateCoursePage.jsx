import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createCourse } from "../../api/instructorApi";

function CreateCoursePage() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        category: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            setLoading(true);

            const response = await createCourse(formData);

            alert(response.data.message);

            navigate(`/dashboard/course/${response.data.course._id}`);

        } catch (error) {

            alert(error.response?.data?.message || "Course creation failed");

        } finally {

            setLoading(false);

        }
    };

    return (
        <div>

            <h1>Create Course</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="title"
                    placeholder="Course Title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                />

                <button type="submit">
                    {loading ? "Creating..." : "Create Course"}
                </button>

            </form>

        </div>
    );
}

export default CreateCoursePage;