import CourseSidebar from "./CourseSidebar";

function CourseBuilderLayout({ children }) {
    return (
        <div
            style={{
                display: "flex",
                gap: "30px",
                alignItems: "flex-start",
            }}
        >
            <CourseSidebar />

            <div
                style={{
                    flex: 1,
                    background: "#fff",
                    padding: "20px",
                    borderRadius: "10px",
                    boxShadow: "0 2px 10px rgba(0,0,0,.1)",
                }}
            >
                {children}
            </div>
        </div>
    );
}

export default CourseBuilderLayout;