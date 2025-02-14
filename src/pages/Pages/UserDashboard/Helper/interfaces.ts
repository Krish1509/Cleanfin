/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IRecommendation {
  firestore: boolean;
  _id: string;
  date: any; // Use `Date` if you prefer working with date objects
  time: string;
  action: "buy" | "sell"; // Use a union type to restrict possible values
  priceCondition: "above" | "below"; // Based on common conditions
  target1: number;
  target1Achieved: boolean;
  target2: number;
  target2Achieved: boolean;
  target3: number;
  target3Achieved: boolean;
  stopLoss: number;
  stopLossAchieved: boolean;
  recommendation: string;
  isActive: boolean;
  updatedAt: string; // Use `Date` if you prefer working with date objects
  createdAt: string; // Use `Date` if you prefer working with date objects
  scriptId: string;
  __v: number;
  scriptData: IOptionScriptsList[];
}

export interface IContentbytes {
  _id: string;
  userId: string;
  title: string;
  description: string;
  type: "file" | string; // If you expect other types, you can add them here
  url: string | null;
  fileExtension: string;
  updatedAt: string;
  createdAt: string;
  __v: number;
  uploaded: string;
}

export interface IEventList {
  _id: string;
  title: string;
  country: string;
  date: string;
  impact: string;
  forecast: string;
  previous: string;
}

  export interface IOptionScriptsList {
    _id: string;
    code: string | number;
    segmentID: string | number;
    exp: string
    inst: string;
    isActive: boolean;
    lot: number;
    name: string;
    opt: string;
    ser: string;
    strike: string;
    sym: string;
    tick: number;
  }

  export interface IItem {
    id: string;
    active: boolean;
    name: string;
    description: string;
    amount: number;
    unit_amount: number;
    currency: string;
    type: string;
    unit: string | null;
    tax_inclusive: boolean;
    hsn_code: string | null;
    sac_code: string | null;
    tax_rate: number | null;
    tax_id: string | null;
    tax_group_id: string | null;
    created_at: number;
    updated_at: number;
  }

  export interface ISubPlan {
    id: string;
    entity: string;
    interval: number;
    period: string;
    item: IItem;
    notes: string[];
    created_at: number;
    updated_at?: number;
  }
