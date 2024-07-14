# GroomGrid

GroomGrid is an internal task management application designed to manage all aspects of a barbershop, including services, bookings (organizing appointments), and clients (check-in and check-out).

## 📹 Video

https://github.com/user-attachments/assets/d868bdc2-feca-43da-9d9a-d2d4a53b3506

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

   - New users can only sign up within the application (to guarantee that only actual barbershop employees can get accounts).
   - Users can upload an avatar, update their name, and change their password.

2. **Services:**

   - Services Table (photo, name, price, discount, description).
   - Users can create, update, and delete a service, including filtering and sorting functionalities.

3. **Bookings:**

   - Bookings Table (arrival & departure, status, amount, service, client data).
   - Details of a booking (number of visits, client observations, included product, paid or not).
   - Booking status can be “unconfirmed” (booked but not yet checked in), “checked in,” or “checked out.”
   - Users can create and delete an appointment, including filtering, sorting, and pagination functionalities.
   - Create a booking: select a client, service, observation, date, and time (depending on the available slots).

4. **Check-in/Check-out:**

   - Users can delete, check in, and check out a booking as the client arrives.
   - Bookings may not have been paid for on client arrival. Therefore, on check-in, users need to accept payment (outside the app) and then confirm that payment has been received (inside the app).
   - On check-in, clients should have the ability to add products they would like to buy.

5. **Clients:**
   - Client Table (Full name, email, phone number).
   - Users can create, delete a new client, including pagination and search functionality buy name or email.
   - Function to check if an email already exists.

6. **Dashboard:**
   - Statistics on recent bookings, sales, and check-ins, including filter functionality for the last 7, 30, and 90 days.
   - A chart showing all daily barbershop sales, displaying both “total” and “extras” sales.
   - A list of the current day’s bookings, including filtering functionality by date using a calendar.

7. **Settings:**
   - Working time Table (day, status, opening & closing time).
   - User can update the product price..

- **Dark Mode** 

## 📝 Application plan

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

Development Phase using React, Typescript, Supabase and Tailwind CSS:

- Setup of development environment using Vite.
- Planning & organizing data in the backend using Supabase.
- Implementation of React components and UI elements.
- Integration of Tailwind CSS for styling.
- Ensuring project responsiveness across various devices.
- Utilization of additional libraries/components as needed.
- Filtering, Sorting and Searching functionalities.
- Development process focused on meeting project deadlines.

Deployment:

- Deployment of the project using Vercel.
- Hosting of the project on 1&1 IONOS.
- Testing of the deployed website to ensure functionality and performance.

## 🎯 Learning

Learned how to work on a big project in depth. This large project was challenging, especially working on making complex components reusable, as well as how to make data interact with each other. Additionally, learned the importance of keeping the code clean and organized for future improvements or projects. Developing it using TypeScript was beneficial for avoiding bugs. 
Learned most of the important methods from Supabase, including CRUD principles, filtering, sorting, searching, authentication (login - logout, signup new user, update user data), image storage, and user management. 
Learned the difference between client-side and server-side data, which is valuable when working with big data for app performance.

## ✨ Improvement

the app still need more imporovement and funcyionalities to be added for a better use

- After creating a booking, the selected client should receive an email with their booking details.
- Build a calendar for easy reading and managing all bookings.
- The bookings should be open only for the Germany location.
- A booking should be canceled with an information email to the client rather than just deleting it.
- Update a booking, allowing it to be rescheduled rather than just deleting and creating a new one.
- Add a chart on the client detail page showing the progress, number of visits, and payment history.

- Check it out live here [GroomGrid](https://www.groomgrid.de).
