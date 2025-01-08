export   interface IRecommendation {
    firestore: boolean;
    _id: string;
    date: string;        // Use `Date` if you prefer working with date objects
    time: string;
    action: "buy" | "sell";  // Use a union type to restrict possible values
    priceCondition: "above" | "below";  // Based on common conditions
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
    updatedAt: string;    // Use `Date` if you prefer working with date objects
    createdAt: string;    // Use `Date` if you prefer working with date objects
    scriptId: string;
    __v: number;
  }
  