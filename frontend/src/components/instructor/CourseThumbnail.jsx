import { useState } from "react";

function CourseThumbnail({ onUpload }) {

    const [thumbnail, setThumbnail] = useState(null);

    const handleSubmit = (e) => {

        e.preventDefault();

        const formData = new FormData();

        formData.append("thumbnail", thumbnail);

        onUpload(formData);

    };

    return (

        <form onSubmit={handleSubmit}>

            <h2>Thumbnail</h2>

            <input
                type="file"
                onChange={(e) =>
                    setThumbnail(e.target.files[0])
                }
            />

            <br /><br />

            <button>
                Upload Thumbnail
            </button>

        </form>

    );
}

export default CourseThumbnail;