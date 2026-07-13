import { describe, expect, it } from "vitest";
import { t } from "../src/index";

describe("i18n", () => {
  it("returns French by default and Arabic when requested", () => {
    expect(t("fr", "customer.pointsAvailable")).toBe("points disponibles");
    expect(t("ar", "customer.pointsAvailable")).toBe("نقاط متاحة");
  });
});
