import blog from "@/assets/images/dashboardImages/blog.svg";
import dashboard from "@/assets/images/dashboardImages/dashboard.svg";
import packages from "@/assets/images/dashboardImages/package.svg";
import payment from "@/assets/images/dashboardImages/payment.svg";
import booking from "@/assets/images/dashboardImages/booking.svg";
import calender from "@/assets/images/dashboardImages/calender.svg";
import review from "@/assets/images/dashboardImages/review.svg";
import schedule from "@/assets/images/dashboardImages/schedule.svg";

export const adminDashboardItems = [
  {
    linkText: "Dashboard",
    tooltipText: "Dashboard",
    path: "/dashboard",
    icon: dashboard,
    activeIcon: "",
  },
  {
    linkText: "Calendar",
    tooltipText: "Calendar",
    path: "/dashboard/calendar",
    icon: calender,
    activeIcon: "",
  },
  {
    linkText: "Package",
    tooltipText: "Package",
    path: "/dashboard/tours",
    icon: packages,
    activeIcon: "",
  },
  {
    linkText: "Booking",
    tooltipText: "Booking",
    path: "/dashboard/booking",
    icon: booking,
    activeIcon: "",
  },
  {
    linkText: "Schedule Tours",
    tooltipText: "Schedule Tours",
    path: "/dashboard/scheduleTour",
    icon: schedule,
    activeIcon: "",
  },
  {
    linkText: "Payment",
    tooltipText: "Payment",
    path: "/dashboard/payment",
    icon: payment,
    activeIcon: "",
  },
  {
    linkText: "Blog",
    tooltipText: "Blog",
    path: "/dashboard/blog",
    icon: blog,
    activeIcon: "",
  },
  {
    linkText: "Review",
    tooltipText: "Review",
    path: "/dashboard/review",
    icon: review,
    activeIcon: "",
  },
];
