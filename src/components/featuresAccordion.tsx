import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  BarChart,
  Calendar,
  Database,
  Lock,
  Settings,
  User,
  Users,
  WandSparkles,
} from "lucide-react";

const featuresData = [
  {
    title: "Dashboard and Analytics",
    description:
      "The dashboard provides real-time analytics and statistics for recent bookings, completed services, and client feedback. It includes charts for daily revenue and service performance.",
    icon: <BarChart color="#3ecf8e80" />,
  },
  {
    title: "Users",
    description:
      "New users can sign up through the application to ensure only authorized cleaning staff have accounts. Authentication is securely managed using JWTs. Users can personalize their profiles by uploading avatars, changing their names, and updating passwords.",
    icon: <Users color="#3ecf8e80" />,
  },
  {
    title: "Services",
    description:
      "Manage cleaning services including descriptions, pricing, discounts, and images. Users can create, update, and delete services, ensuring clients have access to the latest offerings.",
    icon: <WandSparkles color="#3ecf8e80" />,
  },
  {
    title: "Bookings",
    description:
      "Bookings include details like service type, date, time, client information, and status (pending, confirmed, completed). Users can create new bookings by selecting services, staff, and scheduling details. Bookings can be modified or canceled based on client requests.",
    icon: <Calendar color="#3ecf8e80" />,
  },
  {
    title: "Clients",
    description:
      "Manage client details such as full name, contact information, and service history. Users can create new client profiles, view detailed histories, search for clients, and delete profiles when necessary.",
    icon: <User color="#3ecf8e80" />,
  },
  {
    title: "Settings",
    description:
      "Users can configure app-wide settings, including pricing for services and enabling dark mode for a personalized user experience.",
    icon: <Settings color="#3ecf8e80" />,
  },
  {
    title: "Authentication",
    description:
      "Supabase provides robust authentication using JWTs, supporting multiple sign-in methods including email/password and third-party OAuth providers.",
    icon: <Lock color="#3ecf8e80" />,
  },
  {
    title: "Database",
    description:
      "Supabase serves as the database solution, offering secure and scalable storage for user and service data. It also supports real-time updates and effective authentication mechanisms.",
    icon: <Database color="#3ecf8e80" />,
  },
];

export function FeaturesAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {featuresData.map((feature, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger>
            <div className="flex items-center gap-4 text-sm md:text-2xl">
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
