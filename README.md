
# **Doctor Booking MERN (MediCey) – Paper-Less Channeling Web Application**

**A Modern Web-Based Medical Consultation System**

---

## **Overview**

**MediCey** is a MERN stack-based web application designed to revolutionize the healthcare consultation experience in Sri Lanka. This system enables patients to book medical appointments, manage health records, and interact with certified doctors — all through a secure and user-friendly online platform. Administrators (Super Admins) can monitor and control all activities to ensure smooth operation across users.

---

## **Features**

### 🛡️ **User Authentication System**

* Secure login and registration system.
* Role-based access: Super Admin, Doctor, and Patient.
* Approval workflow for Doctor registrations.

### 🧑‍⚕️ **Doctor Portal**

* View and manage own profile (qualifications, experience, ratings).
* Set availability for consultations.
* Access patient reports and medical history (if shared).
* Issue prescriptions and special notes (future feature).
* Request medical tests/reports (future feature).

### 🧍 **Patient Portal**

* Register and maintain a patient profile.
* Upload and manage personal and sensitive medical records.
* Book appointments with available doctors.
* Cancel appointments when needed.
* View consultation history and notifications.

### 🛠️ **Admin Panel (Super Admin)**

* View and manage all user accounts.
* Approve or reject doctor registration requests.
* Monitor patient data and system usage.
* Ensure platform security and user compliance.

### 📋 **Planned Future Features**

* **Online Consultation via Video/Audio**
* **Online Payment Gateway Integration**
* **Prescription Issuance Module**
* **Full Patient Report Management System**
* **Doctor Availability Calendar View**

---

## **Technologies Used**

| Category                | Tools/Technologies                        |
| ----------------------- | ----------------------------------------- |
| Frontend                | React.js, Tailwind CSS                    |
| Backend                 | Node.js, Express.js                       |
| Database                | MongoDB (Cloud-hosted)                    |
| UI/UX Design            | Figma                                     |
| Development Environment | Visual Studio Code                        |
| Authentication          | JWT, Bcrypt                               |
| Notifications           | Toast, EmailJS (Planned)                  |
| Hosting                 | Render / Vercel / MongoDB Atlas (Planned) |

---

## **Installation Guide**

1. **Clone the Repository**

   ```bash
   git clone https://github.com/raslanrizvi/doctor-booking-mern.git
   ```

2. **Navigate to Project Directory**

   ```bash
   cd doctor-booking-mern
   ```

3. **Install Dependencies**

   ```bash
   # For backend
   cd server
   npm install

   # For frontend
   cd ../client
   npm install
   ```

4. **Setup Environment Variables**

   * Create a `.env` file in the backend with:

     ```
     PORT=5000
     MONGO_URI=your_mongo_connection
     JWT_SECRET=your_jwt_secret
     ```

5. **Run the Application**

   ```bash
   # Backend
   npm run dev

   # Frontend (in /client)
   npm run dev
   ```

---

## **Application Screenshots**
### **Login**
<img src="User Interface Images/login.png" width="500" />

### **Home Banner**
<img src="User Interface Images/home-banner.png" width="500" />

### **All Doctors (Patinet View)**
<img src="User Interface Images/all-doctors.png" width="500" />

### **Doctors By Category (Patinet View)**
<img src="User Interface Images/doctors-by-category.png" width="500" />

### **Book Appointment (Patient View)**
<img src="User Interface Images/book-appointment-page.png" width="500" />

### **My Appointments (Patient View)**
<img src="User Interface Images/my-appointments--patient.png" width="500" />

### **Patient Profile (Patient View)**
<img src="User Interface Images/patient-profile.png" width="500" />

### **Add Doctord (Admin View)**
<img src="User Interface Images/add-doctor.png" width="500" />

### **All Doctors (Admin View)**
<img src="User Interface Images/doctors-list--admin.png" width="500" />

---

## **License**

This project is open-source and licensed under the **MIT License**.

---

## **Contact**

* **LinkedIn** – [Raslan Rizvi](https://www.linkedin.com/in/raslanrizvi)
* **Email** – [contact@raslanrizvi.me](mailto:contact@raslanrizvi.me)
* **GitHub** – [Raslan Rizvi](https://github.com/raslanrizvi)

---

🚀 *Developed with dedication to improving Sri Lanka's digital healthcare landscape.*
❤️ *by [Raslan Rizvi](https://raslanrizvi.me/)*

---
