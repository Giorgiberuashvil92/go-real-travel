export interface CitiesResponse {
    data: Array<{
        id: string;
        type: string;
        attributes: {
            'name': string;
            'country-code': string;
            'country-name': string;
            'continent-name': string;
            'show-in-wizard': boolean;
            'wizard-order': number;
            'image-url': string;
        }
    }>
}