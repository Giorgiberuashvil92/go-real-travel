export interface AffiliatePartnerActivitiesResponse {
    data: Array<{
        id: string;
        type: string;
        attributes: {
            'title': string;
            'url': string;
            'image-url': string;
            'partner-name': string;
            'about': string;
            'description': string;
            'price': number;
            'currency': string;
            'duration': {
                'hours': number;
            }
            'position': number;
        }
        relationships: {
            'activity-types': {
                'data': Array<{
                    'id': string;
                    'type': string;
                }>
            }
        }
    }>
}

export interface AffiliatePartnerActivitiesLiveSearchResponse {
    data: Array<{
        type: string;
        attributes: {
            "title": string;
            "url": string;
            "image-url": string;
            "partner-name": string;
            "description": string;
            "price": number;
            "currency": string;
            "duration": {
                "years": number;
                "months": number;
                "weeks": number;
                "days": number;
                "hours": number;
                "minutes": number;
                "seconds": number;
            },
            "position": number;
            "activity-types": Array<{
                "data": {
                    "type": string;
                    "attributes": {
                        "name": string;
                    }
                }
            }>
        }
    }>
}

export interface AffiliateActivityTypesResponse {
    data: Array<{
        id: string;
        type: string;
        attributes: {
            name: string;
        }
    }>
}

export interface AffiliatePartnerTransportsResponse {
    data: Array<{
        type: string;
        attributes: {
            "title": string;
            "transportations": Array<{
                "title": string;
                "url": string;
                "image-url": string;
                "partner-name": string;
                "description": string;
                "transport-type": string;
                "date": string;
                "duration": {
                    "years"?: number;
                    "months"?: number;
                    "weeks"?: number;
                    "days"?: number;
                    "hours"?: number;
                    "minutes"?: number;
                    "seconds"?: number;
                }
            }>
        }
    }>
}