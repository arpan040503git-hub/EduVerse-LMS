import API from "./client";

export const getMyCourses = () => {
    return API.get("/courses/my-courses");
};

export const createCourse = (data) => {
    return API.post("/courses", data);
};

export const getSingleCourse = (courseId) => {
    return API.get(`/courses/${courseId}`);
};

export const updateCourse = (courseId, data) => {
    return API.patch(`/courses/${courseId}`, data);
};

export const uploadThumbnail = (courseId, formData) => {
    return API.patch(`/courses/${courseId}/thumbnail`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const publishCourse = (courseId) => {
    return API.patch(`/courses/${courseId}/publish`);
};

export const unpublishCourse = (courseId) => {
    return API.patch(`/courses/${courseId}/unpublish`);
};

export const deleteCourse = (courseId) => {
    return API.delete(`/courses/${courseId}`);
};