export interface InterestsResponse {
    data: Array<{
        id: string;
        type: string;
        attributes: {
            'continent': string;
            'name': string;
            'image-url': string;
            'category-name': string;
        }
    }>
}