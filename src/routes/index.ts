import express from "express";
import { AuthRoutes } from "../app/modules/auth/auth.route";
import { CategoryRoutes } from "../app/modules/category/category.route";
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
];

appRouteList.forEach((route) => router.use(route.path, route.route));

export default router;
