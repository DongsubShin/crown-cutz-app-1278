import { type RouteConfig, layout, route, index } from "@react-router/dev/routes";

export default [
  // User App Routes
  layout("pages/user/layout.tsx", [
    index("pages/user/Home.tsx"),
    route("booking", "pages/user/Booking.tsx"),
    route("queue", "pages/user/Queue.tsx"),
    route("services", "pages/user/Services.tsx"),
  ]),

  // Admin Routes
  layout("pages/admin/layout.tsx", [
    route("admin", "pages/admin/Dashboard.tsx"),
    route("admin/queue", "pages/admin/LiveQueue.tsx"),
    route("admin/clients", "pages/admin/Clients.tsx"),
    route("admin/commission", "pages/admin/Commission.tsx"),
    route("admin/loyalty", "pages/admin/Loyalty.tsx"),
  ]),

  // Auth Routes
  route("login", "pages/auth/Login.tsx"),
] satisfies RouteConfig;