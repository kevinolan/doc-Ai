# MediCare AI — React UI Prototype

A responsive React + Vite frontend for the Product UI Design & Usability Implementation practical project.

## Run locally
1. Install Node.js (LTS).
2. Extract this folder.
3. Open a terminal in the project folder.
4. Run `npm install`
5. Run `npm run dev`
6. Open the local URL printed by Vite (usually http://localhost:5173).

## Included interactions
- Sidebar navigation between Overview, Appointments, Patients, Doctors, AI Assistant and Reports.
- Search filters appointment rows.
- New appointment modal with required patient name validation.
- Newly created appointments appear in the appointment list.
- Demo AI assistant responds to booking and department questions.
- Notification popover and responsive mobile navigation.

## Important scope and safety notes
This is an academic frontend prototype using in-memory demonstration data. It does not connect to a hospital database, authenticate real users, send appointments, or process medical records. Data resets when the page is refreshed. The assistant is scripted demo guidance, not a clinical AI system. Do not enter real patient information.

## Suggested next implementation stages
1. Add secure backend and authentication with role-based access.
2. Add persistent appointment, patient, doctor and department data.
3. Add validated scheduling rules and conflict prevention.
4. Add audit logs, privacy controls, backups and security testing.
5. Conduct usability tests with representative users and document findings.
