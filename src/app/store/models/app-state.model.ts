import { AffiliateState } from '../reducers/affiliate.reducer';
import { CityState } from '../reducers/city.reducer';
import { InterestState } from '../reducers/interest.reducer';
import { ItineraryState } from '../reducers/itinerary.reducer';
import { ProfileState } from '../reducers/profile.reducer';

export interface AppState {
    readonly itinerary: ItineraryState;
    readonly profile: ProfileState;
    readonly city: CityState;
    readonly interest: InterestState;
    readonly affiliate: AffiliateState;
}
