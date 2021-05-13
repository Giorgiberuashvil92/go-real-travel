export interface ItineraryResponse {
    data: {
        id: string;
        type: string;
        attributes: {
            'start-date': string;
            'end-date': string;
            'days-count': number;
            'continent': string;
            'transportation-plan': Array<{
                'step': number;
                'type': string;
                'icon': string;
                'top-text': string;
                'bottom-text': string;
                'bottom-text-bold': string;
                'day-index': number;
            }>
          'summary-pdf-url': string
        }
        relationships: {
            'cities': {
                'data': Array<{
                    'id': string;
                    'type': string;
                }>
            }
            'days': {
                'data': Array<{
                    'id': string;
                    'type': string;
                }>
            }
            'grouped-days': {
                'data': Array<{
                    'city': {
                        'data': {
                            'id': string;
                            'type': string;
                        }
                    }
                    'days': {
                        'data': Array<{
                            'id': string;
                            'type': string;
                        }>
                    }
                }>
            }
        }
    }
    included: Array<{
        'id': string;
        'type': string;
        'attributes': {
            'name'?: string;
            'country-code'?: string;
            'country-name'?: string;
            'continent-name'?: string;
            'show-in-wizard'?: boolean;
            'wizard-order'?: number;
            'date'?: string;
            'index'?: number;
            'removable'?: boolean;
            'half-day'?: boolean;
            'first-day'?: boolean;
            'last-day'?: boolean;
            'position'?: number;
            'summary'?: string;
            'schedule'?: string;
            'transport-type'?: string;
            'transport-name'?: string;
            'transport-description'?: string;
            'landscape-image-url'?: string;
            'square-image-url'?: string;
            'description'?: string;
            'image-url'?: string;
            'tour-offer-id'?: {
                '$oid': string;
            }
        }
        'relationships'?: {
            'starting-city'?: {
                'data'?: {
                    'id': string;
                    'type': string;
                }
            }
            'ending-city'?: {
                'data'?: {
                    'id': string;
                    'type': string;
                }
            }
            'tours'?: {
                'data'?: Array<{
                    'id': string;
                    'type': string;
                }>
            }
            'pois'?: {
                'data'?: Array<{
                    'id': string;
                    'type': string;
                }>
            }
            'city'?: {
                'data'?: {
                    'id': string;
                    'type': string;
                }
            }
        }
    }>
}

