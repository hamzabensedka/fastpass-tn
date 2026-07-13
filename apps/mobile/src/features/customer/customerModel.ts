export type CustomerHomeModel = {
  displayName: string;
  totalPoints: number;
  qrPayload: string;
  rewardCount: number;
};

export function createCustomerHomeModel(input: CustomerHomeModel): CustomerHomeModel {
  return input;
}

export function canRedeemReward(totalPoints: number, pointsCost: number): boolean {
  return totalPoints >= pointsCost;
}
