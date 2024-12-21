<img src="./public/assets/logo.png" alt="Froggo, the mascot" width="200" height="200">

## Globetrotters

Globetrotters is an AI-powered travel application designed to simplify trip planning and itinerary creation. The app focuses on a smooth user experience and enables users to customize their travel preferences with ease. Whether you’re planning a solo adventure, a family vacation, or a group escape, Globetrotters has you covered.

## Features

- **AI-Generated Itineraries**: Create trip plans based on preferences like:
  - Budget
  - Travel dates
  - Duration
  - Food preferences
  - Travel pace
  - Fitness levels
  - Interests
  - Travel type (solo, couple, family, or group)
  - And more
- **Search Escapes**: Find destinations and attractions tailored to your preferences.
- **Weather Insights**: View current weather for your destination.
- **Nearby Attractions**: Discover local points of interest, hotels, and restaurants.
- **Interactive UI**: Enjoy sleek transitions and animations for a seamless experience.

## Upcoming Features

- **Enhanced UI**: Revamping the design for recently added features.
- **Maps Integration**: Adding maps to enhance trip planning.
- **Streaming AI**: Upgrading AI model outputs to streaming for faster responses.
- **History Tracking**: A feature to store user trip histories.

## Mascot

Meet **Froggo**, the cheerful mascot of Globetrotters! For inquiries, reach out at froggo@globetrotters.gg.

## Tech Stack

- **Framework**: Next.js 15
- **AI**: Vercel AI SDK powered by OpenAI (GPT-4 2024-08-06)
- **Styling**: Tailwind CSS, ShadCN UI, Framer Motion, GSAP
- **Authentication**: Auth.js (Google Sign-In)
- **Database**: Supabase, Prisma ORM

## Deployment

The application is deployed on [Vercel](https://globetrotters.gg). Note that the AI feature may experience issues due to Vercel's 5-second API Gateway timeout.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/globetrotters.git
   ```
2. Navigate to the project directory:
   ```bash
   cd globetrotters
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the necessary keys for Vercel AI SDK, Supabase, and Auth.js.

5. Start the development server:
   ```bash
   npm run dev
   ```

## Known Issues

- **AI Gateway Timeout**: AI functionality might not work reliably due to Vercel's 5-second timeout.
- **UI for Recent Features**: Some newer features have complete functionality but need UI improvements.

## Contribution

Contributions are welcome! If you'd like to help improve Globetrotters, please submit a pull request or open an issue.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

Try Globetrotters now at [globetrotters.gg](https://globetrotters.gg) and let AI simplify your travel planning!

