/*
import { createReactRouter, createRouteConfig, lazy } from "@tanstack/router";

import App from "./App";

const UpdateUser = lazy(() => import("./views/UpdateUser"));
const UserTable = lazy(() => import("./views/UserTable"));

const rootRoute = createRouteConfig({
  component: App,
});

const indexRoute = rootRoute.createRoute({
  path: "/",
  component: UserTable,
});

const updateRoute = rootRoute.createRoute({ path: "update" });

const createRoute = updateRoute.createRoute({
  path: "/",
  component: UpdateUser,
});

const editRoute = updateRoute.createRoute({
  path: "$userId",
  component: UpdateUser,
});

const routeConfig = rootRoute.addChildren([
  indexRoute,
  updateRoute.addChildren([createRoute, editRoute]),
]);

const router = createReactRouter({ routeConfig });

export { editRoute, indexRoute };
*/

const router = {};

export default router;
