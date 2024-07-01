import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  BarChart,
  Calendar,
  Component,
  Database,
  Lock,
  Scissors,
  Settings,
  User,
  Users,
  WandSparkles,
} from "lucide-react";

const featuresData = [
  {
    title: "Dashboard and Analytics",
    description:
      "The dashboard provides real-time analytics and statistics for recent bookings, sales and check-ins. It also includes charts for daily sales and visit durations.",
    icon: <BarChart />,
  },
  {
    title: "Users",
    description:
      "New users can only sign up within the application to ensure only authorized barbershop employees have accounts. Authentication is managed securely using JWTs. Users can upload an avatar, change their name, and update their password to personalize their account.",
    icon: <Users />,
  },
  {
    title: "Services",
    description:
      "Manage services including photos, names, prices, discounts, and descriptions. Users can create, update, and delete services, including uploading photos.",
    icon: <Scissors />,
  },
  {
    title: "Bookings",
    description:
      "Bookings include arrival and departure times, status (unconfirmed, checked in, checked out), amount, selected services, and client details. Filtering and management features allow easy tracking and handling of bookings ------ Users can create new bookings selecting services, staff, date, time, and client details. Bookings can be updated including rescheduling, and clients can cancel bookings within a specific timeframe.",
    icon: <Calendar />,
  },
  {
    title: "Clients",
    description:
      "Manage client details such as full name, email, and phone number. Users can create new clients, view client details including visit history, search for clients, and delete clients as needed.",
    icon: <User />,
  },
  {
    title: "Settings",
    description:
      "Users can define app-wide settings such as product prices and toggle dark mode for a personalized experience.",
    icon: <Settings />,
  },
  {
    title: "Authentication",
    description:
      "Supabase provides robust authentication using JWTs and supports multiple sign-in methods including email, password, and OAuth providers.",
    icon: <Lock />,
  },
  {
    title: "Database",
    description:
      "Supabase is used for the database, providing a secure and scalable solution for storing user data. It also offers real-time updates and authentication ",
    icon: <Database />,
  },
  {
    title: "Components",
    description:
      "Components offer reusability across pages, with changes applied to all instances. built using Radix UI and styled with Tailwind CSS. ",
    icon: <Component />,
  },
  {
    title: "Animation & Effects",
    description:
      "Framer motion is used for animations and transitions between pages to provide a smooth user experience.",
    icon: <WandSparkles />,
  },
];

export function FeaturesAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {featuresData.map((feature, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger>
            <div className="flex items-center gap-4">
              <span>{feature.icon}</span>

              {feature.title}
            </div>
          </AccordionTrigger>
          <AccordionContent>{feature.description}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
