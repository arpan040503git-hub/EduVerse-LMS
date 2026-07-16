function CoursePublish({

    publish,

    unpublish,

    remove,

}) {

    return (

        <div>

            <h2>Publish Course</h2>

            <button onClick={publish}>
                Publish
            </button>

            <br /><br />

            <button onClick={unpublish}>
                Unpublish
            </button>

            <br /><br />

            <button onClick={remove}>
                Delete Course
            </button>

        </div>

    );
}

export default CoursePublish;