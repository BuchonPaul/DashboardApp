export const imageMapper: any = {
  1: require("@/assets/images/appli/fuelFinder/station/total.png"),
  2: require("@/assets/images/appli/fuelFinder/station/totalaccess.png"),
  25: require("@/assets/images/appli/fuelFinder/station/carrefour.png"),
  42: require("@/assets/images/appli/fuelFinder/station/eleclerc.png"),
  58: require("@/assets/images/appli/fuelFinder/station/geant.png"),
  66: require("@/assets/images/appli/fuelFinder/station/intermarche.png"),
  136: require("@/assets/images/appli/fuelFinder/station/systemeu.png"),
};

export const fuelMapper: any = {
  B7: require("@/assets/images/appli/fuelFinder/fuel/b7.png"),
  E5: require("@/assets/images/appli/fuelFinder/fuel/e5.png"),
  E10: require("@/assets/images/appli/fuelFinder/fuel/e10.png"),
  E85: require("@/assets/images/appli/fuelFinder/fuel/e85.png"),
  LPG: require("@/assets/images/appli/fuelFinder/fuel/lpg.png"),
};

export function getStationImage(id: number): any {
  return imageMapper[id]
    ? imageMapper[id]
    : require("@/assets/images/appli/fuelFinder/station/autre.png");
}
