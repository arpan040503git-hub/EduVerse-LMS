import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getSingleCourse, updateCourse } from "../../api/instructorApi";

function EditCoursePage() {
  const { courseId } = useParams();

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    category: "",
    level: "",
    language: "",
    price: 0,
  });

  const fetchCourse = async () => {
    try {
      const response = await getSingleCourse(courseId);

      const course = response.data.course;

      setFormData({
        title: course.title || "",
        subtitle: course.subtitle || "",
        description: course.description || "",
        category: course.category || "",
        level: course.level || "",
        language: course.language || "",
        price: course.price || 0,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCourse();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const response = await updateCourse(courseId, formData);

      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <div>
      <h1>Edit Course</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
        />

        <input
          name="subtitle"
          value={formData.subtitle}
          onChange={handleChange}
          placeholder="Subtitle"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
        />

        <input
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
        />

        <input
          name="level"
          value={formData.level}
          onChange={handleChange}
          placeholder="Level"
        />

        <input
          name="language"
          value={formData.language}
          onChange={handleChange}
          placeholder="Language"
        />

        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
        />

        <button type="submit">{saving ? "Saving..." : "Update Course"}</button>
      </form>
    </div>
  );
}

export default EditCoursePage;
