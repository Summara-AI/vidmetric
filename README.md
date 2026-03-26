# VidMetric

![VidMetric Screenshot](https://via.placeholder.com/1200x600/0A0A0F/3B82F6?text=VidMetric+-+YouTube+Channel+Analytics)

A premium YouTube competitor analysis SaaS tool that helps you analyze any YouTube channel's performance, discover trending videos, and gain competitive insights.

## Features

- 🔍 **Channel Analysis**: Analyze any YouTube channel by URL
- 📊 **Advanced Metrics**: Views, likes, comments, engagement rates, and trending scores
- 📈 **Interactive Charts**: Visualize performance with Recharts
- 🔎 **Smart Filtering**: Sort by views, engagement, date ranges, and search functionality
- 📱 **Mobile Responsive**: Works seamlessly on all devices
- 💾 **CSV Export**: Export data for further analysis
- 🎨 **Premium UI**: Dark theme with glassmorphism effects

## Tech Stack

- **Frontend**: Next.js 14 App Router, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui, Lucide icons
- **Charts**: Recharts
- **API**: YouTube Data API v3
- **Styling**: Custom dark theme with glassmorphism

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/vidmetric.git
cd vidmetric
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
YOUTUBE_API_KEY=your_youtube_api_key_here
```

To get a YouTube API key:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the YouTube Data API v3
4. Create credentials (API Key)
5. Copy the API key to your `.env.local` file

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `YOUTUBE_API_KEY` | Your YouTube Data API v3 key | Yes |

## Usage

1. **Analyze a Channel**: Enter any YouTube channel URL (e.g., `https://youtube.com/@mkbhd`)
2. **View Metrics**: See subscriber count, total views, and video count
3. **Filter Videos**: Sort by views, engagement, date ranges, or search by keywords
4. **Export Data**: Download CSV reports for further analysis
5. **View Charts**: Interactive charts showing top performing videos

## API Quotas

The YouTube Data API has quota limits:
- **Default quota**: 10,000 units per day
- **Channel info**: 1 unit per request
- **Video search**: 100 units per request
- **Video details**: 1 unit per video

For heavy usage, consider:
- Implementing caching
- Requesting quota increases
- Using API key restrictions

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add your `YOUTUBE_API_KEY` as an environment variable in Vercel
4. Deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Project Structure

```
vidmetric/
├── app/
│   ├── api/
│   │   ├── channel/      # Channel API route
│   │   └── videos/       # Videos API route
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Main page
├── components/
│   ├── ChannelHeader.tsx # Channel info display
│   ├── ChannelInput.tsx  # URL input component
│   ├── ExportButton.tsx  # CSV export
│   ├── FilterBar.tsx     # Filtering controls
│   ├── LoadingSkeleton.tsx # Loading states
│   ├── MetricsChart.tsx  # Analytics charts
│   ├── TrendingBadge.tsx # Trending indicators
│   ├── VideoCard.tsx     # Video display card
│   ├── VideoList.tsx     # Video grid
│   └── ui/               # shadcn/ui components
├── lib/
│   ├── utils.ts          # Utility functions
│   └── youtube.ts        # YouTube API helpers
├── types/
│   └── youtube.ts        # TypeScript interfaces
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you have any questions or run into issues, please:
- Check the [Issues](https://github.com/yourusername/vidmetric/issues) page
- Create a new issue with detailed information
- Join our Discord community (link coming soon)

---

Built with ❤️ using Next.js, TypeScript, and the YouTube Data API
