export interface SignUpAuthActionRequest {
    type: string;
    attributes: {
        email: string;
        password: string;
        phone: string;
        'first-name': string;
        'last-name': string;
    }
}

export interface SignUpAuthActionSuccessResponse {
    data: {
        type: string;
        attributes: {
            'first-name': string;
            'last-name': string;
            email: string;
        }
    }
}

export interface SignUpAuthActionFailureResponse {
    id: string;
    links: {
        about: string;
    }
    status: string;
    code: string;
    title: string;
    detail: string;
    source: {
        pointer: string;
        parameter: string;
    }
    meta: string;
}

export interface SignInAuthActionRequest {
    type: string;
    attributes: {
        email: string;
        password: string;
    }
}

export interface SignInAuthActionSuccessResponse {
    data: {
        type: string;
        attributes: {
            'first-name': string;
            'last-name': string;
            email: string;
        }
    }
}

export interface SignInAuthActionFailureResponse {
    id: string;
    links: {
        about: string;
    }
    status: string;
    code: string;
    title: string;
    detail: string;
    source: {
        pointer: string;
        parameter: string;
    }
    meta: string;
}