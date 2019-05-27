import { UserFilter } from './filter.model';
import { Entity } from './Entity';
import { ValidateNested } from 'class-validator';
// import { Fund } from './fund.model';
export class UserSettings extends Entity {
    @ValidateNested({ each: true })
    userFilters: UserFilter[];
    tableSettings: { columns: string[] };
    constructor(data?: Partial<UserSettings>) {
        super(data);
        if (data) {
            this.userFilters = data.userFilters.map(userFilter => new UserFilter(userFilter));
        }
    }
}

export class InitialData {
    @ValidateNested()
    userSetting: UserSettings;
    @ValidateNested({ each: true })
    funds: any[];
    constructor(data?: Partial<InitialData>) {
        if (data) {
            this.userSetting = new UserSettings(data.userSetting);
            this.funds = data.funds;
        }
    }
}

export class MFSettings extends Entity {
    @ValidateNested()
    defaultUserFilter: UserFilter;
    tableSettings: { columns: string[] };
}