export interface FailureResponse {
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

export interface ItineraryAlternateToursResponse {
    data: Array<{
        id: string;
        type: string;
        attributes: {
            'type': string;
            'name': string;
            'description': string;
            'tags': Array<string>;
            'image-url': string;
            'transport-type': string;
            'day-index': number;
            'day-id': string;
            'old-day-tours': {
                'data': Array<{
                    'id': string;
                    'type': string;
                    'attributes': {
                        'position': number;
                        'name': string;
                        'square=image-url': string;
                    }
                    'relationships': {
                        'city': {
                            'data': {
                                'id': string;
                                'type': string;
                            }
                        }
                    }
                }>
            }
            'new-day-tours': {
                'data': Array<{
                    'id': string;
                    'type': string;
                    'attributes': {
                        'position': number;
                        'name': string;
                        'square=image-url': string;
                    }
                    'relationships': {
                        'city': {
                            'data': {
                                'id': string;
                                'type': string;
                            }
                        }
                    }
                }>
            }
        }
    }>
}

export interface UpdateItineraryTourOrTransportResponse {
    data: {
        type: string;
        attributes: {
          "start-date": string;
          "end-date": string;
          "days-count": number;
          "continent": string;
          "days": Array<{
              "data": {
                "type": string;
                "attributes": {
                  "date": string;
                  "index": number;
                  "first-day": boolean;
                  "last-day": boolean;
                  "half-day": boolean;
                  "removable": boolean;
                  "starting-city": {
                    "data": {
                      "type": string;
                      "attributes": {
                        "name": string;
                        "country-code": string;
                        "country-name": string;
                        "continent-name": string;
                        "show-in-wizard": boolean;
                        "wizard-order": number;
                      }
                    }
                  },
                  "ending-city": {
                    "data": {
                      "type": string;
                      "attributes": {
                        "name": string;
                        "country-code": string;
                        "country-name": string;
                        "continent-name": string;
                        "show-in-wizard": boolean;
                        "wizard-order": number;
                      }
                    }
                  },
                  "tours": Array<{
                    "data": {
                      "type": string;
                      "attributes": {
                        "position": boolean;
                        "name": string;
                        "summary": string;
                        "schedule": string;
                        "landscape-image-url": string;
                        "square-image-url": string;
                        "transport-type": string;
                        "transport-name": string;
                        "transport-description": string;
                        "pois": Array<{
                          "data": {
                            "type": string;
                            "attributes": {
                              "name": string;
                              "summary": string;
                              "description": string;
                              "image-url": string;
                            }
                          }
                        }>
                        "city": {
                          "data": {
                            "type": string;
                            "attributes": {
                              "name": string;
                              "country-code": string;
                              "country-name": string;
                              "continent-name": string;
                              "show-in-wizard": boolean;
                              "wizard-order": number;
                            }
                          }
                        }
                      }
                    }
                  }>
                }
            }
          }>,
          "grouped-days": Array<{
            "city": {
              "data": {
                "type": string;
                "attributes": {
                  "name": string;
                  "country-code": string;
                  "country-name": string;
                  "continent-name": string;
                  "show-in-wizard": boolean;
                  "wizard-order": number;
                }
              }
            },
            "days": Array<{
              "data": {
                "type": string;
                "attributes": {
                  "date": string;
                  "index": number;
                  "first-day": boolean;
                  "last-day": boolean;
                  "half-day": boolean;
                  "removable": boolean;
                  "starting-city": {
                    "data": {
                      "type": string;
                      "attributes": {
                        "name": string;
                        "country-code": string;
                        "country-name": string;
                        "continent-name": string;
                        "show-in-wizard": boolean;
                        "wizard-order": number;
                      }
                    }
                  },
                  "ending-city": {
                    "data": {
                      "type": string;
                      "attributes": {
                        "name": string;
                        "country-code": string;
                        "country-name": string;
                        "continent-name": string;
                        "show-in-wizard": boolean;
                        "wizard-order": number;
                      }
                    }
                  },
                  "tours": Array<{
                    "data": {
                      "type": string;
                      "attributes": {
                        "position": number;
                        "name": string;
                        "summary": string;
                        "schedule": string;
                        "landscape-image-url": string;
                        "square-image-url": string;
                        "transport-type": string;
                        "transport-name": string;
                        "transport-description": string;
                        "pois": Array<{
                          "data": {
                            "type": string;
                            "attributes": {
                              "name": string;
                              "summary": string;
                              "description": string;
                              "image-url": string;
                            }
                          }
                        }>
                        "city": {
                          "data": {
                            "type": string;
                            "attributes": {
                              "name": string;
                              "country-code": string;
                              "country-name": string;
                              "continent-name": string;
                              "show-in-wizard": boolean;
                              "wizard-order": number;
                            }
                          }
                        }
                      }
                    }
                  }>
                }
              }
            }>
          }>
          "cities": Array<{
            "data": {
              "type": string;
              "attributes": {
                "name": string;
                "country-code": string;
                "country-name": string;
                "continent-name": string;
                "show-in-wizard": boolean;
                "wizard-order": number;
              }
            }
          }>
          "transportation-plan": Array<{
            "step": number;
            "type": string;
            "icon": string;
            "top-text": string;
            "bottom-text": string;
            "bottom-text-bold": string;
            "day-index": number;
          }>
        }
    }
}

export interface ItineraryToursSearchResponse {
  data: Array<{
    id: string;
    type: string;
    attributes: {
      'name': string;
      'square-image-url': string;
    }
    relationships: {
      'city': {
        'data': {
          'id': string;
          'type': string;
        }
      }
    }
  }>
}

export interface ItinerarySolutionsForTourResponse {
  data: Array<{
    id: string;
    type: string;
    attributes: {
      "type": string;
      "name": string;
      "description": string;
      "image-url": string;
      "transport-type": string;
      "tags": Array<string>;
      "day-id": string;
      "day-index": number;
      "old-day-tours": {
        "data": Array<{
          "type": string;
          "attributes": {
            "position": number;
            "name": string;
            "summary": string;
            "schedule": string;
            "landscape-image-url": string;
            "square-image-url": string;
            "transport-type": string;
            "transport-name": string;
            "transport-description": string;
            "pois": Array<{
              "data": {
                "type": string;
                "attributes": {
                  "name": string;
                  "summary": string;
                  "description": string;
                  "image-url": string;
                }
              }
            }>
            "city": {
              "data": {
                "type": string;
                "attributes": {
                  "name": string;
                  "country-code": string;
                  "country-name": string;
                  "continent-name": string;
                  "show-in-wizard": boolean;
                  "wizard-order": number;
                }
              }
            },
            "tour-offer": {
              "data": {
                "type": string;
                "attributes": {
                  "name": string;
                  "square-image-url": string;
                  "city": {
                    "data": {
                      "type": string;
                      "attributes": {
                        "name": string;
                        "country-code": string;
                        "country-name": string;
                        "continent-name": string;
                        "show-in-wizard": boolean;
                        "wizard-order": number;
                      }
                    }
                  }
                }
              }
            }
          }
        }>
      }
      "new-day-tours": {
        "data": Array<{
          "type": string;
          "attributes": {
            "position": number;
            "name": string;
            "summary": string;
            "schedule": string;
            "landscape-image-url": string;
            "square-image-url": string;
            "transport-type": string;
            "transport-name": string;
            "transport-description": string;
            "pois": Array<{
              "data": {
                "type": string;
                "attributes": {
                  "name": string;
                  "summary": string;
                  "description": string;
                  "image-url": string;
                }
              }
            }>
            "city": {
              "data": {
                "type": string;
                "attributes": {
                  "name": string;
                  "country-code": string;
                  "country-name": string;
                  "continent-name": string;
                  "show-in-wizard": boolean;
                  "wizard-order": number;
                }
              }
            },
            "tour-offer": {
              "data": {
                "type": string;
                "attributes": {
                  "name": string;
                  "square-image-url": string;
                  "city": {
                    "data": {
                      "type": string;
                      "attributes": {
                        "name": string;
                        "country-code": string;
                        "country-name": string;
                        "continent-name": string;
                        "show-in-wizard": boolean;
                        "wizard-order": number;
                      }
                    }
                  }
                }
              }
            }
          }
        }>
      }
    }
  }>
}