# GroomGrid

Is an Internal task management Application to manage everything in the Barbershop : Services, Bookings (organize appointments), clients (check in-out clients)...


## 📹 Video

- Check it out live here [GroomGrid](https://www.groomgrid.de).

## 🛠️ Technologies & Tools Used

- **Design:** **`Figma`**
- **Frontend Development:** **`React`** **`Typescript`** **`Tailwind CSS`** **`Framer motion`**
- **Backend Development:** **`Supabase`**
- **Remote state management:** **`React Query`**
- **Form management:** **`Zod`** **`React Hook Form`**
- **Other Libraries:** **`Lucide Icons`** **`react-hot-toast`** **`React date picker`**
- **Deployment:** **`Vercel`**
- **Hosting:** **`1&1 IONOS`**

## 👾 Features

1. **Authentication:**

   - New users can only be signed up inside the application (to guarantee that only actual barbershop employees can get accounts)
   - Users can upload an avatar, update name and password

2. **Services:**

   - Services Table (photo, name, price, discount, description)
   - Users can create, update, delete a service. Including Filtering and sorting functionality

3. **Bookings:**

   - Bookings Table (arrival & departure, status, amount, service, client data)
   - Details of a booking (number of visits, client observations, included product, paid or no).
   - Users can create, update, delete an appointment. Including Filtering, sorting and Pagination functionality
   - Create a booking : select a client, service, observation, date and time...

4. **Check in-out:**

   - User can delete, check-in, check-out a booking as the client arrives
   - On check in, the client should have the ability to add Product they would like to buy

5. **Clients:**
   - Client Table (Full name, email, phone number)
   - Users can create, delete a new client. Including Pagination and Search functionality buy name or email

6. **Dashboard:**
   - Statistics on recent bookings, sales, checkins. Including the filter functionality for the last  7, 30, 90 days
   - A chart showing all daily barbershop sales, showing both “total” and “extras” sales
   - A list of the current day bookings. Including filtering functionality by date using calendar

7. **Settings:**
   - Working time Table (day, status, opening & closing time)
   - User can update the product price.

- **Dark Mode** 

## Application plan

![diagram-export-14-07-2024-12_01_08](https://github.com/user-attachments/assets/d19d0b76-7419-4862-8758-b88d514fbd3e)

## 🔄 Project Process

Initial Meeting with Client:

- Discussion of project objectives and requirements.
- Presentation of design inspirations and initial sketches.
- Client feedback and approval to proceed.

Design Phase using Figma:

- Creation of initial sketches based on client requirements.
- Transition to Figma for detailed design work.
- Iterative design process, incorporating client feedback.
- Final design confirmation from the client.

Development Phase using React, Typescript and Tailwind CSS:

- Setup of development environment using Vite
- Organizing data and Implementation of React components and UI elements.
- Integration of Tailwind CSS for styling.
- Ensuring project responsiveness across various devices.
- Utilization of additional libraries/components as needed.
- Filtering functionality
- EmailJS for Email management
- lazy loading
- Development process focused on meeting project deadlines.

Deployment:

- Deployment of the project using Vercel.
- Hosting of the project on 1&1 IONOS.
- Testing of the deployed website to ensure functionality and performance.

## 🚦 Running the Project

To run the project in your local environment, follow these steps:

1. Clone the repository to your local machine.
2. Run `npm install` or `yarn` in the project directory to install the required dependencies.
3. Run `npm run start` or `yarn start` to get the project started.
4. Open [http://localhost:5173](http://localhost:5173) (or the address shown in your console) in your web browser to view the app.

- Check it out live here [GroomGrid](https://www.groomgrid.de).
