import express from "express";
import { ApplicationRoutes } from "../app/modules/application/application.route";
import { AuthRoutes } from "../app/modules/auth/auth.route";
import { BannerRoutes } from "../app/modules/banner/banner.route";
import { CartRoutes } from "../app/modules/cart/cart.route";
import { CategoryRoutes } from "../app/modules/category/category.route";
import { CouponRoutes } from "../app/modules/coupon/coupon.route";
import { FaqRoutes } from "../app/modules/faq/faq.route";
import { FeedbackRoutes } from "../app/modules/feedback/feedback.route";
import { NotificationRoutes } from "../app/modules/notifications/notification.route";
import { OfferRoutes } from "../app/modules/offer/offer.route";
import { OrderRoutes } from "../app/modules/order/order.route";
import { ProductRoutes } from "../app/modules/product/product.route";
import { RuleRoutes } from "../app/modules/rule/rule.route";
import { ScanHistoryRoutes } from "../app/modules/scanHistory/ScanHistory.route";
import { SubcategoryRoutes } from "../app/modules/subcategory/subcategory.route";
import { UserRoutes } from "../app/modules/user/user.route";
import { WeeklyRoutes } from "../app/modules/weeklyDeal/weeklyDeal.route";
import { WishlistRoutes } from "../app/modules/wishlist/wishlist.route";
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
    path: "/subcategory",
    route: SubcategoryRoutes,
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
  {
    path: "/feedback",
    route: FeedbackRoutes,
  },
  {
    path: "/faq",
    route: FaqRoutes,
  },
  {
    path: "/wishlist",
    route: WishlistRoutes,
  },
  {
    path: "/cart",
    route: CartRoutes,
  },
  {
    path: "/order",
    route: OrderRoutes,
  },
  {
    path: "/scan-history",
    route: ScanHistoryRoutes,
  },
  {
    path: "/notifications",
    route: NotificationRoutes,
  },
  {
    path: "/application",
    route: ApplicationRoutes,
  },
  {
    path: "/weekly-deal",
    route: WeeklyRoutes,
  },
];

appRouteList.forEach((route) => router.use(route.path, route.route));

export default router;
