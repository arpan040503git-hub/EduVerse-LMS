import API from "./client";

export const getMyEnrollments = () => {
    return API.get("/enrollments/my");
};

export const getWishlist = () => {
    return API.get("/wishlist");
};