import express from "express";
import { AuthRoutes } from "../app/modules/auth/auth.route";
import { BannerRoutes } from "../app/modules/banner/banner.route";
import { CategoryRoutes } from "../app/modules/category/category.route";
import { CouponRoutes } from "../app/modules/coupon/coupon.route";
import { OfferRoutes } from "../app/modules/offer/offer.route";
import { ProductRoutes } from "../app/modules/product/product.route";
import { RuleRoutes } from "../app/modules/rule/rule.route";
import { UserRoutes } from "../app/modules/user/user.route";
const router = express.Router();

const appRouteList = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/category",
    route: CategoryRoutes,
  },
  {
    path: "/offer",
    route: OfferRoutes,
  },
  {
    path: "/product",
    route: ProductRoutes,
  },
  {
    path: "/rules",
    route: RuleRoutes,
  },
  {
    path: "/coupon",
    route: CouponRoutes,
  },
  {
    path: "/banner",
    route: BannerRoutes,
  },
];

appRouteList.forEach((route) => router.use(route.path, route.route));

export default router;
