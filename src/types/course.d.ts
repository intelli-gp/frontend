export interface Course {
    /**
     * Title of the course
     */
    Title: string;

    /**
     * A short tweetable description of the course.
     */
    Headline: string;

    /**
     * Primary category of the course
     */
    PrimaryCategory: string;

    /**
     * Primary subcategory of the course
     */
    PrimarySubcategory: string;

    /**
     * Number of reviews the course has
     */
    NumReviews: number;

    /**
     * Average rating of the course
     */
    AvgRating: number;

    /**
     * URL to the course's thumbnail
     */
    Thumbnail: string;

    /**
     * List of instructor names for the course
     */
    Instructors: string[];

    /**
     * Price of the course with currency symbol
     */
    Price: number;

    /**
     * URL to the course's page
     */
    RedirectUrl: string;
}
export interface PaginatedCourseResponse {
    /**
     * Total number of courses in this page
     */
    Count: number;
    /**
     * Total number of pages
     */
    NumPages: number;
    /**
     * Next page number
     */
    NextPageNum: number | null;
    /**
     * Current page number
     */
    CurrentPageNum: number;
    /**
     * Previous page number
     */
    PreviousPageNum: number | null;
    /**
     * Number of courses per page (not necessarily the number of courses in this page)
     */
    LimitPerPage: number;
    /**
     * List of courses in this page
     */
    Results: Course[];
}

export interface CategoryWithCourses {
    /**
     * Category name
     */
    Category: string;
    /**
     * List of courses in this category
     */
    Courses: Course[];
}
