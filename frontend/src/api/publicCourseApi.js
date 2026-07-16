import API from "./client";

export const getCourses = () =>
    API.get("/courses");

export const getCourseById = (courseId) =>
    API.get(`/courses/${courseId}`);