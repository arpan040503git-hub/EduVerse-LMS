function CourseBasicInfo({
    formData,
    handleChange,
    handleSubmit,
    saving,
}) {

    return (

        <form onSubmit={handleSubmit}>

            <h2>Basic Information</h2>

            <input
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
            />

            <br /><br />

            <input
                name="subtitle"
                placeholder="Subtitle"
                value={formData.subtitle}
                onChange={handleChange}
            />

            <br /><br />

            <textarea
                rows="6"
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
            />

            <br /><br />

            <input
                name="category"
                placeholder="Category"
                value={formData.category}
                onChange={handleChange}
            />

            <br /><br />

            <input
                name="level"
                placeholder="Level"
                value={formData.level}
                onChange={handleChange}
            />

            <br /><br />

            <input
                name="language"
                placeholder="Language"
                value={formData.language}
                onChange={handleChange}
            />

            <br /><br />

            <input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
            />

            <br /><br />

            <button>

                {
                    saving
                        ? "Saving..."
                        : "Save Changes"
                }

            </button>

        </form>

    );
}

export default CourseBasicInfo;