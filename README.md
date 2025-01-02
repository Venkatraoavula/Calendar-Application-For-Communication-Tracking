ENTNT Technical Assignment : Calendar Application for Communication Tracking ADMIN ![Screenshot 2025-01-02 110208](https://github.com/user-attachments/assets/2f6bbe1c-5cd7-4605-bdd9-fe85b2789102)
![Screenshot 202![Screenshot 2025-01-02 110344](https://github.com/user-attachments/assets/71b9acc3-20a9-4f4c-a1ae-5d785162ed7f)
![Screenshot 2025-01-02 110721](https://github.com/user-attachments/assets/188a80b2-7af5-43e5-9e5e-ec5a98ec25a3)
![Screenshot 2025-01-02 110702](https://github.com/user-attachments/assets/49dba83d-4a42-4382-a64a-466e7485f331)
![Screenshot 2025-01-02 110641](https://github.com/user-attachments/assets/16d4fc36-0cb0-4fd7-8242-58ab1f9cc6ff)
![Screenshot 2025-01-02 110538](https://github.com/user-attachments/assets/8671f142-ed80-4c6d-a31f-fd13a7a40cde)
![Screenshot 2025-01-02 110501](https://github.com/user-attachments/assets/da688770-ce07-4243-86d3-657b0c9cf0d3)
5-01-02 110344](https://github.com/user-attachments/assets/03b840ee-66c4-4a79-b1d6-181c1efa5de4)
![Screenshot 2025-01-02 110501](https://github.com/user-attachments/assets/ec13d16e-930b-4cb9-ab97-0aa8d8d87eda)
![Screenshot 2025-01-02 110538](https://github.com/user-attachments/assets/26f78c2c-da7e-443a-b4fc-f5072bb23c34)
![Screenshot 2025-01-02 110641](https://github.com/user-attachments/assets/100342f9-2f4b-49ba-a307-81b98dc91650)
![Screenshot 2025-01-02 110702](https://github.com/user-attachments/assets/13c43e53-05a3-447c-bb9e-a0a00d2cfd41)
![Screenshot 2025-01-02 110721](https://github.com/user-attachments/assets/fa5c4809-e09a-415d-b268-5be47402d39c)


Objective

 # React-Based Calendar Application

## Objective

This application is designed to help maintain strong professional relationships with other organizations by accurately tracking communication. It ensures timely follow-ups and consistent engagement through a centralized platform. The key features include:

1. **Admin Module**: To set up companies and communication parameters.
2. **User Module**: To visualize, manage, and perform communication tasks.
3. **Reporting and Analytics Module** (Optional): Provides actionable insights into communication trends and performance.

---

## Features and Modules

### Admin Module

#### Company Management
- Add, edit, and delete company details.
- Each company entry includes:
  - **Name**: Company name.
  - **Location**: Physical or operational location.
  - **LinkedIn Profile**: Link to the company’s LinkedIn page.
  - **Emails**: One or more communication email addresses.
  - **Phone Numbers**: Contact numbers.
  - **Comments**: Notes or additional information.
  - **Communication Periodicity**: Default time interval for scheduled communications (e.g., every 2 weeks).

#### Communication Method Management
- Define available communication methods, including:
  - **Name**: E.g., "Visit" or "LinkedIn Post."
  - **Description**: E.g., "Visit to company premises."
  - **Sequence**: Order of communication steps.
  - **Mandatory Flag**: Marks whether a communication method is mandatory.
- Default communication methods (in sequence):
  - LinkedIn Post
  - LinkedIn Message
  - Email
  - Phone Call
  - Other

---

### User Module

#### Dashboard
- Grid-like view with the following columns:
  - **Company Name**: Name of the company.
  - **Last Five Communications**: Type and date of the five most recent interactions.
  - **Next Scheduled Communication**: Type and date of the next planned interaction.
- **Color-Coded Highlights**:
  - **Red**: Overdue communications.
  - **Yellow**: Communications due today.
- **Interactive Features**:
  - Hover over completed communications to display notes in a tooltip.

#### Communication Actions
- Select one or multiple companies.
- Log a new communication through a modal:
  - Select the communication type (e.g., LinkedIn Post, Email).
  - Input the date.
  - Add notes.
- Reset any existing highlights for the selected companies.

#### Notifications
- **Overdue Communications Grid**: Companies with overdue actions.
- **Today’s Communications Grid**: Companies with tasks due today.
- Notification icon with a badge for overdue and due tasks.

#### Calendar View
- View past communications (dates and methods).
- Manage upcoming communications (dates and methods).

---

### Reporting and Analytics Module (Optional)

#### Features:
- **Communication Frequency Report**:
  - Visual representation (bar chart/pie chart) of communication methods used over time.
  - Filter by company, date range, or method.
- **Engagement Effectiveness Dashboard**:
  - Metrics on the success of communication methods (e.g., response rates).
- **Overdue Communication Trends**:
  - Trendline/heatmap of overdue communications over time, categorized by company.
- **Downloadable Reports**:
  - Export data as PDF or CSV.
- **Real-Time Activity Log**:
  - Live feed of communication activities.

---

## Installation and Setup

1. Clone the repository.
2.  git clone <https://github.com/Venkatraoavula/Calendar-Application-For-Communication-Tracking.git>
3. Open the project in **VS Code**.
4. Run the following commands:
   ```bash
   npm install
   npm run start
   ```

To view the application documentation:
```bash
npm run readme.md
```

---

## Technology Stack
- **Frontend**: React.js
- **Backend**: Node.js (optional integration for API handling)
- **Database**: MongoDB/MySQL (optional)
- **Styling**: CSS/Bootstrap/Tailwind CSS

---

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature/fix.
3. Commit your changes and push to your branch.
4. Create a Pull Request.

---

## License
This project is licensed under the MIT License.

